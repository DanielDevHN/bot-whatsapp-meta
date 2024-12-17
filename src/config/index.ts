import "dotenv/config";


export const config = {
    jwtToken: process.env.JWT_TOKEN,
    numberId: process.env.MUMBER_ID,
    verifyToken: process.env.VERIFY_TOKEN,
}