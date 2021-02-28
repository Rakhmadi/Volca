import {AppServe,Request,Router,Multipart} from "../mod.ts"

    AppServe(async()=>{

          Router.get(`/`, ()=>{
             return Request.toView('./example_view/form.eta.html',{})
          })

          Router.post('/post',async()=>{

            return Request.toResponseJson(await Request.formField(),200)

          })

    },{port:8080})