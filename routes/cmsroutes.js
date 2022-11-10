import express from 'express'
import contentful from 'contentful-management'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.get('/authUser/:space_id', (req, res) => {
  axios
    .get(`https://cdn.contentful.com/spaces/${req.params.space_id}/entries`, {
      headers: {
        Authorization: `Bearer ${process.env.CDA_ACCESS_TOKEN}`,
      },
    })
    .then(() => {
      res.json('You are authorized to log in!!')
    })
    .catch((error) => {
      console.log(error)
    })
})

router.put(
  '/createContentType/:space_id/:environment_id/:content_type_id',
  (req, res) => {
    const { name } = req.body
    axios
      .put(
        `https://api.contentful.com/spaces/${req.params.space_id}/environments/${req.params.environment_id}/content_types/${req.params.content_type_id}`,
        JSON.stringify({
          name: name,
        }),
        {
          headers: {
            Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
            'content-type': 'application/vnd.contentful.management.v1+json',
          },
        }
      )
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
)

router.put(
  '/AddContentType/:space_id/:environment_id/:content_type_id',
  (req, res) => {
    const name = req.body.name
    const fields = req.body.fields
    axios
      .put(
        `https://api.contentful.com/spaces/${req.params.space_id}/environments/${req.params.environment_id}/content_types/${req.params.content_type_id}`,
        JSON.stringify({
          name: name,
          fields: fields,
        }),
        {
          headers: {
            Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
            'content-type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Version': req.body.content_version,
          },
        }
      )
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
)

router.put(
  '/activateContentType/:space_id/:environment_id/:content_type_id',
  (req, res) => {
    const client = contentful.createClient({
      accessToken: `${process.env.CMA_ACCESS_TOKEN}`,
    })

    client
      .getSpace(req.params.space_id)
      .then((space) => space.getEnvironment(req.params.environment_id))
      .then((environment) =>
        environment.getContentType(req.params.content_type_id)
      )
      .then((contentType) => contentType.publish())
      .then((contentType) =>
        res.json(`Content type ${contentType.sys.id} activated.`)
      )
      .catch(console.error)
  }
)

router.get('/editorInterfaces/:space_id/:environment_id', (req, res) => {
  axios
    .get(
      `https://api.contentful.com/spaces/${req.params.space_id}/environments/${req.params.environment_id}/editor_interfaces`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
        },
      }
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

router.put(
  '/updateEditorInterface/:space_id/:environment_id/:content_type_id',
  (req, res) => {
    const updated_data = req.body
    axios
      .put(
        `https://api.contentful.com/spaces/${req.params.space_id}/environments/${req.params.environment_id}/content_types/${req.params.content_type_id}/editor_interface/`,
        JSON.stringify({
          controls: updated_data.controls,
        }),
        {
          headers: {
            Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
            'content-type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Version': req.body.content_version,
          },
        }
      )
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
)

router.get('/CDA_Content_types/:space_id/:environment_id', (req, res) => {
  axios
    .get(
      `https://cdn.contentful.com/spaces/${req.params.space_id}/environments/${req.params.environment_id}/content_types?access_token=${process.env.CDA_ACCESS_TOKEN}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

export default router
