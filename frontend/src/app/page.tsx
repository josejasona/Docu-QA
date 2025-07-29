"use client"; // This directive must be at the top

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [file, setFile] = useState<File>();

  const onChange = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start border-4 border-amber-200">
        <div className="border-4 border-red-500">
          {" "}
          <Input type="file" onChange={onChange} />
        </div>
        <div className="border-4 border-sky-400 w-full">
          {file ? <Input type="search" /> : <> </>}
        </div>
        <div className="m-auto">
        <Button variant="outline"> Click Me!</Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
