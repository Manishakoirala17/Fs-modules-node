var express = require("express");
var app = express();
var fs = require("fs");
var axios = require("axios");
var path = require("path");
// app.use(express.json);
async function downloadZohoFile(model) {
  return new Promise(async (resolve, reject) => {
    try {
      let url =
        "https://creator.zoho.com/api/v2/vigneshkumargt0/contacts-app/report/All_Contacts/3861897000001154007/Upload_Photo/download";

      const headers = {
        Authorization:
          "Zoho-oauthtoken 1000.e6e2a6a71774221109d35a47513bb787.51403250cc4267ff678b51d0b63fea1e",
      };
      const response = await axios({
        url: url,
        method: "GET",
        responseType: "stream",
        headers: headers,
      });
      const localFilePath = path.resolve(__dirname, "files", "image_1.jpg");

      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on("finish", () => {
        console.log("Finish", localFilePath);
        resolve(localFilePath);
      });

      w.on("error", (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
}
app.get("/", (req, res) => {
  console.log("get");
  downloadZohoFile();
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("listening 3000");
});
