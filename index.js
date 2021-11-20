const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
app.use(express.json());
const port = 9000;
app.get("/", (req, res) => {
    res.send("hello werd");
});
const articles=[]
app.get("/news",async (req, res) => {


    try {
     await   axios.get("https://www.theguardian.com/international").then((response) => {
            const html = response.data;
           console.log(html);
           
            const $ = cheerio.load(html)
    
            $('a:contains("climate")', html).each(function () {
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

app.listen(port, () => {
    console.log(`server work on port no ${port}`);
});
