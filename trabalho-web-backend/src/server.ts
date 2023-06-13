import express from 'express';
import cors from 'cors';

import { router as userRouter } from './routes/user';
import { router as serviceRouter } from './routes/service';

// Create an Express application instance
const app = express();

const PORT = 3001;

// Allow express to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRouter);
app.use('/services', serviceRouter);

// Open server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});
