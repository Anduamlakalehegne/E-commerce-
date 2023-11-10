// sk_test_51LnUKJDM1jwCEz8OJG69szv032rIo4X0WrFMaXrqxu9g8fdohsL1y54JEUhFUKrqoBquVjN3AzpIFyrbN915bgcd00O5hqoGCJ
// Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ 
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to 
const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51NqATwDvKddVd3qtmgCQPhQiXAvLSlEqOLbmLMfF1eV71pm13SysSUY68ybOzoIOD1SQPCjRfrTJydHBTPbKu56q00TqZsEXu9');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {

    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:5173/Success",
        cancel_url: "http://localhost:5173/Cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!")); 