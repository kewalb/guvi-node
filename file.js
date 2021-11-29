const fs = require("fs");
// fs.readFile("./welcome.txt", "utf-8", (error, data) => {
//   console.log(data);
  // console.log(error)
// });

// const quote = "Welcome to reality"
// fs.writeFile('./awesome.txt', quote, err => {
//     console.log('Completed Writing')
// })

// const prompt = require("prompt-sync")({ sigint: true });
// const quote2 = "Live More, Worry Less.";
// const number = prompt("enter no of files");
// console.log(number);
// for (let i = 1; i <= number; i++) {
//   const name = "file-" + i;
//   //  console.log(name)
//   fs.writeFile("./backup/" + name, quote2, (err) => {
//     console.log("Completed Writing");
//   });
// }


// fs.unlink('./awesome.txt', (err)=> {
//     console.log("deleted successfully")
// })

let date_ob = new Date();
    const data = Date.now()
    fs.writeFile(`./${date_ob}.txt`, data.toString(), (err) => {
       
            console.log("written")
      
         
        
    })