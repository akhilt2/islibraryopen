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

interface SslStatus {
	isOpen: boolean
	currAdmin: String
	lastUpdated: String
}

const sslStatus: SslStatus = {
	isOpen: false, // Initially closed
	currAdmin: 'SSL Admin',
	lastUpdated: new Date().toJSON(),
}

// Route to serve the index.html file
app.get('/sslopen', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Route to get current store state
app.get('/sslopen/status', (req: Request, res: Response) => {
	res.json({ sslStatus: sslStatus })
})

// Route to toggle store state with the provided token
app.get('/sslopen/switch-ssl/:token', (req: Request, res: Response) => {
	const token = req.params.token

	const currAdmin = admins[token]

	if (!currAdmin) {
		res.status(403).json({ error: 'Invalid token' })
	} else {
		sslStatus.isOpen = !sslStatus.isOpen
		sslStatus.currAdmin = currAdmin
		sslStatus.lastUpdated = new Date().toJSON()
		res.json({ message: 'Store state toggled successfully' })
	}
})

// Start the server
app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}/sslopen`)
})
