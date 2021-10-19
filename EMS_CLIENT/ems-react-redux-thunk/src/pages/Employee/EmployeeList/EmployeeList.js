import React, { useEffect, useState } from 'react'
import CustomButton from '../../../components/ui/Button'
import { useHistory } from "react-router-dom";
import { FormControl, Grid, InputLabel, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import CustomContainer from '../../../components/ui/Container';
import { withStyles } from '@material-ui/styles';
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CustomSelect from '../../../components/ui/Select';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, setFilterForEmployee } from '../../../redux-thunk/thunk/Employee';
import { useEmployeeSelector } from '../../../selectors/useEmployeeSelector'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  rightFloat: {
    float: 'right'
  },
});

const EmployeeList = () => {
    const history = useHistory();
    const styles = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const dispatch = useDispatch();
    const getFilter = useSelector((state) => state.employeeReducer.departmentFilter)
    // Get employees list from store
    const employeeList = useEmployeeSelector(getFilter)
    const [tableData, setTableData] = useState(employeeList);
    const departments = [
        {
          label: "Sales",
          value: "Sales" 
        },
        {
          label: "Marketing and Sales",
          value: "Marketing and Sales" 
        },
        {
          label: "Marketing",
          value: "Marketing" 
        },
        {
          label: "Human Resources",
          value: "Human Resources" 
        },
        {
          label: "Digital Marketing",
          value: "Digital Marketing" 
        },
        {
          label: "Technical Department",
          value: "Technical Department" 
        },
        {
          label: "App developers",
          value: "App developers" 
        },
        {
          label: "Maintainance Department",
          value: "Maintainance Department" 
        }
    ]

    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };


    useEffect(()=>{
      setTableData(employeeList);
    }, [employeeList.length])

    const selectFilter = (e) => {
      dispatch(setFilterForEmployee(e.target.value))
    };

    return (
      <CustomContainer>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <div style={{ display: "flex" }}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Filter
                </InputLabel>
                <CustomSelect options={departments} onChange={selectFilter} />
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <CustomButton
              className={styles.rightFloat}
              variant={"contained"}
              label="Add Employee"
              color="primary"
              onClick={() => history.push("/add-employee")}
            />
          </Grid>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableContainer component={Paper}>
              <Table className={styles.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>S.no.</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Mobile</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                {employeeList.length ? (
                  <TableBody>
                    {tableData
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
                        <StyledTableRow key={item.id}>
                          <StyledTableCell> {index + 1} </StyledTableCell>
                          <StyledTableCell> {item.name} </StyledTableCell>
                          <StyledTableCell> {item.email} </StyledTableCell>
                          <StyledTableCell> {item.mobile} </StyledTableCell>
                          <StyledTableCell style={{ cursor: "pointer" }}>
                            <EditIcon
                              onClick={() =>
                                history.push(`/edit-employee/${item.id}`)
                              }
                            />{" "}
                            <VisibilityIcon
                              onClick={() =>
                                history.push(`/view-employee/${item.id}`)
                              }
                            />{" "}
                            <DeleteIcon
                              onClick={() => {
                                dispatch(deleteEmployee(item.id))
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                ) : (
                  <></>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={tableData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </CustomContainer>
    );
}

export default EmployeeList
