"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Sparkles, ArrowRight, Command } from "lucide-react"
import useFuse from "@/hooks/useFuse"

interface Item {
    value: string
    label: string
    category: string
}

const data: Item[] = [
    { value: "next.js", label: "Next.js", category: "Framework" },
    { value: "react", label: "React", category: "Library" },
    { value: "tailwind", label: "Tailwind CSS", category: "Styling" },
    { value: "svelte", label: "Svelte", category: "Framework" },
    { value: "typescript", label: "TypeScript", category: "Language" },
    { value: "shadcn", label: "Shadcn UI", category: "UI Kit" },
    { value: "prisma", label: "Prisma", category: "Database" },
    { value: "supabase", label: "Supabase", category: "Backend" },
]

export function AutoComplete() {
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [focusIndex, setFocusIndex] = useState(-1)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const { results } = useFuse<Item>(data, query, {
        keys: ["label", "category"],
        threshold: 0.25,
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (item: Item) => {
        setQuery(item.label)
        setIsOpen(false)
        setFocusIndex(-1)
    }

    return (
        <div className="">
            <div
                ref={wrapperRef}
                className="relative w-full max-w-md flex flex-col gap-2"
            >
                <div
                    className={`relative flex items-center w-full h-12 rounded-xl bg-white border transition-all duration-200 ease-in-out ${isOpen ? "ring-2 ring-indigo-500/20 border-indigo-500/50" : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <div className="pl-4 text-slate-400">
                        {isOpen ? <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" /> : <Search className="h-5 w-5" />}
                    </div>

                    <input
                        type="text"
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 text-slate-800"
                        placeholder="Search technology..."
                        value={query}
                        onFocus={() => setIsOpen(true)}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setIsOpen(true)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                setFocusIndex((prev) => (prev + 1) % results.length)
                            } else if (e.key === "ArrowUp") {
                                setFocusIndex((prev) => (prev - 1 + results.length) % results.length)
                            } else if (e.key === "Enter" && focusIndex >= 0) {
                                handleSelect(results[focusIndex]!)
                            }
                        }}
                    />

                    <div className="pr-4 hidden sm:flex items-center gap-1">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                            <Command className="h-3 w-3" /> K
                        </kbd>
                    </div>
                </div>

                {
                    isOpen && (
                        <div className="absolute top-14 z-10 w-full overflow-hidden rounded-xl border border-gray-100 bg-white/80 backdrop-blur-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                            <div className="p-2">
                                {results.length === 0 ? (
                                    <div className="py-8 text-center text-sm text-slate-500">
                                        No results found for <span className="font-medium text-slate-900">{query}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        {results.map((item, index) => (
                                            <button
                                                key={item.value}
                                                onClick={() => handleSelect(item)}
                                                onMouseEnter={() => setFocusIndex(index)}
                                                className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${focusIndex === index
                                                    ? "bg-indigo-50 text-indigo-900 scale-[1.01]"
                                                    : "text-slate-600 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${focusIndex === index ? "border-indigo-200 bg-white" : "border-slate-100 bg-slate-50"
                                                        }`}
                                                >
                                                    {focusIndex === index ? (
                                                        <ArrowRight className="h-4 w-4 text-indigo-500" />
                                                    ) : (
                                                        <span className="text-xs font-bold text-slate-400">
                                                            {item.label.charAt(0)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-1 flex-col">
                                                    <span className="font-medium">{item.label}</span>
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                                                        {item.category}
                                                    </span>
                                                </div>

                                                {focusIndex === index && (
                                                    <span className="text-xs font-medium text-indigo-400">Jump to</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-slate-50 bg-slate-50/50 px-4 py-2 text-xs text-slate-400">
                                Found {results.length} results
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    )
}