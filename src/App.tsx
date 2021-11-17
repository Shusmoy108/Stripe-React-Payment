import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "@material-ui/core";
import axios from "axios";
const API_URL = "http://localhost:8080";
function App() {
  const [product, setProduct] = useState({
    name: "bill",
    price: 10,
    productby: "frontend",
  });
  const amount = 1000;
  const makePayment = (token: any) => {
    //const body={token,product};

    const body = {
      token,
      clientId: "6178b45c681f02c87692f5e1",
      clientName: "Girmairi Motors",
      ownerName: "Shadman Girmairi",
      description: "Payment with Stripe",

      amount: amount,
      refId: "Rx10112510",
    };
    //const headers = { "Content-Type": "application/json" };
    axios.post(API_URL + "/api/payment/add", body).then((response) => {
      console.log(response.data);
    });

    // fetch("http://localhost:8080/api/payment/pay", {
    //   method: "POST",
    //   headers,
    //   body: JSON.stringify(body),
    // })
    //   .then((response: any) => {
    //     console.log(response);
    //     console.log(response.body["success"]);
    //     alert(response.body["message"]);
    //   })
    //   .catch();
    console.log(token);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <StripeCheckout
          stripeKey=""
          token={makePayment}
          image="https://foyob-test-s3-1.s3.amazonaws.com/foyob/FOYOB_logo.png"
          name="FOYOB Payment"
          amount={amount * 100}
          description="Service Fee"
          panelLabel="Pay Bill"
          allowRememberMe={true}
        >
          <Button
            style={{
              backgroundColor: "#2F77AD",
              color: "white",
              textTransform: "capitalize",
            }}
            variant="contained"
          >
            Complete Payment
          </Button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
