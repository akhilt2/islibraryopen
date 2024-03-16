// Import required modules
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Create Express app
const app = express();
const port = 3000; // You can change this to any port you prefer

// Middleware
app.use(bodyParser.json());

// Store state
interface StoreState {
    isOpen: boolean;
}

let storeState: StoreState = {
    isOpen: 0// Initially closed
};

// Define routes
// Route to get current store state
app.get('/store-state', (req: Request, res: Response) => {
    res.json(storeState);
});

// Route to update store state
app.put('/store-state', (req: Request, res: Response) => {
    // Assume the request body contains { isOpen: true } or { isOpen: false }
    const newState: StoreState = req.body;
    if (newState.hasOwnProperty('isOpen')) {
        storeState.isOpen = newState.isOpen;
        res.json({ message: 'Store state updated successfully' });
    } else {
        res.status(400).json({ error: 'Invalid request body' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

