const { sign, verify, JsonWebTokenError } = require('jsonwebtoken');
require('dotenv').config();

/**
 * Helper that throws an error to trigger a 400 response if a
 * field is missing
 * @param {Array<string>} requiredFields list of required fields
 * @param {any} body Body of the request
 */

function assertRequiredFields(requiredFields = [], body) {
  const missingFields = requiredFields.filter(field => !body[field]);
  if (missingFields.length > 0) {
    return {
      message: "Error",
      statusCode: 400,
      requiredFields: missingFields
    }
  }
  return "error"
}

const route = function (callback, options = {}) {
  return async (req, res, next) => {
    try {
      if (options.requiredFields) {
        let aa = assertRequiredFields(options.requiredFields, req.body);
        if (aa !== "error") {
          return res.status(400).send(aa).end();
        }
      }
      await callback(req, res, next);
    } catch (err) {
      throw err;
    }
  };
};

const successRoute = function (data, url, method, pages) {
  if (data && data.error) {
    return {
      message: data.error.message,
      statusCode: data.error.errorCode,
      requestUrl: url,
      data: data
    };
  }
  return {
    message: "Success",
    statusCode: 200,
    requestUrl: url,
    method: method,
    totalPages: pages,
    results: data
  };
};

const generateToken = async function (results) {

  try {
    if (results) {
      results.u_password = undefined;
      const jsonToken = sign({ result: results }, process.env.DEV_JWT_SECRET, { algorithm: "HS256", expiresIn: '1h' });
      return jsonToken;

    } else {
      return;
    }
  } catch (err) {
    throw err;
  }

}

const tokenVerify = async function (req, res, next) {
  try {
    let token;
    try {
      token = req.get("Authorization").slice(7)
    } catch (err) {
      res.status(401);
    }

    if (!token) {
      return res.status(401).send({
        message: "No token found!",
        statusCode: "404",
        requestUrl: `/v1/notes${req.url}`
      }).end();
    }

    var payload;
    try {
      payload = verify(token, process.env.DEV_JWT_SECRET);

      if (payload.result.u_id != req.params.user_id) {
        return res
          .send({
            message: "Invalid token",
            statusCode: "401",
            requestUrl: `/v1/notes${req.url}`
          })
          .end();
      }
    }
    catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.status(401).send({
          message: "Invalid token",
          statusCode: "401",
          requestUrl: `/v1/notes${req.url}`
        }).end();
      }
      return res.status(401).end();
    }
    return next();

  } catch (err) {
    throw err;
  }
}

module.exports = { successRoute, route, generateToken, tokenVerify };