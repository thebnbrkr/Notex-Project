const express = require("express")
const app = express()

const server = app.listen(3000, () => { // create a HTTP server on port 3000
console.log(`Express running → PORT ${server.address().port}`)
});

app.use(express.static(__dirname, { // host the whole directory
    extensions: ["html", "htm", "gif", "png"],
}))

app.get("/", (req, res) => {
res.sendFile(__dirname + "/upload.html")
})

app.get("*", (req, res) => {
return res.sendStatus(404)
})