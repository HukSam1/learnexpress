import express from 'express';
import { prisma } from "../lib/prisma.js";
const router = express.Router();

router.get('/register', async (req, res) => {
    res.render('auth/register.njk');
});

router.post('/register', async (req, res) => {
let user = await prisma.user.findUnique({
    where: { email: req.body.email },
});
if (!user && req.body.password === req.body.password_confirm) {
    await prisma.user.create({
data: {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, 
},
});
res.redirect("/login");
} else {
    res.redirect("/register");
}
});

router.get('/login', async (req, res) => {
    res.render('auth/login.njk');
});

router.post('/login', async (req, res) => {
let user = await prisma.user.findUnique({
    where: { email: req.body.email },
});
if(user && user.password === req.body.password){
    req.session.userID = user.id;
    req.session.save();
    res.redirect("/cats");
} else {
res.redirect('/login');
}
});

export default router;