// src/aws-config.js
let accessKey = process.env.REACT_APP_AWS_ACCESSKEY
let secretKey = process.env.REACT_APP_AWS_SECRETKEY
let reg = process.env.REACT_APP_AWS_REGION

const awsConfig = {
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: reg,
};

export default awsConfig;