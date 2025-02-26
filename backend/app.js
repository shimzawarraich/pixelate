import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';

const app = express();
app.use(express.json());
app.use("/api/user", router); // optional add next to this, http://localhost:3000/api/user/logon
mongoose.connect(
    "mongodb+srv://Fashionista:Pixelate.123@cluster0.8kogq.mongodb.net/FashionRetail?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port 3000"));
}).catch((err) => console.log(err));
