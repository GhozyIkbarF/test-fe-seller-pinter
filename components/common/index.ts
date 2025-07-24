import dynamic from "next/dynamic";
import DataTableLoader from "./data-table-loader";
import DataTableColumnAction from "./data-table-column-action";
import TiptapEditor from "./tiptap-editor";

const AlertDelete = dynamic(
  () => import("@/components/common/alert-delete"),
);
const AlertLogout = dynamic(
  () => import("@/components/common/alert-logout"),
);
const BlurImage = dynamic(
  () => import("@/components/common/blur-image"),
);

export {
  DataTableLoader,
  DataTableColumnAction,
  TiptapEditor,
  AlertDelete,
  AlertLogout,
  BlurImage,
}