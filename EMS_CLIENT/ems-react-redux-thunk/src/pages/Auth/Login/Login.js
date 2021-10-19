import { makeStyles } from '@material-ui/core'
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
import { userLogin } from '../../../redux-thunk/thunk/User';
import { loaderStart, loaderStop } from '../../../redux-thunk/thunk/Loading';

const schema = yup.object().shape({
  email: yup.string().email().required().default(""),
  password: yup.string().min(6).max(32).required().default(""),
});

const useStyles = makeStyles({
    field: {
      marginTop: 20,
    },
    fullWidth: {
        width: '100%'
    },
})

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit, errors, reset } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange"
    });
    const dispatch = useDispatch()

    const FormSubmit = (data) => {
      dispatch(loaderStart())
      dispatch(userLogin(data))
      dispatch(loaderStop())
      history.push("/");
      reset();
    };

    return (
      <CustomContainer>
        <CustomTypography
          variant="h5"
          label={"Company Login"}
          color="secondary"
        />

        <form autoComplete="off" onSubmit={handleSubmit(FormSubmit)}>
          <CustomTextField
            label="Email"
            variant="outlined"
            color="secondary"
            className={classes.field}
            InputLabelProps={{ shrink: true }}
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

          <CustomTextField
            label="Password"
            variant="outlined"
            type="password"
            color="secondary"
            className={classes.field}
            InputLabelProps={{ shrink: true }}
            name="password"
            inputRef={register}
          />
          {errors.password && (
            <CustomTypography
              variant="caption"
              label={errors.password.message}
              color="error"
            />
          )}
          <br />
          <br />
          <CustomButton
            className={classes.fullWidth}
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            label="Submit"
          />
        </form>
      </CustomContainer>
    );
}

export default Login
