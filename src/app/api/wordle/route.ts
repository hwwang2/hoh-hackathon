import { type NextRequest } from 'next/server'
import {getWordleById, generateWordle, updateWordleGuessById, getWordleList, confirmWordleById} from '@/lib/wordle'
import { NextApiRequest, NextApiResponse } from 'next';
import { INTERNALS } from 'next/dist/server/web/spec-extension/request';
import { WordleGuess } from '@/types';

export const dynamic = 'auto'
 
export async function GET(request: NextRequest) {
//   const res = await fetch('https://data.mongodb-api.com/111', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
    const action=request.nextUrl.searchParams.get("action") as string;
    if(action=="list"){
        const page = Number.parseInt(request.nextUrl.searchParams.get("page") as string);
        const wd = await getWordleList(page);
        return Response.json({"ok": true, "data": wd})
    } else{
        const wd = await getWordleById(request.nextUrl.searchParams.get("id") as string);
        return Response.json({"ok": (wd?true:false), "data": wd})
    }
}

export async function POST(request: NextRequest) {
    //   const res = await fetch('https://data.mongodb-api.com/111', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'API-Key': process.env.DATA_API_KEY,
    //     },
    //   })
    const key=request.nextUrl.searchParams.get("token") as string;
    if(key != process.env.DATA_API_KEY){
        return Response.json({"ok": false, "desc": "token wrong!"})
    }
    const data = await request.formData();
    const action = data.get("action");
    if("new"===action){
        const wd = await generateWordle();
        return Response.json({"ok": (wd?true:false), "data": wd});
    }else if("confirm"===action){
        const wd = await getWordleById(data.get("id") as string);
        if (!wd){
            return Response.json({"ok": false, "desc": "id wrong!"})
        }
        const r = confirmWordleById(wd.id);
        return Response.json({"ok": true, "data": r});
    }else if("guess"===action){
        const wd = await getWordleById(data.get("id") as string);
        if (!wd){
            return Response.json({"ok": false, "desc": "id wrong!"})
        }
        let gus = data.get("guess") as string;
        if(wd.guesses){
            for(let i=0;i<wd.guesses.length;i++){
                if(wd.guesses[i].guess==gus){
                    return Response.json({"ok": false, "desc": "repeated guess!"})
                }
            }
        }
        let ges:WordleGuess = {
            user: data.get("user") as string,
            guess: data.get("guess") as string
        }
        wd.guesses.push(ges);
        if(wd.guesses.length>6 || wd.overtime!=null){
            return Response.json({"ok": true, "desc": "over guess or finished!"});
        }
        if(gus==wd.word){
            wd.overtime = new Date();
        }
        const r = updateWordleGuessById(wd);
        return Response.json({"ok": true, "data": r});
    }

    return Response.json({"ok": false, "desc": "action wrong"})
}

