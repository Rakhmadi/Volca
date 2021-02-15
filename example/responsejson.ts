import {AppServe,Request,Router} from "../mod.ts"

/**
 * 
 * return :
 *  {
 *    "name": "John",
 *    "age": 30,
 *    "car": null
 *   }
 */

    AppServe(async()=>{

          Router.get(`/`, ()=>{
             return Request.toResponseJson({ 
                "name":"John",
                "age":30,
                "car":null 
            },200)
         })

    },{port:8080})