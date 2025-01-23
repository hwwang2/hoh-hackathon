export const dynamic = 'force-static'
 
export async function GET() {
//   const res = await fetch('https://data.mongodb-api.com/111', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
  const data = {"ok":1};
 
  return Response.json({ data })
}

