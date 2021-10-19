import { Box, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomContainer from '../../../components/ui/Container';
import CustomTypography from '../../../components/ui/Typography';
import CustomTextField from '../../../components/ui/TextField';
import CustomButton from '../../../components/ui/Button';
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { clearEmployee, createEmployee, fetchEmployeeDetailById, updateEmployee } from '../../../redux-thunk/thunk/Employee';
import { loaderStart, loaderStop } from '../../../redux-thunk/thunk/Loading';

const schema = yup.object().shape({
    name: yup.string().required("*Required").matches(/^[A-Za-z ]*$/, "Name should contain a character"),
    email: yup.string().required("*Required"),
    password: yup.string().required("*Required"),
    department: yup.string().required("*Required"),
    gender: yup.string().required("*Required"),
    mobile: yup.string().required("*Required"),
    address: yup.string().required("*Required"),
    city: yup.string().required("*Required"),
    state: yup.string().required("*Required"),
    country: yup.string().required("*Required"),
})

const useStyles = makeStyles({
    field: {
      marginTop: 20,
    },
    fullWidth: {
        width: '100%'
    },
})

const AddEmployee = () => {
    const classes = useStyles();
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
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset, control } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
    });
    const { id } = useParams();
    const employee = useSelector((state) => state.employeeReducer.employeeDetail);

    useEffect(() => {
      if (id) {
        dispatch(fetchEmployeeDetailById(id))
      }
    }, [id, dispatch]);
    
    useEffect(()=>{
      if(employee && id){
        reset(employee)
      }
      return () => {
        dispatch(clearEmployee())
      }
    }, [employee, reset, id, dispatch])
      
    const FormSubmit = async(data)=>{
      dispatch(loaderStart())
      if(id){
        data.id = parseInt(id);
        await dispatch(updateEmployee(data))
      }else{
        await dispatch(createEmployee(data))
        reset();
      }
      dispatch(loaderStop())
      history.push('/employees')
    }

    return (
      <CustomContainer>
        <CustomTypography
          variant="h5"
          label={id ? "Update Employee Details" : "Add Employee Details"}
          color="secondary"
        />
        <form noValidate autoComplete="off" onSubmit={handleSubmit(FormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Name"
                variant="outlined"
                color="secondary"
                className={classes.field}
                InputLabelProps={{ shrink: true }}
                required={true}
                name="name"
                inputRef={register}
              />
              {errors.name && (
                <CustomTypography
                  variant="caption"
                  label={errors.name.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Email"
                variant="outlined"
                color="secondary"
                className={classes.field}
                required={true}
                name="email"
                InputLabelProps={{ shrink: true }}
                inputRef={register}
              />
              {errors.email && (
                <CustomTypography
                  variant="caption"
                  label={errors.email.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Password"
                variant="outlined"
                color="secondary"
                className={classes.field}
                required={true}
                InputLabelProps={{ shrink: true }}
                name="password"
                inputRef={register}
                type="password"
              />
              {errors.password && (
                <CustomTypography
                  variant="caption"
                  label={errors.password.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box sx={{ minWidth: 120 }} style={{ paddingTop: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Controller
                    control={control}
                    name="department"
                    as={
                    <Select variant="outlined">
                      {departments.map((item) => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                      ))}
                    </Select>
                    }
                  />
                </FormControl>
              </Box>
              {errors.department && (
                <CustomTypography
                  variant="caption"
                  label={errors.department.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Gender"
                variant="outlined"
                color="secondary"
                className={classes.field}
                InputLabelProps={{ shrink: true }}
                required={true}
                name="gender"
                inputRef={register}
              />
              {errors.gender && (
                <CustomTypography
                  variant="caption"
                  label={errors.gender.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Mobile Number"
                variant="outlined"
                color="secondary"
                className={classes.field}
                required={true}
                InputLabelProps={{ shrink: true }}
                name="mobile"
                inputRef={register}
              />
              {errors.mobile && (
                <CustomTypography
                  variant="caption"
                  label={errors.mobile.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Address"
                variant="outlined"
                color="secondary"
                className={classes.field}
                required={true}
                InputLabelProps={{ shrink: true }}
                name="address"
                inputRef={register}
              />
              {errors.address && (
                <CustomTypography
                  variant="caption"
                  label={errors.address.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="City"
                variant="outlined"
                color="secondary"
                className={classes.field}
                InputLabelProps={{ shrink: true }}
                required={true}
                name="city"
                inputRef={register}
              />
              {errors.city && (
                <CustomTypography
                  variant="caption"
                  label={errors.city.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="State"
                variant="outlined"
                color="secondary"
                className={classes.field}
                InputLabelProps={{ shrink: true }}
                required={true}
                name="state"
                inputRef={register}
              />
              {errors.state && (
                <CustomTypography
                  variant="caption"
                  label={errors.state.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Country"
                variant="outlined"
                color="secondary"
                className={classes.field}
                InputLabelProps={{ shrink: true }}
                required={true}
                name="country"
                inputRef={register}
              />
              {errors.country && (
                <CustomTypography
                  variant="caption"
                  label={errors.country.message}
                  color="error"
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <CustomButton
                className={classes.fullWidth}
                type="submit"
                color="secondary"
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                label="Submit"
              />
            </Grid>
          </Grid>
        </form>
      </CustomContainer>
    );
}

export default AddEmployee
