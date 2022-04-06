const axios = require('axios').default;

const endpoint=process.env.ENDPOINTELASTIC;
const user=process.env.USERELASTIC;
const password=process.env.PASSWORDELASTIC;


exports.handler = async function(event, context) {
 
  for (let record of event.Records) {
         const body=record.body;
         const message=JSON.parse(body).Message;
         await axios.post('https://'+endpoint+'/dna/_doc',JSON.parse(message),{
                auth: {
                username: user,
                password: password
                }
            }).then((res)=>res
        
            ).catch((err)=>{
                console.log(err);
            });
  }
   
    return {};
  }