import express from 'express'
import cors from 'cors'
import createServer from './server'

const app = express()
app.use(cors())

createServer(app)

export default app
