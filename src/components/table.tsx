import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";

type TableProps = {
  children: ReactNode;
  fixed?: boolean; // Permite ativar o table-fixed opcionalmente
};

export const Table = ({ children, fixed }: TableProps) => (
  <div className="mt-6 overflow-hidden rounded-lg border border-gray-500 text-sm md:text-base">
    <table className={`w-full ${fixed ? "table-fixed" : ""}`}>{children}</table>
  </div>
);

export const Th = ({
  children,
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4 ${className}`}
    {...props}
  >
    {children}
  </th>
);

export const Td = ({
  children,
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={`min-w-0 px-1.5 py-1 align-middle min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4 ${className}`}
    {...props}
  >
    {children}
  </td>
);
