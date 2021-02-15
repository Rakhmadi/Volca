import {AppServe,Request,Router,Multipart} from "../mod.ts"

    AppServe(async()=>{

          Router.get(`/`, ()=>{
             return Request.toView('./example_view/MultipartFormData.eta.html',{})
          })

          Router.post('/post',async()=>{
             
            return Request.toResponseJson(await Multipart.ReadAll(),200)
             
          })

    },{port:8080})