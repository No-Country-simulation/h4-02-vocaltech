require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')  //to upload files
const fs = require('fs')  //to read files from the file system
const wappurl = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_ACCESS_TEST_PHONE_NUMBER}`
const phone_number = '541124020248'

async function sendTemplateMessage() {
    const response = await axios({
        url: `${wappurl}/messages`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phone_number,
            type: 'template',
            template:{
                name: 'hello_world',
                language: {
                    code: 'en_US'
                }
            }
        })
    })

    console.log(response.data)
}

async function sendTemplateMessageDiscount() {
    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/phone_number_id/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: 'phone_number',
            type: 'template',
            template:{
                name: 'discount',
                language: {
                    code: 'en_US'
                },
                components: [
                    {
                        type: 'header',
                        parameters: [
                            {
                                type: 'text',
                                text: 'John Doe'
                            }
                        ]
                    },
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: '50'
                            }
                        ]
                    }
                ]
            }
        })
    })

    console.log(response.data)
}


async function sendTextMessage() {
    const response = await axios({
        url: `${wappurl}/messages`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phone_number,
            type: 'text',
            text:{
                body: 'This is a text message to database'
            }
        })
    })

    console.log(response.data) 
}

async function sendMediaMessage() {
    const response = await axios({
        url: `${wappurl}/messages`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phone_number,
            type: 'image',
            image:{
                link: 'https://dummyimage.com/600x400/000/fff.png&text=manfra.io',
                //instead of a link, also you can upload image to whatsapp API database first and get its id as response and use it here
                // id: '512126264622813',
                caption: 'This is a media message'
            }
        })
    })

    console.log(response.data)    
}

//to upload an image to whatsapp API database
// https://developers.facebook.com/docs/whatsapp/api/messages/media check this link for more info
// https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media check this link for more info
async function uploadImage() {
    const data = new FormData()
    data.append('messaging_product', 'whatsapp')
    data.append('file', fs.createReadStream(process.cwd() + '/logo.png'), { contentType: 'image/png' })  //CWD() current working directory
    data.append('type', 'image/png')

    const response = await axios({
        url: `${wappurl}/media`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`
        },
        data: data
    })

    console.log(response.data)     
}

sendTemplateMessage()
// sendTemplateMessageDiscount()

// sendTextMessage()

// sendMediaMessage()

// uploadImage()