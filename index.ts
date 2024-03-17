import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface StoreState {
    isOpen: boolean;
}

let storeState: StoreState = {
    isOpen: false // Initially closed
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get current store state
app.get('/ssl-open', (req: Request, res: Response) => {
    res.json(storeState);
});

// Route to toggle store state with the provided token
app.get('/switch-ssl/:token', (req: Request, res: Response) => {
    const token = req.params.token;
    const secretToken = process.env.SECRET_TOKEN;

    if (!secretToken) {
        return res.status(500).json({ error: 'Secret token is not set' });
    }

    if (token === secretToken) {
        storeState.isOpen = !storeState.isOpen;
        res.json({ message: 'Store state toggled successfully' });
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
});

// Start the server
const startServer = () => {
    if (!process.env.SECRET_TOKEN) {
        console.error('Please provide a secret token using the SECRET_TOKEN environment variable.');
        process.exit(1);
    }
    
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
};

// Check if a secret token is provided
if (process.env.SECRET_TOKEN) {
    startServer();
} else {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Please provide the secret token: ', token => {
        process.env.SECRET_TOKEN = token.trim();
        readline.close();
        startServer();
    });
}
