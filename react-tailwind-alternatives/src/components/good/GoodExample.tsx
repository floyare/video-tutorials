import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

const GoodExample = () => {
    return (
        <div className="group hover:bg-orange-100 transition-colors flex flex-col items-center gap-4 p-6 border border-dashed border-green-500 rounded-lg bg-red-50">
            <h3 className="text-lg font-semibold text-green-800 mb-2 group-hover:text-orange-600">Good Component Example</h3>
            <p className="text-sm text-green-600 text-center mb-4 group-hover:text-orange-500">Uses Tailwind for hover, focus, active effects</p>

            <input type="checkbox" id="toggle-interaction" className="peer" hidden />
            <div
                role="button"
                tabIndex={0}
                className={cn(
                    "p-5 text-white transition-all duration-200 ease-in-out rounded-md text-center bg-green-600 cursor-pointer",
                    "hover:bg-green-700 active:scale-95 active:bg-green-800",
                    "focus:ring-4 focus:ring-offset-2 ring-green-500",
                    "peer-checked:pointer-events-none peer-checked:opacity-50"
                )}
            >
                {'Interact with Me'}
            </div>

            <Button
                size="sm"
                className="mt-2"
                asChild
            >
                <label htmlFor="toggle-interaction" className="flex items-center gap-2 cursor-pointer">
                    {'Toggle Interaction'}
                </label>
            </Button>
        </div>
    );
}

export default GoodExample;