const fetch = require('node-fetch');
var testUserName = "testUser";
var testUserPassword = "TestUser111";
var testUserId;
var newProduct = {
    "name": "new one",
    "description": "test",
    "image": "",
    "price": 4.5
  }
let products_amount;

async function testServer(){
    console.log("testing registerNewUser:");
    await fetch(`http://localhost:5000/api/registerNewUser?userName=${testUserName}&passWord=${testUserPassword}`, { method: 'POST', body: '' })
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

    console.log("testing login:");
    await fetch(`http://localhost:5000/api/login?userName=${testUserName}&password=${testUserPassword}`, { method: 'POST', body: '' })
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    }); 

    await fetch(`http://localhost:5000/api/login?userName=${testUserName}&password=${testUserName}`, { method: 'POST', body: '' })
    .then(res => res.json())
    .then(json => testUserId = json.id);


    console.log("testing addProductToCart:");
    await fetch(`http://localhost:5000/api/addProductToCart?userId=${testUserId}&productId=1`)
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

    console.log("testing removeProductFromCart:");
    await fetch(`http://localhost:5000/api/removeProductFromCart?userId=${testUserId}&productId=1`)
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

    console.log("testing getCart:");
    await fetch(`http://localhost:5000/api/getCart?id=${testUserId}`)
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

    
    console.log("testing emptyCart:");
    await fetch(`http://localhost:5000/api/emptyCart?id=${testUserId}`,{ method: 'POST', body: '' })
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

    console.log("testing getAllProducts:");
    await fetch('http://localhost:5000/api/getAllProducts')
    .then(res =>{        
        if(res.status === 200){
            console.log("SUCCESS");
            return res.json()
        }else{
            console.log("FAILURE");
        }
    }).then(
        (result) => {
        products_amount = result.length;
        return 
      });


    console.log("testing addNewProduct:");
    let request_body = newProduct
    request_body["userName"]="admin"
    await fetch(`http://localhost:5000/api/addNewProduct`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(request_body)
      })
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

    console.log("testing getAllProductsAfterAddOne:");
    await fetch('http://localhost:5000/api/getAllProducts')
    .then(res =>{        
        if(res.status === 200){
            return res.json()
        }else{
            console.log("FAILURE");
        }
    }).then(
        (result) => {
            if(result.length == products_amount + 1){
                console.log("SUCCESS");
            }else{
                console.log("FAILURE");
            }
      });

    console.log("testing deleteProduct:");
    await fetch(`http://localhost:5000/api/deleteProduct?id=100&username=admin`,{
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        }    })
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
});

console.log("testing getAllProductsAfterRemovingOne:");
await fetch('http://localhost:5000/api/getAllProducts')
.then(res =>{        
    if(res.status === 200){
        return res.json()
    }else{
        console.log("FAILURE");
    }
}).then(
    (result) => {
        if(result.length == products_amount){
        console.log("SUCCESS");
        }
  });


    console.log("testing addNewLog:");
    await fetch(`http://localhost:5000/api/addNewLog?userName=${testUserName}&action=test`)
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

    console.log("testing getAllLogs:");
    await fetch(`http://localhost:5000/api/getAllLogs`)
    .then(res =>{ 
        if(res.status === 200){
            console.log("SUCCESS");
        }else{
            console.log("FAILURE");
        }
    });

}

testServer()   