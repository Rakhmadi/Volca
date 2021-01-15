import { ServerRequest, 
         Response as ServerResponse ,
         listenAndServe,
         HTTPOptions } from "../vendor/core/http/http.ts";


import * as Eta from '../vendor/core/eta_Engine.ts';

import { Router } from "./RouterHandle.ts"

import {serveFile} from '../vendor/core/http/http_file_server.ts'

import {msgStatus,errCatch} from './errrespHandle.ts';

export type ISameSite = "Strict" | "Lax" | "None";


export interface ICookie {
    // Name Cookie
    name: string;
    // Value Cookie
    value: string;
    // The maximum lifetime of the cookie as an HTTP-date timestamp 
    expires?: Date;
    // Number of seconds until the cookie expires
    maxAge?: number;
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?:ISameSite;
  }
interface IRedirect{
    status:number,
    location:string
}

interface IRes{
    status?: number;
    headers?:HeadersInit;
    content?:any;
    body?: any;
}

export type TMiddleware = (next:()=>void)=>any;

export class Request extends ServerRequest {
     static body:any
     static path:string
     static query:string
     static redirect:IRedirect
     static headers:Headers
     static method:string
     static RequestServ:any
     static params:any
     static cookieList:ICookie
     static HTTPoption:HTTPOptions
     static HeaderList:any

     static addResponseHeader(init?:HeadersInit){
        Request.HeaderList = init
     }

     static setCookie(cokie:ICookie):void{
        Request.cookieList = cokie
     }
     static getCookie():object{
        let CookieHeader = Request.RequestServ.headers.get("Cookie");
        let toJ = '{"' + CookieHeader.replace(/;/g, '","') 
        .replace(/=/g, '":"') + '"}'
         return JSON.parse(toJ)
     }

     static deleteCookie(name:string):void{
        Request.setCookie({
            name: name,
            value: "",
            expires: new Date(0),
        })
     }

     static toResponse(Respon:IRes={status:200,body:'',content:'text/plain'}){
        const header=new Headers({...Respon.headers,...Request.HeaderList})
        const encoder = new TextEncoder()

        let x = Request.cookieList
        if (x == undefined) {
        }else{
            let q:Array<string> = []
            q.push(`${x.name}=${x.value}`)
            q.push(`${x.expires ? ";Expires=" + x.expires : ""}`)
            q.push(`${x.domain ? ";domain=" + x.domain : "" }`)
            q.push(`${x.path ? ";path=" + x.path : ""}`)
            q.push(`${x.maxAge ? ";Max-Age=" + x.maxAge : ""}`)
            q.push(`${x.secure ? ";secure" : ""}`)
            q.push(`${x.httpOnly ? " ;HttpOnly": ""}`)
            q.push(`${x.sameSite ? ";SameSite="+x.sameSite : "" }`)
            header.append("Set-Cookie",`${q.join(' ')}`)
            
        }

        header.append("Content-Type",Respon.content)
        let v =Request.HeaderList
        for (let index = 0; index < v.length; index++) {
            
        }
         
        Request.RequestServ.respond({
            status:Respon.status,
            body:encoder.encode(Respon.body),
            headers:header
        })
    }

     static async toView(file:string,data:any){
        const decoder = new TextDecoder("utf-8");
        const datax = await Deno.readFile(file);
        Request.toResponse({
            status:200,
            content:' text/html; charset=UTF-8',
            body:EtaEngine(decoder.decode(datax),data)
        })
     }

     static toRedirect(status:number, toLocation:string){
         Request.toResponse({
             status:status,
             headers:new Headers({
                 "Location":toLocation
             })
         })
     }

     static toResponseJson(Json:Array<any> | any ,status:number,headers:HeadersInit = {}){
        Request.toResponse({
            content:'application/json',
            body:JSON.stringify(Json),
            headers:headers
        })
     }
}

function EtaEngine(FileString:string,data:any){
    return Eta.render(FileString,data)
}

function stepper (...steps:TMiddleware[]):any{

    const [ step, ...next] = steps
    return (step) ? step(()=>stepper(...next)):undefined

}

function handle(req:ServerRequest){

    function QuerySet(UrlParser:any){ 

         let search = UrlParser.search.split('?')[1];   

         let getQuery = '{"' + decodeURI(search) 
         .replace(/"/g, '\\"').replace(/&/g, '","') 
         .replace(/=/g, '":"') + '"}'

         if (getQuery === '{"undefined"}') {

            Request.query = "null"

         } else {

            Request.query =JSON.parse(getQuery)

         }
         
    }

    let n:any =new URL(`http://${req.headers.get("Host")}${req.url}`)
    QuerySet(n)
    
    Request.RequestServ = req

    Request.body = req.body

    Request.path = n.pathname

    Request.headers = req.headers

    Request.method = req.method


}

async function RouterHandle(req:any){
    function NotFoundReq(){
        return req.respond({
            status:404,
            content:'text/html; charset=utf-8',
            body:msgStatus(404,'NotFound')
      })
    }
    
    for (const r of Router.TableRoute) {
        if (r.path === Request.path && r.method === Request.method) {
            try {

                function Corelayer(next:any){
                    r.handle()
                    next()
                }

                return stepper(...r.middleware,Corelayer)

            } catch (error) {

                return Request.toResponse({
                    status:500,
                    content:'text/html; charset=utf-8',
                    body:errCatch(error.stack,Request)
                })

            }
        }
     }
     const urlPath = Request.path.split('/')
     if (urlPath[1] === 'public') {
       try {

            const FileContent= await serveFile(req,`${Deno.cwd()}/${urlPath[2]}`)
            return req.respond(FileContent)

       } catch (error) {
           if (error && error instanceof Deno.errors.NotFound) {

            NotFoundReq()
            
           }else{
            return Request.toResponse({
                status:500,
                content:'text/html; charset=utf-8',
                body:errCatch(error.stack,Request)
            })
            
           }
       }
         
     } else {
        NotFoundReq()
     }
}



export function AppServe(f:Function,opt:HTTPOptions){

    listenAndServe(opt,(req)=>{
        try {
            
            handle(req)
            f()
            RouterHandle(req)
            Router.TableRoute = []
        } catch (error) {
            req.respond({
                status:500,
                body:`${error}`
            })
        }
        
        
    })

    console.log(`${opt.hostname ? opt.hostname : "0.0.0.0"}:${opt.port}`);

}
