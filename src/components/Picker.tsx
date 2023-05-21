"use client";

import { useRef, useState } from "react";
import Button from "./Button";

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

      fetch("/api/upload", { method: "POST", body: JSON.stringify(body) })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
          setLoading(false);
        })
        .catch((err) => {
          console.error("err", err);
          setLoading(false);
        });
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
          console.log(target.files);
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
