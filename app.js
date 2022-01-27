const express = require('express')
const cors = require('cors')
const axios = require('axios')
const multer = require('multer')

const upload = multer()
const get = require('./axios-requests/get')


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PUT = 'put', POST = 'post', GET = 'get', PATCH = 'patch', DELETE = 'delete'





app.post('/',async (req,res,next)=>{
  let {method} = req.body
  method = String(method).toLowerCase()

  if(!method || (method != POST && method != PUT && method != PATCH && method != DELETE && method != GET))
    res.status(400).json({message: 'invalid method'})
  
    const {url,Authorization,body} = req.body



    if(method===GET)
    {
      try{
        const response = await get(url,Authorization)
        res.status(200).json(response.data)
      }
      catch(err)
      {
        if(err.response)
          res.status(400).json(err.response.data)
        else
          res.status(500).json({message: 'something went very wrong'})
        
      }
    }
})

app.all('*',(req,res)=>{
  res.status(404).json({message:'this endpoint does not exist on the server'})
})

const PORT = process.env.PORT || 4080
app.listen(PORT,()=>{
  console.log(`Listening on port ${PORT}`)
})
