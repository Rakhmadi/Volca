# Volca Deno Web Framework

Simple Deno Web Framework 

## Deno Version (1.7+)

## Basic Usage

```ts
import {AppServe,Request,Router} from "https://deno.land/x/volca@v1.2.1/mod.ts"

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

>**Adding middleware to the router**
>```ts
> Router.get('/path',()=>{},[func1,func2...]);
>```
>
>Example
>```ts
>function func1(next:any){
>   console.log("middleware 1");
>   next()         
>}
>
> function func2(next:any){
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
> >
> > >```ts
> > >  getQuery():object
> > >```
> > > Get search query url
> > >
> > > Example Url : http://localhost:8080/query?name=Branch&products=[Journeys,Email,Universal%20Ads]
> > > 
> > > return :
> > > ``` 
> > >    {
> > >       "name": "Branch",
> > >       "products": "[Journeys,Email,Universal Ads]"
> > >    }
> > >    ```
> >
> > >```ts
> > >  async formField():Promise<object>
> > >```
> > > Get form Field 'application/x-www-form-urlencoded'


list of dependencies used
* https://github.com/deligenius/multiparser - multipart/form-data parser for Deno servers
* https://github.com/eta-dev/eta - Embedded JS template engine for Node, Deno, and the browser. Lighweight, fast, and pluggable. Written in TypeScript
* https://github.com/eveningkid/denodb - MySQL, SQLite, MariaDB, PostgreSQL and MongoDB ORM for Deno

## License
MIT License

Copyright (c) 2021 Rakhmadi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
