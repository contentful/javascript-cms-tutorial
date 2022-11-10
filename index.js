import express, { json } from 'express'
import dotenv from 'dotenv'
import CMSRoutes from './routes/cmsroutes.js'

const app = express()
dotenv.config()

// settings
app.set('port', process.env.PORT || 8000)
app.use(json())

// routes
app.use('/', CMSRoutes)

// listening the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
