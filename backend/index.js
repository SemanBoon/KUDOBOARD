const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5175;

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

app.post("/kudos-board", async (req, res) => {
  console.log("IN THE BACKEND");
  const { imgUrl, title, category, author } = req.body;
  const newBoard = await prisma.KudosBoard.create({
    data: { imgUrl, title, category, author },
  });
  console.log(newBoard);
  res.status(200).json(newBoard);
});

app.get("/kudos-board", async (req, res) => {
  const { filter, sort } = req.query;

  let boards;

  if (filter) {
    boards = await prisma.KudosBoard.findMany({
      where: {
        category: filter,
      },
    });
  } else if (sort === "recent") {
    boards = await prisma.KudosBoard.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });
  } else {
    boards = await prisma.KudosBoard.findMany();
  }

  res.status(200).json(boards);
});

app.get("/kudos-board/:id", async (req, res) => {
  const { id } = req.params;
  const board = await prisma.KudosBoard.findUnique({
    where: { id: parseInt(id) },
  });
  res.status(200).json(board);
});

app.delete("/kudos-board/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await prisma.KudosBoard.delete({
    where: { id: parseInt(id) },
  });
  res.status(200).json({ message: "board deleted" });
});

app.post("/kudos-cards", async (req, res) => {
  const { gifUrl, title, description, KBid, owner } = req.body;
  const newCard = await prisma.KudosCard.create({
    data: { gifUrl, title, description, KBid: parseInt(KBid), upvote: 0
, owner },
  });
  res.status(200).json(newCard);
});

app.get("/kudos-cards/:KBid", async (req, res) => {
  const { KBid } = req.params;
  const cards = await prisma.KudosCard.findMany({
    where: { KBid: parseInt(KBid) },
  });
  res.status(200).json(cards);
});

app.delete("/kudos-cards/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.KudosCard.delete({
    where: { id: parseInt(id) },
  });
  res.status(200).json({ message: "Card deleted successfully" });
});

app.put('/kudos-cards/:id', async (req, res) => {
  const { id } = req.params;
  const updatedCard = await prisma.KudosCard.update({
    where: { id: parseInt(id) },
    data: { upvote: {increment: 1} },
  })
  res.status(200).json(updatedCard);
});
