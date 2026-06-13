"use client";

import { useEffect, useState } from "react";
import CategoryForm from "./components/CategoryForm";

async function getCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
  return response.ok ? response.json() : [];
}

async function deleteCategory(id: number) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
    method: "DELETE",
  });
}

async function updateCategory(id: number, payload: any) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  function startEdit(category: any) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditIcon(category.icon || "");
  }

  async function handleUpdate(id: number) {
    await updateCategory(id, {
      name: editName,
      icon: editIcon,
    });

    setEditingId(null);
    await loadCategories();
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Deseja realmente excluir esta categoria?"
    );

    if (!confirmed) {
      return;
    }

    const response = await deleteCategory(id);

    if (!response.ok) {
      alert(
        "Não é possível excluir uma categoria que possui serviços vinculados."
      );
      return;
    }

    setCategories((current) =>
      current.filter((category) => category.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold">Categorias</h1>

        <p className="mt-2 text-zinc-400">
          {categories.length} cadastradas
        </p>
      </header>

      <CategoryForm onCreated={loadCategories} />

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            {editingId === category.id ? (
              <div>
                <div className="grid gap-3">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2"
                  />

                  <input
                    value={editIcon}
                    onChange={(e) => setEditIcon(e.target.value)}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2"
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleUpdate(category.id)}
                    className="rounded-lg bg-zinc-700 px-3 py-1 text-sm hover:bg-zinc-600"
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-lg border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {category.icon} {category.name}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(category)}
                    className="rounded-lg border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="rounded-lg border border-red-900 px-3 py-1 text-sm text-red-400 hover:bg-red-950"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}