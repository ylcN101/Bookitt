import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import initializeDB from '@config/db';
import appointmentRouter from '@appointments/appointments.routes';
import shopRouter from '@shops/shops.routes';
import authRouter from '@auth/auth.router';
import userRouter from '@users/users.routes';
import serviceRouter from '@services/services.routes';
import cookieParser from 'cookie-parser';
import { verifyToken } from '@middlewares/jwt';

const app = express();

dotenv.config();
initializeDB();

const port = process.env.PORT ?? 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/appointments', appointmentRouter);
apiRouter.use('/shops', shopRouter);
apiRouter.use('/services', serviceRouter);

app.use('/api', apiRouter);

app.get('/**', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
