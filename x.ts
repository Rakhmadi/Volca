import {AppServe,Request,Router,Multipart,str_random,num_random} from "./mod.ts"
import {create} from "https://deno.land/x/djwt@v2.0/mod.ts"

function Routerhandle(){
  Request.RequestServ.headers.set("Cookie", "full=of; tasty=chocolate");
    Router.get('/x',async ()=>{
      Request.deleteCookie("QWS")
      // Request.setSession("q","dfsdafsdfadfdsaf");
      // await Request.getSession("q")
        return Request.toResponse({
            content:'text/plain',
            body:`HEELO WORld`
        })
     })

     Router.get('/u',()=>{
        Request.toRedirect(303,'/x')
     })

     Router.get('/post/:id',()=>{
         Request.toResponse({
             content:'application/json',
             body:JSON.parse(Request.params)
         })
     })

     Router.get(`/Article/:slug/Category/:category`,()=>{
        Request.addResponseHeader({
          "asdasd":"213213123"
        })
              
        Request.toResponseJson([{"Params":Request.params}],200,{})
     },[
       (next:any)=>{
        Request.addResponseHeader({
          "asdasd":"213213123"
        })
        next()
       }
     ])

     Router.post('/post',async()=>{
         let form = await Multipart.ReadAll()
       
         if (form.files.ssss != undefined) {
            await Deno.writeFile(`${num_random(10,12)}.jpg`, form.files.ssss.content); 
         }

         return Request.toResponse({
             status:200,
             content:'text/plain',
             body:form
         })

         
     })
    
     Router.get('/g',async()=>{
      const jwt = await create({ alg: "HS512", typ: "JWT" }, { foo: "bar" }, "secret")
       Request.toResponseJson([{
           "Query":Request.query,
           "token":jwt
        }],200,{})
     })

     Router.get('/random',()=>{
         Request.toResponseJson([{
             "str_random":str_random(30),
             "num_random":num_random(12,20),
             "token":str_random(3000)
         }],200)
     })

     Router.get('/tmp',async ()=>{
         var g  = [{
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          }]
        let m:any
        for (const iterator of g) {
            m+=`<li>${iterator.title}</li>`+`<li>${iterator.body}</li>`+`<br>`
        }
        await Request.toView('tmp.eta.html',{x:m,y:`${str_random(4)}`,d:[{
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          }]})
    })
    Router.get('/1tmp',async ()=>{
        var g  = [{
           "userId": 1,
           "id": 1,
           "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
           "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
         },
         {
           "userId": 1,
           "id": 2,
           "title": "qui est esse",
           "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
         }]
       let m:any
       for (const iterator of g) {
           m+=`<li>${iterator.title}</li>`+`<li>${iterator.body}</li>`+`<br>`
       }
       await Request.toView('1tmp.eta.html',{x:m,y:`${str_random(4)}`,d:[{
           "userId": 1,
           "id": 1,
           "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
           "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
         },
         {
           "userId": 1,
           "id": 2,
           "title": "qui est esse",
           "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
         }]})
   })
    }
    


    
AppServe(()=>{
    Routerhandle()
},{hostname:'0.0.0.0',port: 80})


