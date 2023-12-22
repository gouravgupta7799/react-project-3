import React, { useState, useReducer, useContext } from 'react';
// import React, { useEffect } from 'react';
// import React, {useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, actions) => {

  if (actions.type === 'user_input') {
    return {
      value: actions.val,
      isValid: actions.val.includes('@')
    }
  }
  if (actions.type === 'input_blur') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const passwordReducer = (state, actions) => {
  if (actions.type === 'user_input') {
    return {
      value: actions.val,
      isValid: actions.val.trim().length > 6
    }
  }
  if (actions.type === 'input_blur') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const clgNameReducer = (state, actions) => {
  if (actions.type === 'user_input') {
    return {
      value: actions.val,
      isValid: actions.val.trim().length > 0
    }
  }
  if (actions.type === 'input_blur') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 0
    }
  }
  return {
    value: '',
    isValid: false
  }
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  // const [enteredcollegeName, setEnteredenteredcollegeName] = useState('');
  // const [collegeNameIsValid, setcollegeNameIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: undefined })
  const [passwordState, dispatchpassword] = useReducer(passwordReducer, { value: '', isValid: undefined })
  const [clgNameState, dispatchclgName] = useReducer(clgNameReducer, { value: '', isValid: undefined })
  // useEffect(() => {
  //   const identifire = setTimeout(() => {
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollegeName.trim().length > 0
  //   );
  //   }, 500)
  //   return () => {
  //     clearTimeout(identifire)
  //   }
  // }, [ enteredEmail, enteredPassword, enteredcollegeName])
  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'user_input', val: event.target.value })

    setFormIsValid(
      emailState.isValid && passwordState.isValid && clgNameState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchpassword({ type: 'user_input', val: event.target.value });

    setFormIsValid(
      emailState.isValid && passwordState.isValid && clgNameState.isValid
    );
  };

  const collegeNameChangeHandler = (event) => {
    // setEnteredenteredcollegeName(event.target.value);
    dispatchclgName({ type: 'user_input', val: event.target.value });

    setFormIsValid(
      clgNameState.isValid && emailState.isValid && passwordState.isValid
    );
  };



  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'input_blur' })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchpassword({ type: 'input_blur' })
  };

  const validatecollegeNameHandler = () => {
    // setcollegeNameIsValid(enteredcollegeName.trim().length > 0);
    dispatchclgName({ type: 'input_blur' })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLoggIn(emailState.value, passwordState.value, clgNameState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type='email'
          id="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          type='password'
          id="Password"
          label="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <label htmlFor="collegeName">collegeName</label>
        <Input
          type="collegeName"
          id="collegeName"
          label="collegeName"
          value={clgNameState.value}
          onChange={collegeNameChangeHandler}
          onBlur={validatecollegeNameHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card >
  );
};

export default Login;
