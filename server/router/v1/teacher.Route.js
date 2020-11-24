const router = require('express').Router();
const {tokenVerify} = require("../../index")
const {student_list,edit_notes,notes_list,view_notes} = require("../../controller/teacherController");
const multer = require('multer');

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

// list of student
router.get("/:user_id/studentList",tokenVerify,student_list);

// list of notes
router.get("/:user_id/notesList",tokenVerify,notes_list);

// notes list
router.get("/:user_id/notesList/:stud_id",tokenVerify,view_notes);

// edit notes
router.put("/:user_id/",tokenVerify,upload.fields([{name : 'notes',maxCount : 1}]),edit_notes);


module.exports = router;