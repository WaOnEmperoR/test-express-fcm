const express = require('express'); 
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

var admin = require("firebase-admin");
var fcm = require('fcm-notification');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var serviceAccount = require('./config/hvt-recharge-sdk.json')
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

dotenv.config()

const db_hvtapp = require("./models/hvtapp");
const User = db_hvtapp.user;

const PORT = 3000; 
  
app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 

app.post('/triggerPushNotification', (req, res) => {
  let tagId = req.body.tagId
  let transactionPk = req.body.transactionPk

  User.findOne({
    where: { tag_id: tagId }
  }).then(user => {
    // console.log(user)

    var additionalInfo = {
      code: 2,
      transactionPk: transactionPk,
      status: -1,
      note: "failed"
    }
    var additionalInfoJSON = JSON.stringify(additionalInfo)

    let message = {
      android: {
          notification: {
            title: 'Penghentian Pengisian Daya',
            body: `Pengisian Daya listrik kendaraan Anda gagal dihentikan`
          },
          data:{
            additionalInfo: additionalInfoJSON
          }
      },
      token: user.fcm_token
    };

    FCM.send(message, function (err, response) {
      if (err) {
        return res.status(400).send({'message': 'Failed to send notification with error',err});
      } else {
        return res.status(200).send({'message': "Send notification success", response});
      }
    })

  })
})
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 