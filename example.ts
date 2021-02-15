import * as Volca from "./mod.ts"

await Volca.AppServe(async()=>{
  
         await Volca.Router.get(`/`,async ()=>{
          await Volca.Request.toResponse({
             content:'text/plain',
             body:'Hello World'
           })
         })

         await Volca.Router.get(`/x`,async()=>{
          await Volca.Request.toResponse({
             content:'text/plain',
             body:'from x'
           })
         })

  },{port:8080})
