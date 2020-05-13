import React, { useState } from 'react';
import './index.scss';
import logo from 'static/svg/logo.svg';
import TextField from 'components/ReusedComponents/TextField';
import CheckBox from 'components/ReusedComponents/CheckBox';
import { isEmail } from 'services/validators';
import api from 'services/api';
import history from 'redux/history';

import { connect } from 'react-redux';
import { login } from 'redux/actions/login';

const Login = ({ login, isFeathing }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [errorMsg, setError] = useState('');
  const [errorEmail, setEmailError] = useState(false);
  const [errorPass, setPasswordError] = useState(false);

  const setCorrectData = () => {
    if (process.env.NODE_ENV === 'development') {
      setEmail('maincoach@example.com');
      setPassword('123456');
    };
  };

  const handleEmail = event => {
    const value = event.target.value;
    if (value.length <= 255) {
      setEmail(value);
      setError('');
      setEmailError(false);
    };
  };
  const handlePassword = event => {
    const value = event.target.value;
    if (value.length <= 255) {
      setPassword(value);
      setError('');
      setPasswordError(false);
    };
  };
  const handleCheckbox = event => {
    setCheckBox(event.target.checked);
  };

  const handleForm = e => {
    e.preventDefault();
    const errorString = [];
    if (!isEmail(email)) {
      errorString.push('Некорректный адрес электронной почты.');
      setEmailError(true);
    };
    if (password.length < 6) {
      errorString.push('Пароль слишком короткий(6-255 симмволов).');
      setPasswordError(true);
    };
    if (errorString.length) {
      setError(errorString.join(' '));
      return;
    } else {
      login({ email, password })
        .then(json => {
          api.setToken(json.response.token, checkBox);
          history.push('/');
        })
        .catch(err => {
          if (err.status === 401 || err.status === 400) {
            setEmailError(true);
            setPasswordError(true);
            setError('Данные некорректны.');
          };
        });
    };
  };

  return (
    <main className="login-page">
      <div className="login-page__container">
        <header className="title">{'Авторизация'}</header>
        <img className="logo" src={logo} alt="Main logo" onClick={setCorrectData} />
        <form autoComplete="on" onSubmit={handleForm}>
          <TextField center placeholder="Введите вашу почту" name="shootingemail"
            value={email} onChange={handleEmail} autoComplete="on"
            error={errorEmail}
          />
          <TextField className="password-field" type="password" name="shootingpassword"
            center placeholder="Введите ваш пароль" autoComplete="on"
            value={password} onChange={handlePassword}
            error={errorPass}
          />
          <div className="error-msg">{errorMsg}</div>
          <CheckBox center label="Запомнить меня" id="save-me" value={checkBox} onChange={handleCheckbox} />
          <button type="submit" className="login-btn" >{'Войти'}</button>
        </form>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  isFeathing: state.login.isFeathing
});

const mapDispatchToProps = {
  login
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Login));