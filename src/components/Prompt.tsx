"use client";

import { useState } from "react";
import Button from "./Button";
import sendPrompt from "@/server/actions/sendPrompt";

export default function Prompt() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    const result = await sendPrompt(prompt);
    setResult(result);

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="border-2 border-black rounded-lg p-2 focus:outline-none"
        type="text"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        placeholder="Enter a prompt..."
      />
      <Button onClick={handleSubmit}>Search!</Button>

      {loading && <p className="text-center">"Loading..."</p>}

      {result && (
        <div className="border-2 border-black rounded-lg p-2 focus:outline-none">
          <p className="text-blue-800">{result}</p>
        </div>
      )}
    </div>
  );
}
