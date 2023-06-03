import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
var jwt = require('jsonwebtoken');
const jwkToPem = require("jwk-to-pem");
import CUSTOM_ENV, { CONTRAST_VALUES, whitelist, AWS_CONFIG } from '../../utils/env_vars';
const { Lambda } = require('@aws-sdk/client-lambda');

const pem = jwkToPem({
    "alg": CUSTOM_ENV.alg,
    "kty": CUSTOM_ENV.kty,
    "use": CUSTOM_ENV.use,
    "x5c": [
        CUSTOM_ENV.x5c
    ],
    "n": CUSTOM_ENV.n,
    "e": CUSTOM_ENV.e,
    "kid": CUSTOM_ENV.kid,
    "x5t": CUSTOM_ENV.x5t
});

const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress



// Configura las credenciales del usuario de IAM
const credentials = {
    accessKeyId: AWS_CONFIG.accessKeyId,
    secretAccessKey: AWS_CONFIG.secretAccessKey,
  };
  
  // Crea una instancia del servicio Lambda
  const lambda = new Lambda({
    credentials,
    region: AWS_CONFIG.region,
  });
  
  const params = {
    FunctionName: AWS_CONFIG.lambdaName,
    Payload: JSON.stringify({
      key1: 'value1',
      key2: 'value2',
    }),
  };


export default withApiAuthRequired(async function shows(req, res) {
    try {
        const ip = parseIp(req).toString().replace('::ffff:', '');
        const { accessToken } = await getAccessToken(req, res);
        const { iss, sub, azp } = jwt.verify(accessToken, pem)
        if (iss === CONTRAST_VALUES.iss &&
            sub === CONTRAST_VALUES.sub &&
            azp === CONTRAST_VALUES.azp &&
            whitelist.includes(ip)) {
            console.log('aws continue')
            const  {$metadata: data} = await lambda.invoke(params);
            console.log('aws lambda invokation: ',data);
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ error: 'Forbidden (for you)' });
        }
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});


