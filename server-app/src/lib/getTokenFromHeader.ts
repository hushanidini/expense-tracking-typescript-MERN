export const getTokenFromHeader = (req: any) => {
    // get token from header
    // console.log(req.headers);
    // console.log(req?.headers?.authorization);
    const token = req?.headers?.authorization?.split(" ")[1];
    if(token === undefined){
        return 'No token found in the header';
    }else{
        return token
    }
};