import Jwt from "jsonwebtoken";

const generateToken = (id: string, email: string, secretKey: string) => {
    return Jwt.sign({id, email}, secretKey, {expiresIn: "3d"});
};

export default generateToken;