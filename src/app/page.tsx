import ListView from "@/components/ListView";
import Picker from "@/components/Picker";
import Prompt from "@/components/Prompt";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-5">
      <div className="border-2 border-blue-200 p-20">
        {/* @ts-expect-error */}
        <ListView />
      </div>
      <div className="border-2 border-blue-200 p-20">
        <Picker />
      </div>
      <div className="border-2 border-blue-200 p-20">
        <Prompt />
      </div>
    </main>
  );
}
