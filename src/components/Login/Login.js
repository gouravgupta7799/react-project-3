import React, { useState, useReducer, useContext, useRef } from 'react'

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

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: undefined })
  const [passwordState, dispatchpassword] = useReducer(passwordReducer, { value: '', isValid: undefined })
  const [clgNameState, dispatchclgName] = useReducer(clgNameReducer, { value: '', isValid: undefined })

  const emailInputRef = useRef()
  const paaswordInputRef = useRef()
  const collageNameInputRef = useRef()

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'user_input', val: event.target.value })

    setFormIsValid(emailState.isValid && passwordState.isValid && clgNameState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({ type: 'user_input', val: event.target.value });

    setFormIsValid(emailState.isValid && passwordState.isValid && clgNameState.isValid);
  };

  const collegeNameChangeHandler = (event) => {
    dispatchclgName({ type: 'user_input', val: event.target.value });

    setFormIsValid(clgNameState.isValid && emailState.isValid && passwordState.isValid);
  };



  const validateEmailHandler = () => {
    dispatchEmail({ type: 'input_blur' })
  };

  const validatePasswordHandler = () => {
    dispatchpassword({ type: 'input_blur' })
  };

  const validatecollegeNameHandler = () => {
    dispatchclgName({ type: 'input_blur' })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLoggIn(emailState.value, passwordState.value, clgNameState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus()
    } else if (!passwordState.isValid) {
      paaswordInputRef.current.focus()
    } else {
      collageNameInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type='email'
          id="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={paaswordInputRef}
          type='password'
          id="Password"
          label="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          ref={collageNameInputRef}
          type="collegeName"
          id="collegeName"
          label="collegeName"
          value={clgNameState.value}
          onChange={collegeNameChangeHandler}
          onBlur={validatecollegeNameHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card >
  );
};

export default Login;
