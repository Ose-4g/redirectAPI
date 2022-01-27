const axios = require("axios")

module.exports = async(url,Authorization, body)=>{

        const response = await axios.patch(url, body,
            {
                headers: {
                    Authorization
                }
            }
        
        )

        return response
}