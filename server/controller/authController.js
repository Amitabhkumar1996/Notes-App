const { loginUser, createUser } = require('../model/authModel');
const { route, successRoute, generateToken } = require('../index');
const { connection } = require('../BaseConnection');
const bcrypt = require('bcrypt');

const create_user = route(async (req, res) => {
  try {
    let url = `/v1/login${req.url}`;
    let data = await createUser(req.body);
    if (data == 0 || data == 1 || data == 2) {
      return res.send({
        message: `Provide All Required Feilds`,
        statusCode: 200,
        requestUrl: url,
        method: "POST",
        result: []
      })
    } else if (data == 3) {
      return res.send({
        message: `Provide Correct Email Formate`,
        statusCode: 200,
        requestUrl: url,
        method: "POST",
        result: []
      })
    } else if (data == 4) {
      return res.send({
        message: `Email Id Already Exits`,
        statusCode: 200,
        requestUrl: url,
        method: "POST",
        result: []
      })
    }else if (data == 5) {
      return res.send({
        message: `Class Must be Between 1 To 10`,
        statusCode: 200,
        requestUrl: url,
        method: "POST",
        result: []
      })
    }

    return res.send(successRoute("Registered Successfully !!!", url, "POST"));

  } catch (err) {
    throw err;
  }
})

const login_user = route(async (req, res) => {
  try {
    let url = `/v1/login${req.url}`;
    let data = await loginUser(req.body);
    if (data == 0) {
      return res.send({
        message: `Provid Email And Password`,
        statusCode: 409,
        requestUrl: url,
        method: "POST",
        result: []
      })
    }
    let Password_match = bcrypt.compareSync(req.body.password, data.u_password);

    if (data) {
      if (!Password_match) {
        return res.send({
          message: `Wrong Password`,
          statusCode: 404,
          requestUrl: url,
          method: "POST",
          result: []
        })
      }
    } else {
      return res.send({
        message: `Email Doesn't Exits For Login`,
        statusCode: 404,
        requestUrl: url,
        method: "POST",
        result: []
      })
    }

    let token = await generateToken(data);

    res.status(200).send({
      message: "Success",
      statusCode: 200,
      requestUrl: `/v1${req.url}`,
      method: "POST",
      results: {
        Id: data.u_Id,
        first_name: data.u_first_name,
        last_name: data.u_last_name,
        email: data.u_email,
        user_type: data.u_user_type,
        token: token
      }
    }).end();

  } catch (err) {
    throw err;
  }
})

module.exports = {
  create_user,
  login_user
}