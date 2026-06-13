

"use client";

import { useEffect, useState } from "react";
import ServiceForm from "./components/ServiceForm";

async function getServices() {
  const response = await fetch("http://localhost:8000/services/");
  return response.ok ? response.json() : [];
}

async function deleteService(id: number) {
  await fetch(`http://localhost:8000/services/${id}`, {
    method: "DELETE",
  });
}

async function updateService(id: number, payload: any) {
  await fetch(`http://localhost:8000/services/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIcon, setEditIcon] = useState("");

  async function loadServices() {
    const data = await getServices();
    setServices(data);
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Deseja realmente excluir este serviço?"
    );

    if (!confirmed) {
      return;
    }

    await deleteService(id);

    setServices((current) =>
      current.filter((service) => service.id !== id)
    );
  }

  useEffect(() => {
    loadServices();
  }, []);

  function startEdit(service: any) {
    setEditingId(service.id);
    setEditName(service.name);
    setEditUrl(service.url);
    setEditDescription(service.description || "");
    setEditIcon(service.icon || "");
  }

  async function handleUpdate(id: number) {
    await updateService(id, {
      name: editName,
      url: editUrl,
      description: editDescription,
      icon: editIcon,
    });

    setEditingId(null);
    await loadServices();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold">Serviços</h1>

        <p className="mt-2 text-zinc-400">
          {services.length} cadastrados
        </p>
      </header>

      <ServiceForm onCreated={loadServices} />

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            {editingId === service.id ? (
              <div>
                <div className="grid gap-3">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2"
                  />

                  <input
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2"
                  />

                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Descrição"
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2"
                  />

                  <input
                    value={editIcon}
                    onChange={(e) => setEditIcon(e.target.value)}
                    placeholder="Ícone"
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2"
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleUpdate(service.id)}
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
                <div>
                  <p className="font-semibold">
                    {service.icon} {service.name}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {service.url}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(service)}
                    className="rounded-lg border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(service.id)}
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