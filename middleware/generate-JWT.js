const jsonwebtoken = require('jsonwebtoken');
//Genero el token
const generateJwt = (uid='')=> {
    return new Promise((resolve, reject)=> {
        const payload = {uid}

        jsonwebtoken.sign(payload,process.env.SECRETOPRIMARYKEY,{
            expiresIn:'4h'
        },(error,token)=> {
            if(error){
                console.log(error);
                reject(error)
            }else{
                resolve(token)
            }
        })
    })
}
module.exports = {
    generateJwt
}