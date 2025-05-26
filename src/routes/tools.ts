import Elysia from 'elysia'

const toolsRoutes = new Elysia({
  prefix: '/tools'
}).post('/cc_bitrix_jaguar', ({ body, status }) => {
  console.log(body)
  return status(200, body)
})

export { toolsRoutes }
