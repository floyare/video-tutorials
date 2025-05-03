import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import BadForm from "~/components/BadForm";
import GoodForm from "~/components/GoodForm";
import QueryEnhancedForm from "~/components/QueryEnhancedForm";

export default function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center gap-2 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            {/* <BadForm /> */}
            <GoodForm />
            {/* <QueryEnhancedForm /> */}
        </main>
    );
}
