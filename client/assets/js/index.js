const axios = require("axios")

let placeHolder = ""

let test = function (){
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(data => {
        let test = data 
        console.log(test)
    })
}


console.log(test())