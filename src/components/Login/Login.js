import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();

  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [enteredcollegeName, setEnteredenteredcollegeName] = useState('');
  const [collegeNameIsValid, setcollegeNameIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollegeName.trim().length > 0
    );
  }, [ enteredEmail, enteredPassword, enteredcollegeName])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6 && enteredcollegeName.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@') && enteredcollegeName.trim().length > 0
    );
  };

  const collegeNameChangeHandler = (event) => {
    setEnteredenteredcollegeName(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 0 && enteredPassword.length > 6 && enteredEmail.includes('@')
    );
  };



  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validatecollegeNameHandler = () => {
    setcollegeNameIsValid(enteredcollegeName.trim().length > 0);
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword, enteredcollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${collegeNameIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collegeName">collegeName</label>
          <input
            type="text"
            id="collegeName"
            value={enteredcollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validatecollegeNameHandler}
          />
        </div>
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
