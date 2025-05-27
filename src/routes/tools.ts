import Elysia from 'elysia'

const toolsRoutes = new Elysia({
  prefix: '/tools'
}).post('/cc_bitrix_jaguar', ({ body, query, status }) => {
  console.log({ body, query })
  return status(200, body)
})

export { toolsRoutes }
