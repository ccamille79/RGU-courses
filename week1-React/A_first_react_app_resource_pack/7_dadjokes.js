const axios = require('axios');

export default function handler(req, res) {
 if (req.method === 'GET') {
        console.log("getting the dad joke")
        var response = "";
        let options = {
            headers: {
                'User-Agent': 'Robert Gordon',
                'Accept': 'text/plain'
            }
        }
          
        async function run() {
            try {
                axios.get('https://icanhazdadjoke.com/', options).then((response) => {
                    console.log(response.data)
                    res.send(response.data)
                });    
            } catch (error) {
                res.status(error.response?.status || 500).json({
                    error: error.message,
                    details: error.response?.data
                });
            }
        }
        run().catch(console.dir); 
  } else {
    // Handle any other HTTP method
    console.log("Unsupported HTTP method")
    res.send("Not supported")
  }
}