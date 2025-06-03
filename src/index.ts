import { Elysia } from 'elysia'
import { rootRoutes } from './routes'
import { connectToMysql } from './db'

const app = new Elysia()

const PORT = process.env.PORT || 3000

app
  .use(rootRoutes)
  .listen(PORT, () => {
    connectToMysql()
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`)
  })
  .get('/ping', () => {
    return {
      message: 'Pong with 🦊 Elysia',
      timestamp: new Date().toISOString()
    }
  })
