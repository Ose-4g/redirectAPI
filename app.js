const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PUT = 'put', POST = 'post', GET = 'get', PATCH = 'patch', DELETE = 'delete'

const handler = (verb)=>{
    return async (req,res,next)=>{
      const {url,Authorization} = req.body

      try {
        const response = await axios({
          method: verb,
          url,
          headers: {
            Authorization
          }
        })
;
        res.status(200).json(response.data)
      } 
      catch (error) {
        if(error.response)
        {
          res.status(error.response.status).json(error.response.data)
        }
          
        else
        {
          console.log(error)
          res.status(500).json({message: 'something went very wrong'});
        }
        
      }
    }
}



app.route('/')
.get(handler(GET))
.post(handler(POST))
.put(handler(PUT))
.patch(handler(PATCH))
.delete(handler(DELETE))


app.listen(4080,()=>{
  console.log('Listening on port 4080')
})

// async function makeRequest()
// {
//     const URL = 'https://api.twitter.com/2/users/by/username/:ose4g1';
//     const TOKEN = 'Bearer AAAAAAAAAAAAAAAAAAAAAIn6VwEAAAAAVh1PZAn%2F7j5kb0UmQih1v%2BaOGGs%3D87hlr6kZh8XJ1ZEti1q10Ez6KMutMLh36cgaUkReT3NiJ0VKev'

//     try {
//         console.log('is memeber valid')
//         const response = await axios({
//           method: GET,
//           url: URL,
//           headers: {
//             Authorization: TOKEN
//           }
//         })
// ;
//        console.log(response.data)
//       } 
//       catch (error) {
//        if(error.response)
//         console.log(error.response.data, 'status = ', error.response.status)
//       else
//         console.log(error);
//       }
// }

// makeRequest();