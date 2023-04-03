import Jwt from "jsonwebtoken";

export const verifyToken = (token: string, secretKey: string) => {
    return Jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return false;
        }else{
            return decoded;
        }
    })
};