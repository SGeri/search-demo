"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import uploadDocument from "@/server/actions/uploadDocument";

export default function Picker() {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const handleClick = () => {
    if (file) {
      setFile(undefined);
    } else {
      ref.current?.click();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (file) {
      const body = {
        name: file.name,
        type: file.type,
        size: file.size,
        buffer: Buffer.from(await file.arrayBuffer()).toString("base64"),
      };

      await uploadDocument(body);
    }

    setLoading(false);
    setFile(undefined);
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        ref={ref}
        hidden
        type="file"
        onChange={({ target }) => {
          if (target.files) {
            const file = target.files[0];
            setFile(file);
          }
        }}
      />

      {loading && <p>Loading...</p>}

      {file ? (
        <div className="flex flex-col gap-5">
          <p>File: {file.name}</p>
          <p>Size: {file.size}</p>
          <p>Type: {file.type}</p>
        </div>
      ) : (
        <p>No file selected</p>
      )}

      <Button onClick={handleClick}>{file ? "Remove file" : "Add file"}</Button>

      <Button onClick={handleSubmit}>Upload</Button>
    </div>
  );
}
