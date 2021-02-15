import * as Volca from "../mod.ts"

Volca.AppServe(async()=>{

         await Volca.Router.get(`/`, ()=>{
          Volca.Request.toResponse({
             content:'text/plain',
             body:'Hello World'
           })
         })

  },{port:8080})