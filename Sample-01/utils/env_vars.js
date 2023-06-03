require('dotenv').config({ path: '../.env.local' });

const CUSTOM_ENV = {
    alg:process.env.ALG,
    kty:process.env.KTY,
    use:process.env.USE,
    x5c:process.env.X5C_VAL,
    n:process.env.N_VAL,
    e:process.env.E_VAL,
    kid:process.env.KID,
    x5t:process.env.X5T
}

export const CONTRAST_VALUES = {
    iss:process.env.ISS,
    sub:process.env.SUB,
    azp:process.env.AZP
}

export const whitelist = [
    '127.0.0.1'
]

export const AWS_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    lambdaName: process.env.LAMBDA_NAME
}
export default CUSTOM_ENV