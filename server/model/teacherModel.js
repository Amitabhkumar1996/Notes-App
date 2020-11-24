const { getConnection } = require('typeorm');

const Users = require('../classModel/usersClass').Users;
const Notes = require('../classModel/notesClass').Notes;

const studentList = async () => {
    try {
        let type = 'Student'
        let data = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("u")
            .where("u.user_type =:type and u.status = 1", {
                type: type
            })
            .select([
                "u.id as student_id",
                "u.first_name as stud_first_name",
                "u.last_name as stud_last_name",
                "u.email as stud_email",
                "u.phone as stud_phone_no",
                "u.mobile as stud_mobile_name",
                "u.dob as stud_dob",
                "u.classes as class",
                "u.address as address"

            ])
            .getRawMany();
        return data;
    } catch (err) {
        throw err;
    }
}

const notesList = async () => {
    try {
        let type = "Student";
        let arr = [];
        let students = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("u")
            .where("u.user_type =:type and u.status = 1", {
                type: type
            })
            .select([
                "u.id as student_id",
                "u.first_name as first_name",
                "u.last_name as last_name",
                "u.classes as class"
            ])
            .orderBy("u.classes", "ASC")
            .getRawMany();

        for (i in students) {
            let stud_id = students[i].student_id;
            let stud_name = students[i].first_name + " " + students[i].last_name;
            let stud_class = students[i].class;
            let obj = {
                userId: stud_id,
                stud_name: stud_name,
                classes: stud_class
            }

            let data = await getConnection()
                .getRepository(Notes)
                .createQueryBuilder("n")
                .leftJoin(Users, "u", "u.id = n.updated_by")
                .where("n.user_id =:id and n.status = 1", {
                    id: stud_id
                })
                .select([
                    "n.id as notes_id",
                    "n.notes_name as notes_name",
                    "u.first_name as first_name",
                    "u.last_name as last_name",
                    "n.updated_at as updated_at"
                ])
                .getRawMany();

            let arr1 = []
            for (i in data) {
                let file_name = data[i].notes_name;
                let name = data[i].first_name + " " + data[i].last_name;

                let obj1 = {
                    id: data[i].notes_id,
                    notes_name: data[i].notes_name,
                    updated_by: name,
                    updated_at: data[i].updated_at,
                    url: `http://localhost:3100/student/static_file/${file_name}`
                }

                arr1.push(obj1);
            }

            let object = {
                studnet: obj,
                stud_notes: arr1
            }
            arr.push(object);

        }

        return arr;
    } catch (err) {
        throw err;
    }
}

const viewNotes = async (reqParams) => {
    try {
        let studentId = reqParams.stud_id;
        let type = "Student";
        let arr = [];
        let object;

        let student = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("u")
            .where("u.user_type =:type and u.status = 1 and u.id =:id", {
                type: type,
                id : studentId
            })
            .select([
                "u.id as student_id",
                "u.first_name as first_name",
                "u.last_name as last_name",
                "u.classes as class"
            ])
            .getRawOne()
            
        if(!student)
        {
            return 0;
        }
        let name = student.first_name +" "+ student.last_name;
        let obj = {
            id : student.student_id,
            name : name,
            classes : student.class
        }

        let data = await getConnection()
            .getRepository(Notes)
            .createQueryBuilder("n")
            .leftJoin(Users, "u", "u.id = n.updated_by")
            .where("n.user_id =:id and n.status = 1", {
                id: studentId
            })
            .select([
                "n.id as notes_id",
                "n.notes_name as notes_name",
                "u.first_name as first_name",
                "u.last_name as last_name",
                "n.updated_at as updated_at"
            ])
            .getRawMany();

        let arr1 = [];

        for (i in data) {
            let file_name = data[i].notes_name;
            let name = data[i].first_name + " " + data[i].last_name;

            let obj = {
                id: data[i].notes_id,
                notes_name: data[i].notes_name,
                updated_by: name,
                updated_at: data[i].updated_at,
                url: `http://localhost:3100/student/static_file/${file_name}`
            }

            arr1.push(obj);
        }
        object = {
            student : obj,
            notes : arr1
        }
        arr.push(object);
        return arr;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    studentList,
    notesList,
    viewNotes
}