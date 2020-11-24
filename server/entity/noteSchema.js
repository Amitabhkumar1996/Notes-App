const EntitySchema = require("typeorm").EntitySchema;
const Notes = require("../classModel/notesClass").Notes;

module.exports = new EntitySchema({
    name : "Notes",
    target : Notes,
    columns : {
        id:{
            primary :true,
            type : "int",
            generated : true
        },
        notes_name:{
            type : "text",
            nullable :false
        },
        user_id:{
            type:"int",
            nullable:false
        },
        status :{
            type : "tinyint",
            nullable:true
        },
        updated_by :{
            type :"int",
            nullable:true
        },
        created_at:{
            type:"timestamp",
            nullable:true
        },
        updated_at:{
            type:"timestamp",
            nullable:true
        }
    }
})