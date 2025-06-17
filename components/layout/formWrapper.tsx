import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const FormWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <div className="bg-gray-50 rounded-[12px]">
      <div className="flex items-center p-5">
        <button
          className="flex items-center bg-transparent cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="ml-2 text-md font-medium text-slate-900">{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default FormWrapper;