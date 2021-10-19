import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import CustomContainer from '../../../components/ui/Container'
import { viewEmployeeDetailsRequest } from '../../../utils/services/employee.service';

export const ViewEmployee = observer(() => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null)

  const getEmployeeDetail = async(id) => {
    const result = await viewEmployeeDetailsRequest(id)
    setEmployee(result)
  }

  useEffect(() => {
    if (id) {
      getEmployeeDetail(id)
    }
  }, [ id ]);
  
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
})