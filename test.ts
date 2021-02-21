import {AppServe,Router,Request} from "./mod.ts"

 AppServe(async()=>{
          Router.get(`/`,async ()=>{
           Request.toResponse({
             content:'text/plain',
             body:'Hello World'
           })
         })

          Router.get(`/x`,async()=>{
           Request.toResponse({
             content:'text/plain',
             body:'from x'
           })
         })

         Router.get(`/:x/asd/:s`,async()=>{
          Request.toResponse({
            content:'text/plain',
            body:JSON.stringify(Request.getQuery()) 
          })
        })

  },{port:8080})
