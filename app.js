import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import Blog from "./models/Blog.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/blogDB", { useNewUrlParser: true });

app.get("/", async (reg, res) => {
  const blogs = await Blog.find();
  res.render("index", { blogs });
});

app.get("/about", (reg, res) => {
  res.render("about");
});

app.get("/post/:id", (reg, res) => {
  res.render("post");
});

app.get("/newpost", (reg, res) => {
  res.render("newpost");
});

app.post("/addpost",async (reg, res) => {
  const newblog = new Blog(reg.body);
  await Blog.create(newblog);
  res.redirect("/");
});

app.get("*", (reg, res) => {
  res.send("<br><br><center><h1>404 kere bu yanlışlıkta bir iş var.</h1></center>");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
