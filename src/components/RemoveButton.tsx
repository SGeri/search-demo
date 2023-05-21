"use client";

import deleteDocument from "@/server/actions/deleteDocument";

type Props = {
  documentId: string;
};

export default function RemoveButton({ documentId }: Props) {
  return (
    <button
      className="absolute right-3 top-[35%]"
      onClick={() => deleteDocument(documentId)}
    >
      X
    </button>
  );
}
