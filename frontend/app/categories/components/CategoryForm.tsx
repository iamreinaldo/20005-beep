"use client";

import { useState } from "react";

async function createCategory(payload: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response;
}

export default function CategoryForm({
  onCreated,
}: {
  onCreated?: () => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  async function handleSubmit() {
    const response = await createCategory({
      name,
      icon,
    });

    if (!response.ok) {
      alert("Erro ao criar categoria");
      return;
    }

    setName("");
    setIcon("");

    if (onCreated) {
      await onCreated();
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Nova Categoria
      </h2>

      <div className="grid gap-4">
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
        />

        <input
          placeholder="Ícone"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
        />

        <button
          onClick={handleSubmit}
          className="rounded-lg bg-zinc-700 px-4 py-3 hover:bg-zinc-600 transition"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
