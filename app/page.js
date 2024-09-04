import Image from "next/image";
import Grid from "./components/grid/Grid";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-full h-full">
        <Grid />
    </main>
  );
}
