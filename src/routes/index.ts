import Elysia from 'elysia'
import { toolsRoutes } from './tools'

const rootRoutes = new Elysia({
  prefix: '/api'
})
  .use(toolsRoutes)
  .get('/ping', () => {
    return {
      message: 'pong',
      timestamp: new Date().toISOString()
    }
  })

export { rootRoutes }
