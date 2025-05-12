import express from 'express';
import cors from 'cors'

const app = express();
const port = 5002;
app.use(cors());

app.use(express.json())

let products = []
app.get('/products' , (req , res) => {
    res.status(200).send({message: "Product Found", product_list: products})
})

app.post('/product', (req , res) => {
    let reqBody = req.body;
    if(!reqBody?.name || !reqBody?.description || !reqBody?.price){
        res.status(400).send({message: "Required Parameter Missing"})
        return;
    }

    products.push(
        {
            id: new Date().getTime(),
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price
        }
    );
    res.status(201).send({message: "Product Added Successful"})
})

app.delete('/product/:id' , (req , res) => {
    const productId = req.params.id;

    let isMatched = false;

    for(let i=0; i < products.length; i++){
        if(products[i].id == productId){
            isMatched = true;
            products.splice(i , 1);
            break;
        }
    }

    if(isMatched){
        res.status(202).send({message: "Product Deleted"});
    }else{
        res.status(400).send({message: `product id (${productId}) did not matched`})
    }

})


app.listen(port , () => {
    console.log(`App is Running on port ${port}`)
})