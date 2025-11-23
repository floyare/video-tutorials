import { AutoComplete } from "@/components/auto-complete";
import { AutoCompleteWithDB } from "@/components/auto-complete-with-db";
import { BadAutoComplete } from "@/components/bad-autocomplete";

export default function HomePage() {
    return (
        <main className="flex flex-col gap-2 w-full h-screen items-center mt-48 bg-slate-5">
            <h1 className="text-xl font-semibold tracking-tight">Search your frontend!</h1>
            <AutoComplete />
            {/* <BadAutoComplete /> */}
            {/* <AutoCompleteWithDB /> */}
        </main>
    );
}
