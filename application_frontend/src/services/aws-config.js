// src/aws-config.js
const awsConfig = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESSKEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRETKEY,
    region: process.env.REACT_APP_AWS_REGION,
  };
  
  export default awsConfig;
  