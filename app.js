import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import Blog from "./models/Blog.js";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __dirname = path.resolve();

// mongoose.connect("mongodb://localhost/blogDB", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://cleanblog:12345@cluster0.ilt1a.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });

app.get("/", async (reg, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("index", { blogs });
});

app.get("/about", (reg, res) => {
  res.render("about");
});

app.get("/post/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  // res.render('post', { post: blog })
  res.render("post",{ blog });
});

app.get("/newpost", (reg, res) => {
  res.render("newpost");
});

app.post("/addpost", async (reg, res) => {
  const newblog = new Blog(reg.body);
  await Blog.create(newblog);
  res.redirect("/");
});

app.get("/editpost/:id", async (req, res) => {
  const post = await Blog.findById(req.params.id);
  res.render("editpost",{ post });
});

app.post("/postedit", async (reg, res) => {
  const blog = await Blog.findById(reg.body.id);
  blog.title = reg.body.title;
  blog.content = reg.body.content;
  await blog.save();
  res.redirect("/post/" + blog._id);
});

app.get("/deletepost/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.get("*", (reg, res) => {
  res.send(
    "<br><br><center><h1>404 kere bu yanlışlıkta bir iş var.</h1></center>"
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
