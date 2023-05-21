"use client";

import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import { Document } from "@/types";
import RemoveButton from "./RemoveButton";
import Pagination from "./Pagination";
import { useState } from "react";

const pageSize = 6;

type Props = {
  documents: SearchHit<Document>[];
};

export default function ListView({ documents }: Props) {
  const [page, setPage] = useState(0);
  const offset = page * pageSize;
  const total = documents.length;

  const documentToShow = documents.slice(offset, offset + pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage > Math.floor(total / pageSize) || newPage < 0) return;

    setPage(newPage);
  };

  return (
    <div className="flex flex-col gap-2">
      {documentToShow.map((d) => (
        <div
          key={d._id}
          className="relative border-2 border-black rounded-lg p-2 focus:outline-none w-80"
        >
          <p className="text-blue-800">{d._source?.name}</p>
          <p className="text-gray-600">{d._source?.type}</p>

          <RemoveButton documentId={d._id} />
        </div>
      ))}

      {total > 6 && (
        <div className="flex flex-col items-center mt-4">
          <Pagination
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
