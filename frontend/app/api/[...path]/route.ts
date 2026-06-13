import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

async function proxy(
  request: NextRequest,
  params: Promise<{ path: string[] }>
) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join("/")}${request.nextUrl.search}`;

  const response = await fetch(url, {
    method: request.method,
    headers: request.headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.text(),
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxy(request, context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxy(request, context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxy(request, context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxy(request, context.params);
}