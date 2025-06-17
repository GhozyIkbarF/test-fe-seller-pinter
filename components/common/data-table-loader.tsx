import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableLoaderProps {
  tableLength?: number;
  className?: string;
}

const DataTableLoader: React.FC<DataTableLoaderProps> = (props) => {
  const { tableLength = 3, className } = props;

  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index} className="animate-pulse">
          {Array.from({ length: tableLength }).map((_, index) => (
            <TableCell key={index} className={cn("p-4", className)}>
              <div className="h-5 w-3/4 rounded bg-gray-100"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default DataTableLoader;
