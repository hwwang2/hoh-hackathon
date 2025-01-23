import { type NextRequest } from 'next/server'

export const dynamic = 'force-static'
 
export async function GET(request: NextRequest) {
//   const res = await fetch('https://data.mongodb-api.com/111', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('token');
    const data = {"ok": query===process.env.ADMIN_TOKEN ? 1 : 0};
    return Response.json({ data })
}

