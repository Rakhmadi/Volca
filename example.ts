import {AppServe,Router,Request,str_random} from "./mod.ts"
 AppServe(async()=>{

          Router.get(`/`,async ()=>{
           Request.toResponse({
             body:'Hello world'
           })
         })

         Router.get('/x',async()=>{
           return await Request.toView("./example/example_view/form.eta.html",{})
         })

    },{port:8080})
