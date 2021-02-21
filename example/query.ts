
import {AppServe,Request,Router} from '../mod.ts'
/**
 * Example Url : http://localhost:8080/query?name=Branch&products=[Journeys,Email,Universal%20Ads]
 * 
 * return :
 *    {
 *       "name": "Branch",
 *       "products": "[Journeys,Email,Universal Ads]"
 *    }
 */
AppServe(async()=>{
    
    Router.get('/query',()=>{
        return Request.toResponse({
            body:JSON.stringify(Request.getQuery())
        })
    })
    

},{port:8080})