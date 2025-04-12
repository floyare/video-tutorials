import BadButton from "@/components/bad/bad-button";
import GoodButton1 from "@/components/good/1-good-button";
import GoodButton2 from "@/components/good/2-good-button-variants";
import GoodButton3 from "@/components/good/3-good-button-cn";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 justify-center bg-gradient-to-b from-[#120227] to-[#070508] text-white">
      <div>
        <h1>Bad component</h1>
        <BadButton variant="danger">Bad example :(</BadButton>
      </div>
      <div>
        <h1>Component with good types</h1>
        <div className="flex items-center justify-center gap-2">
          <GoodButton1>Good example!</GoodButton1>
        </div>
      </div>
      <div>
        <h1>Components with conditional classNames</h1>
        <div className="flex items-center gap-2">
          <GoodButton2>Normal button</GoodButton2>
          <GoodButton2 className="font-black bg-pink-600 hover:bg-pink-800">Additional classNames</GoodButton2>
          <GoodButton2 type="submit">Submit button!</GoodButton2>
        </div>
      </div>
      <div>
        <h1>Components with variants</h1>
        <div className="flex items-center gap-2">
          <GoodButton3>Primary variant</GoodButton3>
          <GoodButton3 variant={"secondary"}>Secondary variant</GoodButton3>
          <GoodButton3 variant={"danger"}>Danger variant</GoodButton3>
        </div>
      </div>
    </main>
  );
}
