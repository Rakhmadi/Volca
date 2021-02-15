import {AppServe,Request,Router,Multipart,num_random} from "../mod.ts"

    AppServe(async()=>{

          Router.get(`/`, ()=>{
             return Request.toView('./example_view/MultipartFormData.eta.html',{})
          })
 
          Router.post('/post',async()=>{
            const formdata = await Multipart.ReadAll()
            // gnerate random 
            const nameFIle = num_random(10,12)
            //save in upload_file folder
            await Deno.writeFile(`./upload_file/${nameFIle}.jpg`, formdata.files.file.content); 
            
            return Request.toResponse({
                body:`saved in Folder upload_file/${nameFIle}.jpg`
            })
             
          })

    },{port:8080})