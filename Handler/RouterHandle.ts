import { Request } from "./ServerHandle.ts"

interface IRoute{
    path:string,
    method:string,
    handle:Function
    middleware:any
}

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
  }

class Route{

    TableRoute:IRoute[] = []
    ParamsParser(pathProp:string,pathorigin:string){
        //inRoute
        let template:any = pathProp

        //from url get
        let url = pathorigin
        if(template.match(/:[^/]+/g)){

            // find params and replace them with regex
            var sdsd =  String(template.match(/:[^/]+/g).join('')).substring(1).split(':')
            template = template.replace(/:[^/]+/g, '([^/]+)')
            // the template is now a regex string '/service/[^/]+/getall'
            // which is essentially '/service/ ANYTHING THAT'S NOT A '/' /getall'

            // convert to regex and only match from start to end
            template = new RegExp(`^${template}$`)

            // ^ = beggin
            // $ = end
            // the template is now /^\/service\/([^\/]+)\/getall$/

            var matches:any = url.match(template)
            let nsx
            if (matches === null) {
                 nsx = null
            } else {
                 nsx = matches[0]
                 matches.shift()
                 var result:any = {};
                 sdsd.forEach((key, i) => result[key] = matches[i]);
                 Request.params = result
            }
                 return nsx
            }else{
                 return pathProp
            }
    }
    public get(pathx:string,controll:Function,middleware:Array<Function> = []){
        this.TableRoute.push({
            path:this.ParamsParser(pathx,Request.path),
            method:Method.GET,
            handle:controll,
            middleware:middleware
        })
    }
     public post(pathx:string,controll:Function,middleware:Array<Function> = []){
         this.TableRoute.push({
             path:this.ParamsParser(pathx,Request.path),
             method:Method.POST,
             handle:controll,
             middleware:middleware
         })
     }
     public put(pathx:string,controll:Function,middleware:Array<Function> = []){
         this.TableRoute.push({
             path:this.ParamsParser(pathx,Request.path),
             method:Method.PUT,
             handle:controll,
             middleware:middleware
         })
     }
     public patch(pathx:string,controll:Function,middleware:Array<Function> = []){
         this.TableRoute.push({
             path:this.ParamsParser(pathx,Request.path),
             method:Method.PATCH,
             handle:controll,
             middleware:middleware
         })
     }
     public delete(pathx:string,controll:Function,middleware:Array<Function> = []){
         this.TableRoute.push({
             path:this.ParamsParser(pathx,Request.path),
             method:Method.DELETE,
             handle:controll,
             middleware:middleware
         })
     }
     public options(pathx:string,controll:Function,middleware:Array<Function> = []){
         this.TableRoute.push({
             path:this.ParamsParser(pathx,Request.path),
             method:Method.OPTIONS,
             handle:controll,
             middleware:middleware
         })
     }
}
export let Router = new Route()