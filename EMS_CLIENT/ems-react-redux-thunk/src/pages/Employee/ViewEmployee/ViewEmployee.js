import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomContainer from '../../../components/ui/Container'
import { clearEmployee, fetchEmployeeDetailById } from '../../../redux-thunk/thunk/Employee';
import { loaderStart, loaderStop } from '../../../redux-thunk/thunk/Loading';

const ViewEmployee = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    // Get Employee Detail by store 
    const employee = useSelector(state => state.employeeReducer.employeeDetail)

    useEffect(() => {
      if (id) {
        dispatch(loaderStart())
        dispatch(fetchEmployeeDetailById(id));
        dispatch(loaderStop())
      }
      return () => {
        dispatch(clearEmployee())
      }
    }, [id, dispatch]);

    return (
      employee && (
        <CustomContainer>
          <h2>Employee Details :</h2>
          <br />
          <br />
          <div style={{ backgroundColor: "lightgrey" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <h5>Name </h5>
              <h5>{employee.name}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <h5>Email </h5>
              <h5>{employee.email}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <h5>Contact no.</h5>
              <h5>{employee.mobile}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <h5>Address </h5>
              <h5>{employee.address}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <h5>City </h5>
              <h5>{employee.city}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <h5>State </h5>
              <h5>{employee.state}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <h5>Country </h5>
              <h5>{employee.country}</h5>
            </div>
          </div>
        </CustomContainer>
      )
    );
}

export default ViewEmployee
