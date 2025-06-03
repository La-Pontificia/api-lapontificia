import Elysia from 'elysia'
import { cc_bitrix_jaguar } from '../controllers/tools'

const toolsRoutes = new Elysia({
  prefix: '/tools'
}).post('/cc_bitrix_jaguar', cc_bitrix_jaguar)

export { toolsRoutes }
