
import  { serve } from "https://deno.land/std@0.145.0/http/mod.ts";
import * as api from "./api-deno.ts"

//@ts-ignore
const port: number = Deno.env.get("PORT") || 3000;
const hostname = '0.0.0.0';

const rootURL = new URLPattern({ pathname: "/" });
const dowsURL = new URLPattern({ pathname: "/dows" });

const handler = async(req: Request): Promise<Response> => {
  
  if (req.method === 'GET' && rootURL.exec(req.url)) 
    return new Response('Hello World DENO');

  if (req.method === 'GET' && dowsURL.exec(req.url)) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    const payload = await api.loadData();
    const body = JSON.stringify(payload);

    return new Response(body, { headers });
  }

  if (req.method === 'PUT' && dowsURL.exec(req.url)) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    await api.insertData();

    const body = JSON.stringify({ insert: true });

    return new Response(body, { headers });
  }

  return new Response('not found', { status: 404 });
}

console.log(`DENO Server running at http://${hostname}:${port}/`);

serve(handler, { port: port });