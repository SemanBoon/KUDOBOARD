const { PrismaClient } = require('@prisma/client');
// const e = require('cors');
const prisma = new PrismaClient();
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT  || 5175;

const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


app.post('/kudos-board', async (req, res) => {
    console.log('IN THE BACKEND');
    const {imgUrl, title, category, author } = req.body;
    const newBoard = await prisma.KudosBoard.create({
        data: {imgUrl, title, category, author}
    });
    console.log(newBoard);
    res.status(200).json(newBoard)
});

app.get('/kudos-board', async (req, res) => {
    console.log('IN THE BACKEND GET REQUEST');
    const kudosBoard = await prisma.KudosBoard.findMany()
    res.status(200).json(kudosBoard)
});

app.get('/kudos-board/:id', async (req, res) => {
    const { id } = req.params;
    const board = await prisma.KudosBoard.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(board);
});

app.delete('/kudos-board/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);
    await prisma.KudosBoard.delete({
        where: {id: parseInt(id) }
    });
    res.status(200).json({message: 'board deleted'})
});


app.post('/kudos-cards', async (req, res) => {
    const {gifUrl, title, description, KBid, upvote, owner } = req.body;
    const newCard = await prisma.KudosCard.create({
        data: {gifUrl, title, description, KBid, upvote, owner}
    });
    res.status(200).json(newCard)
});

app.get('/kudos-cards', async (req, res) => {
    const kudosCard = await prisma.KudosCard.findMany()
    res.status(200).json(kudosCard)
});

app.delete('/kudos-cards/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.KudosCard.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: 'Card deleted successfully' });
});



// app.get('/kudos-cards/KBid', async (req, res) => {});
// //returning information of each board and all of its cards

// app.put('/kudos-cards/:id', async (req, res) => {});
// //updates a card upvote count
