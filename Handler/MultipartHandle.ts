
import { multiParser } from '../vendor/core/multiparser.ts'
import { Request } from './ServerHandle.ts'

export class Multipart{
    static TypeHeader:any
    static GetingHeaderValid():boolean{
        Multipart.TypeHeader = Request.RequestServ.headers.get("Content-Type")
        if (Multipart.TypeHeader.split(";")[0] == "multipart/form-data") {
            return true
        } else {
            return false
        }
    }
    static async ReadFields(){
        if (Multipart.GetingHeaderValid()) {
            const x:any = await multiParser(Request.RequestServ)
            let f:any = JSON.stringify(x.fields).replace(/\\r/g, '')
            return JSON.parse(f)
        } else {
            return `Multipart: NULL because header ${Multipart.TypeHeader}`
        }
    }
    static async ReadFiles(){
        if (Multipart.GetingHeaderValid()) {
            const x:any = await multiParser(Request.RequestServ)
            let f:any = JSON.stringify(x.files)
            return JSON.parse(f)
        } else {
            return `Multipart: NULL because header ${Multipart.TypeHeader}`
        }
    }
    static async ReadAll(){
        if (Multipart.GetingHeaderValid()) {
            const x:any = await multiParser(Request.RequestServ)
            return x
        } else {
            return `Multipart: NULL because header ${Request.RequestServ}`
        }
    }
}