"use server";
import { fetchItems } from "@/app/_actions/items";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Pagination from "@/components/Pagination";
import { Toaster } from "react-hot-toast";
import DeleteItem from "../../../components/items/DeleteItem";
import EditItem from "@/components/items/EditItem";
import ItemList from "@/components/items/ItemList";
import { Suspense } from "react";

export default async function ItemsPage({ searchParams }) {
  const { page, limit } = await searchParams;
  const items = fetchItems({ page, limit });

  return (
    <div className="py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <ItemList items={items} />
      </Suspense>
      <EditItem />
      <Toaster />
    </div>
  );
}
