import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import contactRoutes from './routes/contactRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import githubRoutes from './routes/githubRoutes';
import portfolioRoutes from './routes/portfolioRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Antigravity Server is running.' });
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
  } finally {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
};

startServer();
