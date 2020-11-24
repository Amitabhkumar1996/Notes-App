const Users = require('../classModel/usersClass').Users;
const Notes = require('../classModel/notesClass').Notes;
const { getConnection } = require('typeorm');
const bcrypt = require('bcrypt')
const Validator = require('email-validator')

const createUser = async (reqBody) => {
    try {
        let password = '';
        if (!reqBody.first_name || !reqBody.last_name || !reqBody.email || !reqBody.mobile_no || !reqBody.dob || !reqBody.address || !reqBody.user_type) {
            return 0;
        }

        if (reqBody.first_name == 'null' || reqBody.last_name == 'null' || reqBody.email == 'null'  || reqBody.mobile_no == 'null' || reqBody.dob == 'null' || reqBody.address == 'null' || reqBody.user_type == 'null') {
            return 1;
        }

        if (reqBody.first_name == '' || reqBody.last_name == '' || reqBody.email == ''  || reqBody.mobile_no == '' || reqBody.dob == '' || reqBody.address == '' || reqBody.user_type == '') {
            return 2;
        }

        let check_email_formate = Validator.validate(reqBody.email);
        if(check_email_formate == false){
            return 3;
        }

        let check_email = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("u")
            .where('u.email = :email', {
                email: reqBody.email
            })
            .select(['u'])
            .getRawOne();

        if (check_email) {
            return 4;
        }

        if(!reqBody.password || reqBody.password == 'null' || reqBody.password == ''){
            reqBody.password = '123456789';
        }
        if (!reqBody.phone_no || reqBody.phone_no == '' || reqBody.phone_no == 'null') {
            reqBody.phone_no = null;
        }

        if(reqBody.classes && reqBody.classes != '' && reqBody.classes !='null'){
            if(reqBody.classes <= 0 && reqBody.classes>10){
                return 5;
            }
        }

       let salt =  bcrypt.genSaltSync(10);
       password =  bcrypt.hashSync(reqBody.password, salt);

        let data = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Users)
            .values({
                first_name: reqBody.first_name,
                last_name: reqBody.last_name,
                email: reqBody.email,
                password: password,
                phone: reqBody.phone_no,
                mobile: reqBody.mobile_no,
                classes: reqBody.classes,
                dob: reqBody.dob,
                address: reqBody.address,
                user_type: reqBody.user_type,
                status: 1,
                created_at: new Date()
            })
            .execute();

        return data;
    } catch (err) {
        throw err;
    }
}

const loginUser = async (reqBody) => {
    try {
        if (reqBody.email == 'null' || !reqBody.email || reqBody.email == '') {
            return 0;
        }
        let data = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("u")
            .where("u.email =:email", {
                email: reqBody.email
            })
            .select(['u'])
            .getRawOne()

        return data;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    loginUser
}