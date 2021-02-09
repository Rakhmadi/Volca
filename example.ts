import {AppServe,
       Request,
       Router,
       Multipart,
       str_random,
       num_random,
       Database,
       Model,
       MySQLConnector,
       DataTypes,
      } from "./mod.ts"

AppServe(async()=>{
    
    Router.get('/',()=>{
        console.log(Request.getCookie());
        Request.toView('public/index.html',{})
    })
    Router.get('/data',async()=>{
      console.log( Request.query);
      
      return Request.toResponseJson({},200)
    },[(next:any)=>{
      Request.addResponseHeader({
       "Access-Control-Allow-Headers" : "*",
       "Access-Control-Allow-Origin" : "*"
      })
      next()
     }])
    Router.get('/x',async ()=>{
        Request.setCookie({
          name:"sdfsdf",
          value:"sdfdsfdddd"
        })
          return Request.toResponse({
            body:''
          })
       })

       Router.get('/u',()=>{
          Request.toRedirect(301,'/x')
       })
       function fucn1(next:any){
         
         next()         
       }
       function fucn2(next:any){
        
        next()         
      }
       Router.get('/random',()=>{
        Request.toResponseJson({
            str_random:str_random(30),
            num_random:num_random(12,20),
            token:str_random(3000)
        },200)
       },[
         (next:any)=>{
          Request.addResponseHeader({
           "Access-Control-Allow-Headers" : "*",
           "Access-Control-Allow-Origin" : "*"
          })
          next()
         }
       ,fucn1,fucn2])
       Router.get(`/Article/:slug/Category/:category`,()=>{
         console.log(Request.params);
         
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
},{port:8080})