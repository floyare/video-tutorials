import BadExample from "~/components/bad/BadExample";
import GoodExample from "~/components/good/GoodExample";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#18003a] to-[#00010c] text-white">
            {/* <BadExample /> */}
            <GoodExample />
        </main>
    );
}
