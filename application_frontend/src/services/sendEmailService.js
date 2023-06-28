import emailjs from 'emailjs-com';

class SendEmail {

    enviarEmail(data){
        const templateParams = {
            nome: data.nome,
            senha: data.senha
        }
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID, 
            process.env.REACT_APP_TEMPLATE_ID, 
            templateParams, 
            process.env.REACT_APP_USER_ID
           )
           .then((result) => {
               console.log(result.text);
             }, (error) => {
           console.log(error.text);
           });
    }
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SendEmail();