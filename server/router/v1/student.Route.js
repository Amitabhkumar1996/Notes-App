const router = require('express').Router();
const { verify } = require('jsonwebtoken');
const multer = require('multer');
const { submit_notes,view_notes,edit_notes } = require('../../controller/studentController');
const {tokenVerify} = require("../../index");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,file.originalname.split('.')[0]+'.'+file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) { 
        if (['docx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
})

/*********************************************************************************************/

// upload notes
router.post("/:user_id/submitNotes",tokenVerify,upload.fields([{name : 'notes',maxCount:1}]),submit_notes);

// notes list
router.get("/:user_id/notesList",tokenVerify,view_notes);

// edit notes
router.put("/:user_id/",tokenVerify,upload.fields([{name : 'notes',maxCount : 1}]),edit_notes);

module.exports = router;