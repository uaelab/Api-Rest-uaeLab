const express = require('express');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const multer = require('multer');
const mimeTypes = require('mime-types');

const guias = require('../models/guia');
const router = express.Router();

router.get('/', (req, res) => {
    guias.find()
        .exec()
        .then(x => res.status(200).send(x));
});

/*
router.get('/:id', (req, res) => {
    guias.findById(req.params.id)
        .exec()
        .then( x => res.status(200).send(x) )
});
*/

router.get('/:laboratorio', (req, res) => {
    //`${req.params.asignatura}`
    guias.find({ "laboratorio_id": req.params.laboratorio })
        .exec()
        .then(x => res.status(200).send(x))
});




// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../serverless/files/')
    },
    filename: function (req, file, cb) {
        cb("", file.originalname + '-' + Date.now() + '.' + mimeTypes.extension(file.mimetype))
    }
})

var upload = multer({ storage: storage })



//Subiendo archivo a google drive
router.post('/files/add', upload.single('file'), (req, res) => {


    //console.log(req.body)
    console.log(req.file)
    // If modifying these scopes, delete token.json.
    const SCOPES = [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.photos.readonly',
        'https://www.googleapis.com/auth/drive.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = '../serverless/token.json';

    // Load client secrets from a local file.
    fs.readFile('../serverless/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), listFiles);
    });

    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials, callback) {
        //const {client_secret, client_id, redirect_uris} = credentials.installed;
        var client_secret = "mJihpyf3jBcvJd_ILo1HlDam";
        var client_id = "56304631437-33a03fuptsum1anhtv7uu3t5ct7cq7bm.apps.googleusercontent.com";
        var redirect_uris = "https://developers.google.com/oauthplayground";
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
    * Get and store new token after prompting for user authorization, and then
    * execute the given callback with the authorized OAuth2 client.
    * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
    * @param {getEventsCallback} callback The callback for the authorized client.
    */
    function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }

    /**
    * Lists the names and IDs of up to 10 files.
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
    function listFiles(auth) {
        const drive = google.drive({ version: 'v3', auth });

        //subir archivos  a drive

        var fileMetadata = {
            'name': req.file.filename
        };
        var media = {
            mimeType: 'application/pdf',
            body: fs.createReadStream(req.file.path)
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            //fields: '*'
            fields: 'id, webViewLink'
        }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                console.log(file.data)
                res.status(200).send(file.data);
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                });
                //console.log('File Id: ', file.data.id);
            }
        })
    }



});



router.post('/', (req, res) => {
    guias.create(req.body).then(x => res.status(201).send(x))
});

router.put('/:id', (req, res) => {
    guias.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendstatus(204))
});

router.delete('/:id', (req, res) => {
    guias.findByIdAndDelete(req.params.id).exec().then(() => res.sendstatus(204))
});

module.exports = router;