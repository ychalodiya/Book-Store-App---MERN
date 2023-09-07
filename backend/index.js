import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

app.get('/', (request, response) => {
	console.log(request);
	return response.status(234).send('Welcome To Online Book Store');
});

app.use('/books', booksRoute);

mongoose
	.connect(process.env.mongoDBURL)
	.then(() => {
		console.log('App connected to database');
		app.listen(process.env.PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
