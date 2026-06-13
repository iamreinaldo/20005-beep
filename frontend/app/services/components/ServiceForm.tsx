

"use client";

import { useEffect, useState } from "react";

async function getCategories() {
  const response = await fetch("/api/categories/");
  return response.ok ? response.json() : [];
}

async function createService(payload: any) {
  const response = await fetch("/api/services/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
}

export default function ServiceForm({
  onCreated,
}: {
  onCreated?: () => void | Promise<void>;
}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getCategories();
      setCategories(data);
    }

    load();
  }, []);

  async function handleSubmit() {
    const normalizedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `http://${url}`;
    const response = await createService({
      name,
      url: normalizedUrl,
      description,
      icon,
      category_id: Number(categoryId),
    });

    if (!response.ok) {
      alert("Erro ao criar serviço");
      return;
    }

    setName("");
    setUrl("");
    setDescription("");
    setIcon("");
    setCategoryId("");

    if (onCreated) {
      await onCreated();
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Novo Serviço
      </h2>

      <div className="grid gap-4">
        <input
          placeholder="Nome"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="10.0.0.2:8096"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          placeholder="Descrição"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Ícone"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <select
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Selecione uma categoria
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>

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