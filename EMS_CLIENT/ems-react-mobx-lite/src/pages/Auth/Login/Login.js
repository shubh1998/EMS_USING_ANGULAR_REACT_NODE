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
import { observer } from 'mobx-react-lite';
import { loginRequest } from '../../../utils/services/user.service';
import { useAppStoreContext } from '../../../store-config/hooks/useAppStoreContext';

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

export const Login = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const {login, apiLoader} = useAppStoreContext()

  const LoginFunction = async(data) => {
    apiLoader.setLoadingOn('page')
    const result = await loginRequest(data)
    if(result){
      login.setLoggedIn(true)
      history.push("/");
      reset();
    }
    apiLoader.setLoadingOff("page");
  } 

   const FormSubmit = (data) => {
      // HIT LOGIN API and set authtoken in LOCALSTORAGE 
      LoginFunction(data)
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
})