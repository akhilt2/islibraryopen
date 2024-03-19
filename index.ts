import express, { Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file

function parseAdminEnv(str: String) {
	if (!str) return null

	try {
		const admins: any = {}
		str.split(',').forEach((item) => {
			const temp = item.split(':')
			admins[temp[1]] = temp[0]
		})
		return admins
	} catch (err) {
		console.error(err)
		throw new Error('ADMINS env not set. Format: admin1name:token1,admin2name:token2')
	}
}

const port = process.env.PORT ?? 3000
const admins = parseAdminEnv(process.env.ADMINS ?? '')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())

interface SslStatus {
	isOpen: boolean
	currAdmin: String
	lastUpdated: String
	openTill: Date
//	openTill: Date
}

const sslStatus: SslStatus = {
	isOpen: false, // Initially closed
	currAdmin: 'SSL Admin',
	lastUpdated: new Date().toJSON(),
	openTill: new Date().toJSON()
}

// Route to serve the index.html file
app.get('/sslopen', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Route to get current store state
app.get('/sslopen/status', (req: Request, res: Response) => {
	// if current time is more than 
	const now = new Date().toJSON();
	sslStatus.isOpen = sslStatus.openTill >= now
	console.log(sslStatus)
	res.json({ sslStatus: sslStatus })
})

// Route to toggle store state with the provided token

app.get('/sslopen/edit/:token', (req, res) => {
    // Assuming the HTML file is located in the same directory as the server file
    const token= req.params.token;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    const currAdmin = admins[token];

    if (!currAdmin) {
        return res.status(403).json({ error: 'Invalid token' });
    }
    const filePath = path.join(__dirname, 'edit.html');
    res.sendFile(filePath);
});

app.post('/sslopen/edit/:token', (req,res) => {
    const token= req.params.token;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    const currAdmin = admins[token];

    if (!currAdmin) {
        return res.status(403).json({ error: 'Invalid token' });
    }
	console.log(req.body)
	sslStatus.openTill = req.body.opentill;
    sslStatus.currAdmin = currAdmin;
    sslStatus.lastUpdated = new Date().toJSON();

	res.redirect('/sslopen')
})
// Start the server
app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}/sslopen`)
})
