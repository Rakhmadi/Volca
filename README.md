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


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
