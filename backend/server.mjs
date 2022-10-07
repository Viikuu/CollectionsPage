import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connection} from './utils/db.mjs';
import {userRoutes} from './routers/userRoutes.mjs';
import {authRoutes} from './routers/authRouter.mjs';
import {authenticateToken} from './middleware/authMiddleware.mjs';

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(cors(
	{
		origin: process.env.FRONT_URL,
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		credentials: true,
	}
));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", authenticateToken, userRoutes);

await connection();

app.listen(process.env.PORT, () => {
	console.log('Listening on Port ' + process.env.PORT);
});
