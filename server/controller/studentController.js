const {submitNotes,editNotes,viewNotes } = require('../model/studentModel')
const { route, successRoute } = require('../index');
const { connection } = require('../BaseConnection');

const submit_notes = route(async (req, res) => {
    try {
        let url = `/v1/student${req.url}`;
        let data = await submitNotes(req.params,req.body,req.files);
        if(data == 0){
            return res.send({
                message: "Provide Notes",
                statusCode: 200,
                requestUrl: url,
                method: "POST",
                result: []
              })
        }else if(data == 1){
            return res.send({
                message: "Notes Can't Emplty",
                statusCode: 200,
                requestUrl: url,
                method: "POST",
                result: []
              })
        }
        return res.send(successRoute("Notes Submitted Successfully",url,"POST"))
    } catch (err) {
        throw err;
    }
})

const edit_notes = route(async (req,res)=>{
    try{
        let url = `/v1/student${req.url}`;
        let data = await edit_notes(req.params,req.body,req.files);
        return res.send(successRoute(data,url,"PUT"));

    }catch(err){
        throw err;
    }
})

const view_notes = route(async (req,res)=>{
    try{
        let url = `/v1/student${req.url}`;
        let data = await viewNotes(req.params);
        return res.send(successRoute(data,url,"GET"));

    }catch(err){
        throw err;
    }
})

module.exports = {
    submit_notes,
    edit_notes,
    view_notes
}