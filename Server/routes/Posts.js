const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const {validateToken} = require("../middlewares/Authmiddleware")

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts  = await Likes.findAll({ where: {userId: req.user.id}});
  res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});


router.get('/byid/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});


router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
  const {newTitle,id} = req.body;
  await Posts.update({title:newTitle},{where : {id:id}})
  res.json(newTitle);
});


router.put("/postText", validateToken, async (req, res) => {
  const {newText,id} = req.body;
  await Posts.update({title:newText},{where : {id:id}})
  res.json(newText);
});

router.put("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("Deleted Successfully!");
});

module.exports = router;

