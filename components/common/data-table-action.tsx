import Link from 'next/link';
interface DataTableColumnActionMenuItem {
  routePath: string;
  label: string;
}

interface DataTableColumnActionProps {
  id: string;
  detailRoutePath?: string;
  customRoutePath?: string;
  menuItems?: DataTableColumnActionMenuItem[];
  showDetail?: boolean;
  showDetailModal?: boolean;
  showEdit?: boolean;
  handleAction?: (action: string) => void;
  handleDetailModal?: () => void;
  setIsEdit?: (value: boolean) => void;
  setIsDialogOpen?: (value: boolean) => void;
}

const DataTableColumnAction: React.FC<DataTableColumnActionProps> = (props) => {
    const {
        id,
        detailRoutePath,
        customRoutePath,
        menuItems,
        showDetail = true,
        showDetailModal = false,
        showEdit = true,
        handleAction,
        handleDetailModal,
        setIsEdit,
        setIsDialogOpen
    } = props;
    return (
        <div className="flex items-center space-x-2 font-normal">
            {showDetail && (
                <Link href={customRoutePath ? customRoutePath : `${detailRoutePath}/${id}`} className="text-blue-600  hover:underline cursor-pointer">
                    Preview
                </Link>
            )}
            {showDetailModal && (
                <button
                    onClick={() => {
                        handleDetailModal?.();
                        handleAction?.('detail');
                    }}
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    Detail
                </button>
            )}
            {showEdit && (
                <button
                    onClick={() => {
                        setIsEdit && setIsEdit(true);
                        handleAction?.('edit');
                    }}
                    className="text-blue-600 hover:underline cursor-pointer bg-transparent"
                >
                    Edit
                </button>
            )}
            {menuItems && menuItems.map((item) => (
                <Link key={item.routePath} href={item.routePath} className="text-blue-600 hover:underline cursor-pointer">
                    {item.label}
                </Link>
            ))}
            <button
                onClick={(e) => {
                    // deleteData(id);
                    setIsDialogOpen && setIsDialogOpen(true);
                    handleAction?.('delete');
                }}
                className="text-red-600 hover:underline cursor-pointer bg-transparent"
            >
                Delete
            </button>
        </div>
    )
}

export default DataTableColumnAction;