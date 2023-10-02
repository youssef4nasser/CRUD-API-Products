const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"rootroot",
    database:"week3_crud_product"
})

// add product
app.post("/product", (req, res, next)=>{
    const {productName, productPrice, productDescription, category} = req.body
        const query = `INSERT INTO products (productName, productPrice, productDescription, category) VALUES ('${productName}', ${productPrice}, '${productDescription}', '${category}')`
        connection.execute(query, (err, resulte, fields)=>{
            if(err){
                return res.json({message: "error", err})
            }
            return res.json({message: "done"})
    })
})

// get all products
app.get("/product", (req, res, next)=>{
    const query =  `SELECT * FROM products`
    connection.execute(query, (err, resulte, fields)=>{
        if(err){
            return res.json({message: "Erorr", err})
        }
        return res.json({message: "done", resulte})
    })
})

// update a product
app.put("/product/:id", (req, res, next)=>{
    const {id} = req.params
    const {productName, productPrice, productDescription, category} = req.body

    const query = `UPDATE products SET productName='${productName}', productPrice=${productPrice}, productDescription='${productDescription}', category='${category}' WHERE id=${id}`
    connection.execute(query, (err, resulte, fields)=>{
        if(err){
            return res.json({message: "error", err})
        }
        return resulte.affectedRows ? res.json({message:"doen"}) : res.json({message: "In-valid id"})
    })
})

// delete a product
app.delete("/product/:id", (req, res, next)=>{
    const {id} = req.params
    const query = `DELETE FROM products WHERE id=${id}`
    connection.execute(query, (err, resulte, fields)=>{
        if(err){
            return res.json({message: "error", err})
        }
        return resulte.affectedRows? res.json({message:"done"}) : res.json({message: "In-valid id"})
    })

})

// search products
// app.get("/products/search", (req, res, next)=>{
//     const {searchKey} = req.query
//     const query = `SELECT * FROM USRS WHERE name like '${searchKey}'`
//     connection.execute(query, (err, resulte, fields)=>{
//         if(err){
//             return res.json({message: "error", err})
//         }
//         return res.json({message: "done", resulte})
//     })
// })


app.listen("5000", ()=>{
    console.log("server is running on port 5000")
})