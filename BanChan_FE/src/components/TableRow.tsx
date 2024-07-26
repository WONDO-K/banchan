import React from "react";

interface TableRowProps {
  row: (string | number | React.ReactNode)[];
}

const TableRow: React.FC<TableRowProps> = ({ row }) => {
  return (
    <tr className="w-full border-b">
      {row.map((cell, index) => (
        <td key={index} className="p-4 text-center">
          {cell}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
