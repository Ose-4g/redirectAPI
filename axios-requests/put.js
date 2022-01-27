const axios = require("axios")

module.exports = async(url,Authorization, body)=>{

        const response = await axios.put(url, body,
            {
                headers: {
                    Authorization
                }
            }
        
        )

        return response
}