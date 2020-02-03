var express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/todos_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

var todoSchema = new mongoose.Schema({
    task: String
});

var Todo = mongoose.model("Todo", todoSchema);

// Todo.create({
//     task: "John Doe"
// })

app.get("/", function(req, res) {
    res.redirect("/todos");
});

app.get("/todos", function(req, res) {
    Todo.find({}, function(err, todos) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index", {todos: todos});
        }
    });
});

app.post("/todos", function(req, res) {
    Todo.create({
        task: req.body.todo.task
    }, function(err, newTodo) {
        if(err){
            console.log(err);
        }
        else {
            res.redirect("/");
            console.log(newTodo);
        }
    });
});

app.delete("/todos/:id", function(req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/todos");
        }
    });
});

app.listen(3000, function() {
    console.log("APP STARTED @ PORT 3000");
});