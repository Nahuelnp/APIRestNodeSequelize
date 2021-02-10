import app from './app';
import '@babel/polyfill';
async function main(){
    await app.listen(4000);
    console.log("server en puerto 4000")
}

main();