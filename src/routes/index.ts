import Elysia from 'elysia'
import { toolsRoutes } from './tools'

const rootRoutes = new Elysia({
  prefix: '/api'
}).use(toolsRoutes)

export { rootRoutes }
