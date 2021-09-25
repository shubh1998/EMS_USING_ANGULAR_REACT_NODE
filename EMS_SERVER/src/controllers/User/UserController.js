"use strict";

/**
 * @author 'SHUBHAM GUPTA'
 */
//----------------------------------------------UserController Start------------------------------------------------------------------

//Import Dependency(3rd party) Module
const validator = require("validator");
const bcrypt = require("bcrypt");

//Import Model Here
const User = require("../../models/User");
const AuthTable = require("../../models/AuthTable");

//=====================================================================================

const createEmployee = async (req, res) => {
  let data = req.body;
  data.is_active = true;
  data.user_type = "EMPLOYEE";
  data.company_id = req.user.user_id;

  if (!data.name) throw badRequestError("Please enter your name.");
  if (!data.email) throw badRequestError("Please enter your email.");
  if (!data.gender) throw badRequestError("Please enter your gender.");
  if (!data.department) throw badRequestError("Please enter your department.");
  if (!data.password) throw badRequestError("Please enter your password.");
  if (!data.address) throw badRequestError("Please enter your address.");
  if (!data.city) throw badRequestError("Please enter your city.");
  if (!data.state) throw badRequestError("Please enter your state.");
  if (!data.country) throw badRequestError("Please enter your country.");
  if (!data.mobile) throw badRequestError("Please enter your mobile.");
  if (data.mobile.length > 10) throw badRequestError("Mobile number should NOT be longer than 10 characters.");
  if (!validator.isEmail(data.email))
    throw badRequestError("please enter valid email id.");

  const result_1 = await User.query()
    .select("*")
    .where({"email": data.email, user_type: data.user_type})
    .first();

  const result_2 = await User.query()
    .select("*")
    .where({"mobile": data.mobile, user_type: data.user_type})
    .first();

  if (result_1) {
    throw badRequestError("Employee with this Email id already exist.");
  }

  if (result_2) {
    throw badRequestError("Employee with this Mobile Number already exist.");
  }

  const createdEmployee = await User.query()
    .insert(data)
    .returning("*");
  delete createdEmployee.password

  return createdResponse(
    res,
    createdEmployee,
    "Congratulations! Employee Created Successfully."
  );
};

const createCompany = async (req, res) => {
  let data = req.body;
  data.is_active = true;
  data.user_type = "COMPANY";

  if (!data.email) throw badRequestError("Please enter your email.");
  if (!data.company_name)
    throw badRequestError("Please enter your company_name.");
  if (!data.password) throw badRequestError("Please enter your password.");
  if (!data.address) throw badRequestError("Please enter your address.");
  if (!data.city) throw badRequestError("Please enter your city.");
  if (!data.state) throw badRequestError("Please enter your state.");
  if (!data.country) throw badRequestError("Please enter your country.");
  if (!data.mobile) throw badRequestError("Please enter your mobile.");
  if (data.mobile.length > 10) throw badRequestError("Mobile number should NOT be longer than 10 characters.");

  if (!validator.isEmail(data.email))
    throw badRequestError("please enter valid email id.");

  const result_1 = await User.query()
    .select("*")
    .where("email", data.email)
    .first();

  const result_2 = await User.query()
    .select("*")
    .where("mobile", data.mobile)
    .first();

  if (result_1) {
    throw badRequestError("Company with this Email id already exist.");
  }

  if (result_2) {
    throw badRequestError("Company with this Mobile Number already exist.");
  }

  const registeredCompany = await User.query()
    .insert(data)
    .returning("*");
  delete registeredCompany.password

  return createdResponse(
    res,
    registeredCompany,
    "Congratulations! Company Created Successfully."
  );
};

const companyLogin = async (req, res) => {
  let data = req.body;

  /** Validate for the empty fields */
  if (!data.email) throw badRequestError("Please enter email.");
  if (!validator.isEmail(data.email))
    throw badRequestError("Please enter a valid email.");
  if (!data.password) throw badRequestError("Please enter password.");
  if (data.password.length < 5)
    throw badRequestError("Minimum length of password should be 5");
  if (data.password.length > 32)
    throw badRequestError("Maximum length of password should be 32");

  /** Execute Query to fetch the user */
  const user = await User.query()
    .where({ email: data.email, user_type: "COMPANY" })
    .first();

  /* email not match */
  if (!user) {
    throw badRequestError("Please enter valid credentials.");
  }

  /* check user is_active or not */
  if (!user.is_active) {
    throw badRequestError("You are blocked by admin.");
  }

  /* Check Password matched OR not */
  if (!(await user.comparePassword(data.password))) {
    throw badRequestError("Please enter valid password.");
  }

  /****** Generate authenticated data and its auth_token *****/
  const authToken = await user.getJWT();
  res.setHeader("Content-Type", "application/json");
  res.setHeader("AuthToken", authToken);
  res.setHeader("Access-Control-Expose-Headers", "AuthToken");
  /******-----------------------------------------------*****/
  const tokenExist = await AuthTable.query()
    .select("id", "user_id")
    .where("user_id", user.id)
    .first();

  if (tokenExist) {
    await AuthTable.query()
      .patch({
        auth_token: authToken,
      })
      .where("user_id", user.id)
      .returning("*");
  } else {
    await AuthTable.query()
      .insert({
        user_id: user.id,
        auth_token: authToken,
      })
      .returning("*");
  }

  delete user.password;

  const returnData = {
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    user_type: "COMPANY",
    profile_pic: user.profile_pic,
    company_name: user.company_name,
  };

  return okResponse(
    res,
    {
      ...returnData,
    },
    "Login Successful"
  );
};

const userLogout = async (req, res) => {
  const logout = await AuthTable.query()
    .delete()
    .where({ user_id: req.user.user_id, id: req.user.user_id })
    .first().returning("*");

  return okResponse(res, 1 , "Logged out successfully.");
};

const getUserDetailById = async (req, res) => {
  const userId = req.query.id;

  if (!userId) throw badRequestError("Please pass id to get details.");

  const getUser = await User.query()
    .select("*")
    .where({"id": userId, company_id: req.user.user_id}).first();

  delete getUser.password

  if (!getUser) {
    throw notFoundError("User Data Not Found!!");
  } else {
    return okResponse(res, getUser, "User Data Get Successfully!!");
  }
};

const updateUser = async (req, res) => {
  const userId = req.query.id;
  let data = req.body;

  if (!userId) {
    throw badRequestError("Please pass id to update details.");
  }

  const result_1 = await User.query()
    .select("*")
    .where("email", data.email)
    .whereNot("id", userId)
    .first();

  const result_2 = await User.query()
    .select("*")
    .where("mobile", data.mobile)
    .whereNot("id", userId)
    .first();

  if (result_1) {
    throw badRequestError("Account with this email id already registered.");
  }

  if (result_2) {
    throw badRequestError(
      "Account with this mobile number already registered."
    );
  }

  if(data.password){
    data.password = await bcrypt.hash(data.password, 10);
  }

  let updateUser = await User.query()
    .update(data)
    .where({ id: userId, company_id: req.user.user_id })
    .first()
    .returning("*");

  if (!updateUser) throw badRequestError("Something Went Wrong");

  return okResponse(res, updateUser, "Congratulations! User Updated Successfully.");
};

const deleteUser = async (req, res) => {
  const userId = req.query.id;

  if (!userId) throw badRequestError("Please pass id to Delete details.");

  const getUser = await User.query().delete().where({"id": userId, company_id: req.user.user_id});

  if (!getUser) {
    throw notFoundError("User Data Not Found!!");
  } else {
    return okResponse(res, getUser, "User Data Deleted Successfully!!");
  }
};

const getAllEmployees = async (req, res) => {
  const allUsers = await User.query()
    .select(
      "id",
      "name",
      "email",
      "gender",
      "company_name",
      "department",
      "address",
      "city",
      "state",
      "country",
      "mobile",
      "profile_pic",
      "is_active",
      "user_type",
      "created_at",
      "company_id"
    )
    .where({"user_type": "EMPLOYEE",  "company_id": req.user.user_id})
    .andWhere((builder) => {
      if (req.query.department && req.query.department !== "") {
        return builder.where("department", decodeURIComponent(req.query.department));
      }
    })
    .orderBy("created_at", "desc");

  return okResponse(res, allUsers, "All User Get Successfully.");
};


const getAllDepartmentsOfCompany= async (req, res) => {
  const allDepartments = await User.query()
    .select(
      "id",
      "company_name",
      "company_id",
      "department"
    )
    .whereNot({ 'department': null, 'department': '' })
    .where("company_id", req.user.user_id)

  return okResponse(res, allDepartments, "All Departments Get Successfully.");
};

module.exports = {
  createEmployee,
  createCompany,
  companyLogin,
  userLogout,
  getUserDetailById,
  updateUser,
  deleteUser,
  getAllEmployees,
  getAllDepartmentsOfCompany,
};

//----------------------------------------------UserController End------------------------------------------------------------------
