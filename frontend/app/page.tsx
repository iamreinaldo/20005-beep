"use client";
import { useEffect, useState } from "react";

async function getServices() {
  try {
    const response = await fetch("/api/services/");

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const response = await fetch("/api/categories/");

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const [servicesData, categoriesData] = await Promise.all([
        getServices(),
        getCategories(),
      ]);

      setServices(servicesData);
      setCategories(categoriesData);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <header className="mb-8 border-b border-zinc-800 pb-6 md:mb-12">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl">📡</span>
          <h1 className="text-2xl font-bold md:text-4xl">20-005 Beep</h1>
        </div>

        <p className="mt-3 text-zinc-400">
          {services.length} serviços • {categories.length} categorias
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Personal Services Dashboard
        </p>

        <input
          type="text"
          placeholder="🔎 Buscar serviço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-zinc-600"
        />
      </header>

      <div className="mt-8 space-y-8">
        {categories.map((category: any) => {
          const categoryServices = services.filter(
            (service: any) =>
              service.category_id === category.id &&
              service.name.toLowerCase().includes(search.toLowerCase())
          );

          if (categoryServices.length === 0) {
            return null;
          }

          return (
            <div key={category.id}>
              <h2 className="mb-4 text-xl font-semibold text-zinc-200 md:text-2xl">
                {category.icon} {category.name}
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categoryServices.map((service: any) => (
                  <a
                    key={service.id}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg hover:border-zinc-700 hover:bg-zinc-800 hover:-translate-y-1 transition"
                  >
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold">
                        {service.icon} {service.name}
                      </h3>

                      <span className="text-sm">
                        {service.status === "online"
                          ? "🟢 Online"
                          : "🔴 Offline"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-zinc-400">
                      {service.description}
                    </p>

                    <p className="mt-2 break-all text-xs text-zinc-500">
                      {service.url}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}