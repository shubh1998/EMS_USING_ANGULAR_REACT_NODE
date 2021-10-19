import { Grid, makeStyles } from '@material-ui/core'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomContainer from '../../../components/ui/Container';
import CustomTypography from '../../../components/ui/Typography';
import CustomTextField from '../../../components/ui/TextField';
import { useHistory } from 'react-router';
import CustomButton from '../../../components/ui/Button';
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../../redux-saga/redux/User/userSlice';

const schema = yup.object().shape({
    company_name: yup.string().required("*Required").matches(/^[A-Za-z ]*$/, "Name should contain a character"),
    email: yup.string().required("*Required"),
    password: yup.string().required("*Required"),
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

const Register = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
    });
    const dispatch = useDispatch()
    const history = useHistory()

    const FormSubmit = (data)=>{
      dispatch(signUpUser(data))
      reset()
      history.push('/')
    }

    return (
      <CustomContainer>
        <CustomTypography
          variant="h5"
          label={"Register Company"}
          color="secondary"
        />
        <form noValidate autoComplete="off" onSubmit={handleSubmit(FormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomTextField
                label="Company Name"
                variant="outlined"
                color="secondary"
                className={classes.field}
                InputLabelProps={{ shrink: true }}
                required={true}
                name="company_name"
                inputRef={register}
              />
              {errors.company_name && (
                <CustomTypography
                  variant="caption"
                  label={errors.company_name.message}
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
                InputLabelProps={{ shrink: true }}
                required={true}
                name="email"
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
                InputLabelProps={{ shrink: true }}
                required={true}
                name="password"
                type="password"
                inputRef={register}
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
              <CustomTextField
                label="Mobile Number"
                variant="outlined"
                color="secondary"
                className={classes.field}
                InputLabelProps={{ shrink: true }}
                required={true}
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
                InputLabelProps={{ shrink: true }}
                required={true}
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

export default Register
