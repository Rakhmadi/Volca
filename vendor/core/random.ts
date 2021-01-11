
const characters:string ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function str_random(length:number) {
    let result = ' ';
    const charactersLength:number = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function num_random(min:number, max:number) {
    const x = String(Math.random() * (max - min) + min)
    return Number(x.replace(/\./g, ''))
  }
