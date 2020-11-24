class Users {
  constructor(
    id,
    first_name,
    last_name,
    email,
    password,
    phone,
    mobile,
    dob,
    classes,
    address,
    user_type,
    status,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.mobile = mobile;
    this.dob = dob;
    this.classes = classes;
    this.address = address;
    this.user_type = user_type;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = {
  Users: Users
};
