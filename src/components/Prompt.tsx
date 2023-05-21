"use client";

import { useState } from "react";
import Button from "./Button";
import sendPrompt from "@/server/actions/sendPrompt";

export default function Prompt() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    const result = await sendPrompt(prompt, language);
    setResult(result);

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="border-2 border-black rounded-lg p-2 focus:outline-none w-[80%] mx-auto"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Enter a prompt..."
        />
        <input
          type="text"
          className="border-2 border-black rounded-lg p-2 focus:outline-none w-32 mx-auto text-center"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          placeholder="Enter the anwser's language"
        />
        <Button
          className="w-32 mx-auto"
          onClick={handleSubmit}
          disabled={loading || !Boolean(prompt)}
        >
          Search!
        </Button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {result && (
        <p className="text-green-800">
          <strong className="text-black">Answer: </strong>
          {result}
        </p>
      )}
    </div>
  );
}
