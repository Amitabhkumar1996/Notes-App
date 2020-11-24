const { route, successRoute } = require('../index');
const { connection } = require('../BaseConnection');
const {studentList,notesList,viewNotes} = require("../model/teacherModel");
const {editNotes} = require("../model/studentModel");

const student_list = route(async (req,res)=>{
    try{
        let url = `/v1/teacher${req.url}`;
        let data = await studentList();
        return res.send(successRoute(data,url,"GET"));
    }catch(err){
        throw err;
    }
})

const notes_list = route(async (req,res)=>{
    let url = `/v1/teacher${req.url}`;
        let data = await notesList();
        return res.send(successRoute(data,url,"GET"));
})

const edit_notes = route(async (req,res)=>{
    try{
        let url = `/v1/teacher${req.url}`;
        let data = await editNotes(req.params,req.body,req.files);
        return res.send(successRoute(data,url,"PUT"));

    }catch(err){
        throw err;
    }
})

const view_notes = route(async (req,res)=>{
    try{
        let url = `/v1/teacher${req.url}`;
        let data = await viewNotes(req.params);
        if(data == 0){
            return res.send({
                message: "Student Does Not Exits from Provided Id",
                statusCode: 200,
                requestUrl: url,
                method: "POST",
                result: []
              })
        }
        return res.send(successRoute(data,url,"GET"));

    }catch(err){
        throw err;
    }
})

module.exports = {
    student_list,
    notes_list,
    edit_notes,
    view_notes
}