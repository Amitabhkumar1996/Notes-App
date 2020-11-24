const EntitySchema = require("typeorm").EntitySchema;
const Users = require("../classModel/usersClass").Users;

module.exports = new EntitySchema({
  name: "Users",
  target: Users,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    first_name: {
      type: "varchar",
      nullable: false
    },
    last_name: {
      type: "varchar",
      nullable: true
    },
    email: {
      type: "varchar",
      nullable: false
    },
    password: {
      type: "varchar",
      nullable: false
    },
    phone: {
      type: "varchar",
      nullable: true
    },
    mobile: {
      type: "varchar",
      nullable: true
    },
    dob: {
      type: "date",
      nullable: true
    },
    classes :{
      type : "int",
      nullable:true
    },
    address: {
      type: "text",
      nullable: true
    },
    user_type: {
      type: "enum",
      enum: ['Student', 'Teacher'],
      nullable: true
    },
    status: {
      type: "tinyint",
      nullable: true
    },
    created_at: {
      type: "timestamp",
      nullable: true
    },
    updated_at: {
      type: "timestamp",
      nullable: true
    },
  }
});
