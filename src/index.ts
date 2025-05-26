import { Elysia } from 'elysia'
import { rootRoutes } from './routes'

const app = new Elysia()

const PORT = process.env.PORT || 3000

app.use(rootRoutes).listen(PORT, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`)
})
