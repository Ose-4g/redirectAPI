const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PUT = 'put', POST = 'post', GET = 'get', PATCH = 'patch', DELETE = 'delete'

const handler = (verb)=>{
    return async (req,res,next)=>{
      console.log("body",req.body)
      console.log(verb)
      const {url,Authorization,body} = req.body

      console.log('body',url)
      console.log('authorization',Authorization)
      console.log('body',body)

      try {
        const response = await axios({
          method: verb,
          url,
          data:body,
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
.get(async (req,res,next)=>{
  console.log("body",req.body)
  console.log(GET)
  const {url,Authorization,body} = req.body

  console.log('body',url)
  console.log('authorization',Authorization)
  console.log('body',body)

  try {
    const response = await axios({
      method: GET,
      url,
      data:body,
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
})
.post(handler(POST))
.put(handler(PUT))
.patch(handler(PATCH))
.delete(handler(DELETE))

const PORT = process.env.PORT || 4080
app.listen(PORT,()=>{
  console.log(`Listening on port ${PORT}`)
})
