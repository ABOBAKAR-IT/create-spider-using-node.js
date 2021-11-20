const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path=require('path')
const app = express();
app.use(express.static((__dirname)))
app.use(express.json());
const port = 9100;
app.get("/", (req, res) => {
    res.send("hello werd");
});
const articles=[]
const articles1=[
    {  name:"com"}
  ]
app.get("/news",async (req, res) => {


    try {
     await   axios.get("http://localhost:9100/getnews").then((response) => {
            const html = response.data;
           console.log(html);
           
            const $ = cheerio.load(html);
    let x="g";
            $(`a:contains(${x})`, html).each(function () {
                const title =  $(this).text()
               const url = $(this).attr('href')
              
                articles.push({title,url})
            })
        });
    } catch (error) {
        console.log(error);
    }
   
    console.log(articles);
    res.send(articles)
});


app.get('/getnews',(req,res)=>{
    res.sendFile(__dirname+"/page.html")
})


app.listen(port, () => {
    console.log(`server work on port no ${port}`);
});
