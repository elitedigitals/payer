import express from 'express';
import connectDb from './src/config/dbConfig.js';
import authRoutes from  './src/routes/auth.js';
const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON requests
app.use(express.json())

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the PayVault server!')
})

// Auth routes
app.use('/api/auth', authRoutes);

connectDb();

app.listen(PORT, () => {
    
  console.log(`Server is running on http://localhost:${PORT}`)
})



