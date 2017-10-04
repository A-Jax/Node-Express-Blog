var express = require("express"); // include express framework
var bodyParser = require("body-parser"); //include parser npm
var app = express(); // bind frame work to variable for local use
var port = process.env.PORT || process.env.IP; // apply port and IP to variable of local server
app.set("view engine", "ejs"); // set all ejs extentions to .EJS
app.use(bodyParser.urlencoded({extended: true})); // parse input into javascript objects.

var blogArray = [] // global array because it's session based with no connected DB.

app.get("/", function(req, res) {
    res.render("home");
});


app.post("/addblog", function(req, res) { // run post request on button submit of add new post
    
    var blogObject = { // pull values of form fields and apply to object.
        Date: req.body.blogDate,
        Title: req.body.blogTitle,
        Content: req.body.blogContent
        
    };

    blogArray.push(blogObject); // push object into the array, now we have an array of blog objects.
    
    console.log(blogArray); // log for testing purposes, you can delete this.
    
    res.redirect("/blog"); // redirect to blog page.
    
});


app.get("/blog", function (req, res) {
    
    res.render("blog", {Blog: blogArray}); // pass blog array to the blog esj, so we can display and use the array.
});


app.get("/*", function(req, res) {
    res.send("ERROR, PAGE NOT FOUND"); // simple catch all statement if a url is visited that doesnt exist.
})

app.listen(port, function() { // Create server.
    
    console.log("Server Online");
    
})