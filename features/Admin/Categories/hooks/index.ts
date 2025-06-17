import { useState, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, ICategorySchema } from "@/schema/category";
import { Category } from '@/types/category';

const UseCategoryFeature = () => {
    const form = useForm<ICategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    });

    const [selectedId, setSelectedId] = useState<string>('');
    const [seledtedData, setSelectedData] = useState<Category | null>(null);
    const [actionForm, setActionForm] = useState("add");
    const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);    
    const [isOpenAlertDelete, setIsOpenAlertDelete] = useState(false);

    const { page, limit, debouncedSearch, searchQuery, setPage, setSearchQuery } = useSearch({
        initPage: 1,
        initLimit: 10,
        delay: 1000,
    });

    const handleSelectData = (data: Category[], id:String, action:string) => {
        const selected = data.find((item) => item.id === id);
        if (selected) {
            console.log(actionForm, 'actionForm');
            setSelectedData(selected);
            action !== 'delete' && form.setValue("name", selected.name);
        }
    }

    return {
        form,
        page,
        limit,
        debouncedSearch,
        searchQuery,
        actionForm,
        selectedId,
        seledtedData,
        isOpenDialogForm,
        isOpenAlertDelete,
        setPage,
        setSearchQuery,
        setActionForm,
        setSelectedId,
        handleSelectData,
        setIsOpenDialogForm,
        setIsOpenAlertDelete,
    };
}   

export default UseCategoryFeature;