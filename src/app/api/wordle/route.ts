import { type NextRequest } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next';
import { INTERNALS } from 'next/dist/server/web/spec-extension/request';

export const dynamic = 'auto'
 
export async function GET(request: NextRequest) {
//   const res = await fetch('https://data.mongodb-api.com/111', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
    const data = {"ok": request.nextUrl.searchParams.get("token")===process.env.ADMIN_TOKEN ? 1 : 0};
    return Response.json({ data })
}

