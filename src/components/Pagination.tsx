type Props = {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
}: Props) {
  return (
    <div>
      <div className="w-max flex flex-row gap-2">
        <button
          className="border border-gray-500 rounded-lg p-1"
          onClick={() => onPageChange(page - 1)}
        >
          {"<"}
        </button>
        <button
          className="border border-gray-500 rounded-lg p-1"
          onClick={() => onPageChange(page + 1)}
        >
          {">"}
        </button>
      </div>
      <p>
        {page * pageSize + 1} - {page * pageSize + 6} / {total}
      </p>
    </div>
  );
}
