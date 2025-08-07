"use client"; // This directive must be at the top

import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/nav-bar";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

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
      const data = await res.json();
      console.log(data);
    }
  };

  const handleSubmit = async () => {
    console.log("User typed:", query);
    setMessages((prevMessages) => [...prevMessages, query]);

    const res = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    console.log(data.answer);

    setMessages((prevMessages) => [...prevMessages, data.answer]);
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <header className="flex items-center justify-between p-5">
        <p className="text-2xl font-extrabold">DOC-QA</p>
        <Navigation />
      </header>

      <main className="flex items-center justify-between gap-4 w-full h-auto">
        <label
          htmlFor="file-upload"
          className="border border-gray-300 rounded-2xl px-3 py-1.5 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
        </label>
        <input
          onChange={onChange}
          id="file-upload"
          type="file"
          className="hidden"
        />
        {file && (
          <div className="flex gap-2 items-center w-1/2 mr-auto">
            <Input
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
              value={query}
              placeholder="Enter query"
              type="search"
            />
            <Button onClick={handleSubmit} variant="outline">
              Search
            </Button>
          </div>
        )}
      </main>
      <div className="h-80 rounded-3xl bg-gray-600 flex-grow mx-3 ">
        {" "}
        {messages.map((message, index) => {
          const isUser = index % 2 === 1;
          return (
            <div
              key={index}
              className={`mt-2 mx-2 mb-2 max-w-[25%] px-4 py-2 rounded-xl text-white ${
                isUser
                  ? "ml-auto bg-blue-500 text-right"
                  : "mr-auto bg-gray-800 text-left"
              }`}
            >
              {message}
            </div>
          );
        })}{" "}
      </div>

      <footer className="mt-auto flex justify-center py-5 border-4 border-fuchsia-400"></footer>
    </div>
  );
}
