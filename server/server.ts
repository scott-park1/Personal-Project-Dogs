import express from 'express'
import path from 'path'

import dogsRoutes from './routes/dogs'

const server = express()

server.use(express.json())

server.use('/api/v1/dogs', dogsRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

export default server
