
import {AppServe,Request,Router} from '../mod.ts'
/**
 * Example Url : http://localhost:8080/post/How-to-convert-string/programing
 * 
 * return :
 *    {
 *     "Article": "How-to-convert-string",
 *     "Category": "programing"
 *    }
 */
AppServe(async()=>{
    
    Router.get('/post/:Article/:Category',()=>{
        return Request.toResponse({
            body:JSON.stringify(Request.params)
        })
    })

},{port:8080})