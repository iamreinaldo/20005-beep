"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

async function getServices() {
  const response = await fetch("/api/services/");
  return response.ok ? response.json() : [];
}

async function getCategories() {
  const response = await fetch("/api/categories/");
  return response.ok ? response.json() : [];
}

export default function AdminPage() {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <header className="mb-12 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold">Administração</h1>

        <p className="mt-3 text-zinc-400">
          Gerencie serviços e categorias
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/services"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition"
        >
          <h2 className="text-xl font-semibold">Serviços</h2>

          <p className="mt-2 text-zinc-400">
            {services.length} cadastrados
          </p>
        </Link>

        <Link
          href="/categories"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition"
        >
          <h2 className="text-xl font-semibold">Categorias</h2>

          <p className="mt-2 text-zinc-400">
            {categories.length} cadastradas
          </p>
        </Link>
      </div>
    </main>
  );
}