const Users = require('../classModel/usersClass').Users;
const Notes = require('../classModel/notesClass').Notes;
const fs = require('fs');
const { getConnection } = require('typeorm');

const submitNotes = async (reqParams, reqBody, reqFiles) => {
    try {
        let studId = reqParams.user_id;

        if (!reqFiles['notes'] || reqFiles['notes'] == 'null' || reqFiles['notes'] == undefined) {
            return 0;
        }

        let path = reqFiles['notes'][0].path;
        let file_name = reqFiles['notes'][0].originalname;

        fs.readFile(path, (err, data) => {
            if (err) {
                throw err;
            }
            let data1 = data.toString().length;
            if (data1 <= 0) {
                return 1;
            }
        });

        let data = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Notes)
                .values({
                    notes_name : file_name,
                    user_id : studId,
                    status : 1,
                    updated_by : studId,
                    created_at : new Date(),
                    updated_at : new Date()
                })
                .execute()
        return data;
    } catch (err) {
        throw err;
    }
}

const editNotes = async (reqParams,reqBody,reqFiles) =>{
    try{
        let updated_by = reqParams.user_id;;
        let notesId = reqParams.notes_id;

        let data = await getConnection()
            .createQueryBuilder()
            .update(Notes)
            .set({
                notes_name : reqFiles['notes'][0].originalname,
                updated_by : updated_by,
                updated_at : new Date()
            })
            .where("id =:id",{
                id : notesId
            })

        return data;

    }catch(err){
        throw err;
    }
}

const viewNotes = async (reqParams) =>{
    try{
        let studentId = reqParams.user_id;

        let data = await getConnection()
            .getRepository(Notes)
            .createQueryBuilder("n")
            .leftJoin(Users,"u","u.id = n.updated_by")
            .where("n.user_id =:id and n.status = 1",{
                id : studentId
            })
            .select([
                "n.id as notes_id",
                "n.notes_name as notes_name",
                "u.first_name as first_name",
                "u.last_name as last_name",
                "n.updated_at as updated_at"
            ])
            .getRawMany();

        let arr = [];

        for(i in data){
            let file_name = data[i].notes_name;
            let name = data[i].first_name + " " + data[i].last_name; 

            let obj = {
                id : data[i].notes_id,
                notes_name : data[i].notes_name,
                updated_by : name,
                updated_at : data[i].updated_at,
                url : `http://localhost:3100/student/static_file/${file_name}`
            }

            arr.push(obj);
        }

        return arr;
    }catch(err){
        throw err;
    }
}

module.exports = {
    submitNotes,
    editNotes,
    viewNotes
}