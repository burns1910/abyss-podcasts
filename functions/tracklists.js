require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('apphNeJsqj8zDi0X0')
  .table('tracklists')

exports.handler = async (event, context) => {
  const {id} = event.queryStringParameters
  if (id) {
    try {
      const tracklist = await airtable.retrieve(id)
      if(tracklist.error) {
        return {
          statusCode: 404,
          body: `No tracklist with id ${id} was found`
        }
      }
      return {
        statusCode:200,
        body: JSON.stringify(tracklist)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Internal Server Error`
      }
    }
  }
  try {
    const {records} = await airtable.list({sort: [{field: 'number'}]})
    const tracklists = records.map((tracklist)=> {
      const {id} = tracklist
      const {name, image} = tracklist.fields
      const image_url = image[0].url
      return {id,name,image_url}
    })
    return {
      statusCode: 200,
      body: JSON.stringify(tracklists)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    }
  }
}