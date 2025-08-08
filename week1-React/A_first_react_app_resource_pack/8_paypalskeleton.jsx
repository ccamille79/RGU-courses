import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function paypalskeleton() {
  const initialOptions = {
    "client-id": "YOUR_CLIENT_ID",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <h1> Donate £1 </h1> 
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            //color:'blue' change the default color of the buttons
            layout: "vertical", //default value. Can be changed to horizontal
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default paypalskeleton;