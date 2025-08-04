"use client"; // This directive must be at the top

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [query, setQuery] = useState("");

  const onChange = async (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      setFile(files[0]);
      console.log(files[0]);

      // Create FormData and append the file with its name
      const formData = new FormData();
      formData.append("file", files[0], files[0].name); // Append file with its name

      // Send the file to the backend
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
    }

    // const data = await res.json();
  };
  const handleSubmit = async () => {
    console.log("User typed:", query);

    const res = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start border-4 border-amber-200">
        <div className="border-4 border-red-500">
          {" "}
          <Input type="file" onChange={onChange} />
        </div>
        <div className="border-4 border-sky-400 w-full">
          {file ? (
            <>
              <Input
                onChange={(e) => setQuery(e.target.value)}
                className="w-full max-w-md"
                value={query}
                placeholder="..."
                type="search"
              />
              <div className="m-auto">
                <Button onClick={handleSubmit} variant="outline">
                  {" "}
                  Click Me!
                </Button>
              </div>
            </>
          ) : (
            <> </>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
