import {AppServe,Router,Request,str_random} from "./mod.ts"
 AppServe(async()=>{

          Router.get(`/`,async ()=>{
           Request.toResponse({
             content:'text/html; charset=UTF-8 ',
             body:'Hello world'
           })
         })

         Router.get('/x',async()=>{
           return await Request.toView("./example/example_view/form.eta.html",{})
         })

    },{port:8080})
