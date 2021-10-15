const wa = require('@open-wa/wa-automate');
const axios = require('axios')
wa.create({
  sessionId: "COVID_HELPER",
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));




function start(client) {
  client.onMessage(async message => {
    message.body = message.body.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
    console.log(message.body.slice(0,8), message.body, encodeURI(message.body.substring(8)))
    if(message.body.slice(0,8) === '!anoacek'){
            axios.get(`http://127.0.0.1:5000/query?msg=${encodeURI(message.body.substring(8))}`)
            .then(response => {
                client.sendText(message.from, response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
  })
}