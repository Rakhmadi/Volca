import {AppServe,Request,Router} from '../mod.ts'

/**
 * // middleware fucntion
 * @param next 
 * 
 */

  function Middleware1(next:any){
    console.log("middleware 1");
    next()         
  }
  
  function Middleware2(next:any){
    console.log("middleware 2");
    next()         
  }
  
AppServe(async()=>{

      Router.get('/',()=>{
         Request.toResponse({
             content:'text/plain',
             body:`Hello World`
         })
      },[Middleware1,Middleware2])

},{port:8080})