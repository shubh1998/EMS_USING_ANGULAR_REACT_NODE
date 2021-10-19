import { NotFoundPage } from "../components/layouts/NotFoundPage/NotFoundPage";
import { AboutUs } from "../pages/AboutUs/AboutUs";
import { Login } from "../pages/Auth/Login/Login";
import { Register } from "../pages/Auth/Register/Register";
import { ContactUs } from "../pages/ContactUs/ContactUs";
import { AddEmployee } from "../pages/Employee/Add-Employee/AddEmployee";
import { EmployeeList } from "../pages/Employee/EmployeeList/EmployeeList";
import { ViewEmployee } from "../pages/Employee/ViewEmployee/ViewEmployee";
import { Home } from "../pages/Home/Home";

const routerList = [
  {
    key: 1,
    label: "Home",
    path: "/",
    component: Home,
    hasNavbar: true,
  },
  {
    key: 2,
    label: "About Us",
    path: "/about-us",
    component: AboutUs,
    hasNavbar: true,
  },
  {
    key: 3,
    label: "Contact Us",
    path: "/contact-us",
    component: ContactUs,
    hasNavbar: true,
  },
  {
    key: 4,
    label: "Add Employee",
    path: "/add-employee",
    component: AddEmployee,
    hasNavbar: true,
  },
  {
    key: 5,
    label: "Edit Employee",
    path: "/edit-employee/:id",
    component: AddEmployee,
    hasNavbar: true,
  },
  {
    key: 6,
    label: "View Employee",
    path: "/view-employee/:id",
    component: ViewEmployee,
    hasNavbar: true,
  },
  {
    key: 7,
    label: "Employee List",
    path: "/employees",
    component: EmployeeList,
    hasNavbar: true,
  },
  {
    key: 8,
    label: "Company Login Page",
    path: "/login",
    component: Login,
    hasNavbar: true,
  },
  {
    key: 9,
    label: "Company Register Page",
    path: "/register",
    component: Register,
    hasNavbar: true,
  },
  {
    key: 10,
    label: "Not Found Page",
    component: NotFoundPage,
    hasNavbar: false,
  },
];

export default routerList;