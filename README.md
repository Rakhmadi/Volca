# Volca Deno Web Framework

Simple Deno Web Framework 

## Basic Usage

```ts
import {AppServe,Request,Router} from "./mod.ts"

AppServe(async()=>{
    Router.get('/',()=>{
        Request.toResponse({
            content:'text/plain',
            body:`Hello World`
        })
    })
},{port:8080})
```

## Routing
>
> **Router Setup**
>```ts
>import {AppServe,Request,Router} from "./mod.ts"
>
>AppServe(async()=>{
>   Router.get('/',()=>{
>        Request.toResponse({
>            content:'text/plain',
>            body:`Hello World`
>        })
>    })
>},{port:8080})
>```
>

> **Available Router Methods**
>```ts
>Router.get('/path',()=>{});
>Router.post('/path',()=>{});
>Router.put('/path',()=>{});
>Router.patch('/path',()=>{});
>Router.delete('/path',()=>{});
>Router.option('/path',()=>{});
>```

>
> **Router parameter**
> ```ts 
>Router.get(`/Article/:slug/Category/:category`,()=>{})
>```
> **Example Url**
>```ts
>http://localhost:8080/Article/How-to-make-web/Category/web-tech
>```
> **Return**
>```json
>{
>   "slug": "How-to-make-web",
>   "category": "web-tech"
>}
>```

>**Adding middleware to the router**
>```ts
> Router.get('/path',()=>{},[func1,func2...]);
>```
>
>Example
>```ts
>function fucn1(next:any){
>   console.log("middleware 1");
>   next()         
>}
>
> function fucn2(next:any){
>   console.log("middleware 2");
>   next()         
>}
>
>Router.get('/',()=>{
>    Request.toResponse({
>        content:'text/plain',
>        body:`Hello World`
>    })
>},[func1,func2])
>```
>

## Request Class
>
> >## Properties
> > | Name Property | Return  
> > |--|--|
> > | ``` path:string ``` | Get path of URL |
> > | ``` method:string ``` | Get HTTP request method |
> > | ``` query:object ``` | Get Query from URL |
> > | ``` params:object ``` | Get Router parameters |
> > | ``` body:any ``` | Access Body Request |
>
> > ## Methods
> > >```ts
> > >addResponseHeader(init?:HeadersInit)
> > >```
> > > Add response headers
> > >
> > > Example :
> > > ```ts
> > >Request.addResponseHeader({
> > >    "Access-Control-Allow-Headers" : "*",
> > >    "Access-Control-Allow-Origin" : "*"
> > >})
> > > ```
> > 
> > >```ts
> > >getHeader(name:string)
> > >```
> > > Get header value
> > > 
> > > Example :
> > > ```ts
> > >Request.getHeader("User-Agent")
> > >```
> > > Return : 
> > > ```
> > >Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36
> > >```
> >
> > >```ts
> > >setCookie(cokie:ICookie):void
> > >```
> > > Add Cookie 
> > >
> >  > Example :
> > >  ```ts
> > >Request.setCookie({
> > >       name:"x",
> > >       value:"xxx"
> > >})
> > >```
> >
> > >```ts
> > >getCookie():object
> > >```
> > > Get Cookies
> > >
> > > Return :
> > > ``` json
> > > {
> > >    "x": "xxx"
> > > }
> > >```
> > 
> > >```ts
> > >deleteCookie(name:string):void
> > >```
> > > Delete Cookie
> > 
> > > ```ts
> > >toResponse(Respon:IRes={status:200,body:'',content:'text/plain'})
> > >```
> > >Send HTTP Response 
> > >
> > >Example :
> > > ```ts
> > >return  Request.toResponse({
> > >   status:'200', // Default 200
> > >   headers:{
> > >      "Access-Control-Allow-Headers"  :  "*",
> > >      "Access-Control-Allow-Origin"  :  "*"
> > >   },
>  > >   content:'text/plain', // see in https://www.iana.org/assignments/media-types/media-types.xhtml
> > >   body:'Hello World',
> > >   
> > >})
> >> ```
> >
> > >```ts
> > >toView(file:string,data:object):Promise<any>
> > >```
>  > > Loading a view to response using the Eta engine
>  > >  
>  > > Example :
>  > > ```ts
>  > > Request.toView('public/index.html',{ favoriteCake: 'Chocolate!' })
>  > > ```
>  >
> > >```ts
> > >toRedirect(status:number, toLocation:string)
> > >```
> > > Redirect page 
> >  > 
>  > > Example :
> >  > ```ts
> > > Request.toRedirect(301,'/x') // Redirect status codes 301 to path location /x
> > >```
> >
> > >```ts
> > >toResponseJson(Json:Array<any> | any ,status:number,headers:HeadersInit = {})
> > >```
> > > Method will automatically set the `Content-Type` header to `application/json`
> > > 
> > > Example :
> > > ```ts
> > > Request.toResponseJson({ favoriteCake: 'Chocolate!'  },200)
> > > ```
> > >
> > >


## License
[MIT](https://choosealicense.com/licenses/mit/)
