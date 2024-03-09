import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

let app = express();
let port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));



let your_bearer_token = "64f71ad6-a877-4a52-b705-0d11f3e860f0";




app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
    let search_id = req.body.id
  try {
    let response = await axios.get(`https://secrets-api.appbrewery.com/secrets/${search_id}`, {
      headers:{
        Authorization: `Bearer ${your_bearer_token}`
      }
    })
    let result = response.data
    console.log(result)
    let content = JSON.stringify(result)
    res.render(`index.ejs`, {content})
  } 
  catch (error) {
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {content: `Error from server`})
  }
});

app.post("/post-secret", async (req, res) => {
  
  try{
    let response = await axios.post(`https://secrets-api.appbrewery.com/secrets`, req.body, {
      headers:{
        Authorization: `Bearer ${your_bearer_token}`
      }
    })
    let result = response.data
    console.log(result)
    let content = JSON.stringify(result)
    res.render(`index.ejs`, {content})
 

  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {content: `Unable to add new secrets to the server`})
  }
});

app.post("/put-secret", async (req, res) => {
  let search_id = req.body.id
  try{
    let response = await axios.put(`https://secrets-api.appbrewery.com/secrets/${search_id}`, req.body, {
      headers:{
        Authorization: `Bearer ${your_bearer_token}`
      }
    })
    let result = response.data
    console.log(result)
    let content = JSON.stringify(result)
    res.render(`index.ejs`, {content})
  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {content: `Unable to replace existing secret`})
  }

});

app.post("/patch-secret", async (req, res) => {
  let search_id = req.body.id;

  try{
    let response = await axios.patch(`https://secrets-api.appbrewery.com/secrets/${search_id}`, req.body, {
      headers:{
        Authorization: `Bearer ${your_bearer_token}`
      }
    })
    let result = response.data
    console.log(result)
    let content = JSON.stringify(result)
    res.render(`index.ejs`, {content})
  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {content: `Unable to update existing secret`})
  }
 
});

app.post("/delete-secret", async (req, res) => {
  let search_id = req.body.id;
  try{
    let response = await axios.delete(`https://secrets-api.appbrewery.com/secrets/${search_id}`, req.body, {
      headers:{
        Authorization: `Bearer ${your_bearer_token}`
      }
    })
    let result = response.data
    console.log(result)
    let content = JSON.stringify(result)
    res.render(`index.ejs`, {content})
  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {content: `Unable to delete secret with ID ${search_id}`})
  }
 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
