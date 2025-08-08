const axios = require('axios');
const environment = "sandbox"
const client_id = "my_client_id_from_paypals_developer_dashboard"
const client_secret = "my_client_secret_from_paypals_developer_dashboard"
const endpoint_url = 'https://api-m.sandbox.paypal.com'
import { useParams } from 'next/navigation'

const get_access_token = async() =>{
    const auth = Buffer.from(client_id + ":" + client_secret,).toString("base64");
    const data = 'grant_type=client_credentials'
    console.log("The auth is: " + auth)
    let options = {
        headers: {
            'Authorization': `Basic ${auth}` // from paypal tutorial
        }
    }
    console.log("Getting an access token")
    return (axios.post(endpoint_url+ '/v1/oauth2/token', data, options)
            .then(response => {
                console.log("Our paypal endpoint responded")
                console.log(response.data)
                return response.data.access_token;
            })
            .catch(err => {
                console.error(err);
                return err;
            })
    );    
    

}

/// The basic call to PayPal: Everything is $1.00
export default async function handler(req, res) {
 
    if (req.method === 'POST') {
        console.log("POST /api/pay/ means we're creating the order")
        const access_token = await get_access_token();
        const order_data = {
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: "1.00", ///These are fixed server-side. We'll talk about getting the dangers of getting the price from the client side, too.
                }
            }]
        };
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        };

        return (
            axios.post(
                `${endpoint_url}/v2/checkout/orders`,
                order_data,
                options    
            )
            .then(response => {
                console.log("Axios got back a reponse")
                console.log(response)
                res.send(response.data);
            })
            .catch(err => {
                console.log("Axios request got back an error")
                console.log(err)
                console.error(err);
                
                res.status(500).send(err?.response?.data || { error: 'Order creation failed' });
            })
        );
    }
    else if (req.method === 'PUT') {
    console.log("PUT /api/pay/ means we're completing the order") ///YES, the PayPal tutorial does it differently with two different api routes.
        const access_token = await get_access_token();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        };
        
        console.log("Here are the parameters")
        console.log(req.query)
        return (
            axios.post(
                `${endpoint_url}/v2/checkout/orders/${req.query.order_id}/${req.query.intent}`,
                {}, // Empty body
                options
            )
            .then(response => {
                console.log(response.data);
                res.send(response.data);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(err?.response?.data || { error: 'An error occurred' });
            })
        );
    } else {
    // Handle any other HTTP method
    console.log("Unsupported HTTP method")
    res.status(404).send("Not supported")
    }
}