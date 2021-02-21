import {AppServe,Router,Request} from "./mod.ts"

 AppServe(async()=>{
   
          Router.get(`/`,async ()=>{
           Request.toResponse({
             content:'text/html; charset=UTF-8 ',
             body:`Hello world`
           })
         })
         
  },{port:8080})
