const promiseRouter = require("express-promise-router");
const router = promiseRouter();

//----------Using passport for authentication---------
var passport = require("passport");
require("../../middleware/passport");

// load the dependent controller
const UserManagement = require("../../controllers/mainController").UserManagement;

router.post("/company/register", UserManagement.createCompany);

router.post("/company/login", UserManagement.companyLogin);

router.post("/employee/add", passport.authenticate("jwt", { session: false }) ,UserManagement.createEmployee);

router.get(
  "/user/logout",
  passport.authenticate("jwt", { session: false }),
  UserManagement.userLogout
);

router.patch(
  "/update/user",
    passport.authenticate("jwt", { session: false }),
  UserManagement.updateUser
);

router.get(
  "/all/employees",
    passport.authenticate("jwt", { session: false }),
  UserManagement.getAllEmployees
);

router.get(
  "/getuserbyid",
    passport.authenticate("jwt", { session: false }),
  UserManagement.getUserDetailById
);

router.delete(
  "/deleteuserbyid",
    passport.authenticate("jwt", { session: false }),
  UserManagement.deleteUser
);

router.get(
  "/company/departments",
    passport.authenticate("jwt", { session: false }),
  UserManagement.getAllDepartmentsOfCompany
);

module.exports = router;
