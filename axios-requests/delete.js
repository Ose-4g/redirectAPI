const axios = require("axios")

module.exports = async(url,Authorization)=>{

        const response = await axios.delete(url,
            {
                headers:{
                    Authorization
                }
            }
        
        )

        return response
        // const response = await axios({
        //   method: method,
        //   url,
        //   data:body,
        //   headers: {
            
        //   }
        // })
}