import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface StoreState {
    isOpen: boolean;
    uuid?: string; // Added optional uuid property
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
app.get('/store-state', (req: Request, res: Response) => {
    res.json(storeState);
});

// Route to toggle store state with random generated UUID
app.get('/toggle-store-state/:uuid', (req: Request, res: Response) => {
    const uuid = req.params.uuid;
    if (uuid === storeState.uuid) {
        storeState.isOpen = !storeState.isOpen;
        res.json({ message: 'Store state toggled successfully' });
    } else {
        res.status(404).json({ error: 'Invalid UUID' });
    }
});

// Generate a UUID for the store state toggle
storeState.uuid = uuidv4();

// Log the valid UUID to the console
console.log(`Valid UUID for toggling store state: ${storeState.uuid}`);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

