export function msgStatus(codestatus:number,msg:string)
{
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404</title>
            <style>
                body,html{
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: rgb(53, 33, 73);
                }
            </style>
        </head>
        <body>
            <center style="margin-top: 40vh ;">
                <font style="font-size:70px;color:  white;">${codestatus}</font>&nbsp; 
                <font style="font-size:30px;color:  white;">${msg}</font>
            </center>
        </body>
        </html>`
    
}
export function errCatch(msg:any,rg:any){
    let x:any 
    for (const iterator of rg.headers) {
        x+=`
        <br>${iterator}
        `
    }
    let c:any
    for (const key in rg.params) {
        c+=`<br>${key} : ${rg.params[key]}`
    }
    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${msg}</title>
        <style>
            body,html{
                padding: 0;
                margin: 0;
                width: 100%;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: rgb(53, 33, 73);
            }
    
            .error-iner-box{
                padding:40px;
                margin:20px;
                background-color: white;
                color: rgb(53, 33, 73);
                border-left: solid 5px #fd5353;
                overflow: auto;
            }
            .info-iner-box{
                padding:40px;
                margin:20px;
                background-color: white;
                color: rgb(53, 33, 73);
                border-left: solid 5px #535dfd;
                overflow: auto;
            }
            
        </style>
    </head>
    <body>
        <div class="error-iner-box">
            <div>
                <h1>!Error</h1>
                <pre style="font-size:18px">${msg}</pre>
            </div>
        </div>
        <div class="info-iner-box">
            <div>
                <h1>Information & Environment</h1>
                <h3>Path</h3>
                <p style="font-size:14px">${rg.path}</p>
                <h3>Method</h3>
                <p style="font-size:14px">${rg.method}</p>
                <h3>Headers</h3>
                <p style="font-size:14px">${x}</p>
                <h3>Params</h3>
                <p style="font-size:14px">${c}</p>
            </div>
        </div>
    </body>
    </html>`
  
    
}