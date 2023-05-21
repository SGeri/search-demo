"use client";

import deleteDocument from "@/server/actions/deleteDocument";

type Props = {
  documentId: string;
};

export default function RemoveButton({ documentId }: Props) {
  const handleClick = async () => {
    const res = await deleteDocument(documentId);

    // todo: reload page - fix this by refreshing the list
    if (res.success) window.location.reload();
  };

  return (
    <button className="absolute right-3 top-[35%]" onClick={handleClick}>
      X
    </button>
  );
}
