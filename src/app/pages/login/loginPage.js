import { useFormik } from "formik";
import { useState } from "react";
import { mainIcon } from "../../shared/assets/images";
import { Button } from "../../shared/components/button/button";
import { CustomModal } from "../../shared/components/modal/modal";
import './style.css'
import { loginValidate, registerValidate, removeLocalStorageValueByKey, setLocalStorageValueByKey } from "../../shared/utilities/helper"
import { InputField } from "../../shared/components/inputField/inputField";
import { getUser, setUser } from "../../shared/services/authService";
import  { isEmpty } from 'lodash'
import { useNavigate } from "react-router-dom";
import { ACCOUNT } from "../../shared/utilities/const";
import { Toast, ToastContainer } from "react-bootstrap";
import { CustomToast } from "../../shared/components/toast/toast";

const LoginModalBody = (onLoginSubmit) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit: (values, { resetForm }) => {
      onLoginSubmit(values)
      resetForm();
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <InputField
        id="username"
        name="username"
        type="text"
        onChange={handleChange}
        value={values.username}
      />
      <div className='error-text'>
        {errors.username ? <span>{errors.username}</span> : null}
      </div>

      <label htmlFor="password">Password</label>
      <InputField
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        value={values.password}
      />
      <div className='error-text'>
        {errors.username ? <span>{errors.password}</span> : null}
      </div>

      <div className="login-button-container">
        <Button type="submit" isBulk text='Submit'/>
      </div>
    </form>
  );
}

const RegisterModalBody = (onRegisterSubmit) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      displayName: "",
      password1: "",
      password2: "",
    },
    validate: registerValidate,
    onSubmit: (values, { resetForm }) => {
      onRegisterSubmit(values)
      resetForm();
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <InputField
        id="username"
        name="username"
        type="text"
        onChange={handleChange}
        value={values.username}
      />
      <div className='error-text'>
        {errors.username ? <span>{errors.username}</span> : null}
      </div>
      
      <label htmlFor="displayName">Display Name</label>
      <InputField
        id="displayName"
        name="displayName"
        type="text"
        onChange={handleChange}
        value={values.displayName}
      />
      <div className='error-text'>
        {errors.displayName ? <span>{errors.displayName}</span> : null}
      </div>

      <label htmlFor="password1">Password</label>
      <InputField
        id="password1"
        name="password1"
        type="password"
        onChange={handleChange}
        value={values.password1}
      />
      <div className='error-text'>
        {errors.password1 ? <span>{errors.password1}</span> : null}
      </div>

      <label htmlFor="password2">Confirm Password</label>
      <InputField
        id="password2"
        name="password2"
        type="password"
        onChange={handleChange}
        value={values.password2}
      />
      <div className='error-text'>
        {errors.password2 ? <span>{errors.password2}</span> : null}
      </div>
      <div className="login-button-container">
        <Button type="submit" isBulk text='Submit'/>
      </div>
    </form>
  );
}

export function LoginPage() {
  removeLocalStorageValueByKey(ACCOUNT)
  const navigate = useNavigate();
  const [ showLogin, setShowLogin ] = useState(false)
  const [ showRegister, setShowRegister ] = useState(false)
  const [ isNotMatch, setIsNotMatch ] = useState(false)
  const [ isDuplicate, setIsDuplicate ] = useState(false)
  const [ isSuccess, setIsSuccess ] = useState(false)

  const onModalLoginToggle = () => {
    setShowLogin(!showLogin)
  }
  const onModalRegisterToggle = () => {
    setShowRegister(!showRegister)
  }

  const onLoginSubmit = async (values) => {
    console.log('onLoginSubmit', values)
    const { username, password } = values
    const userData = await getUser(username, password)
    console.log(userData)
    if (!isEmpty(userData)) {
      navigateToHomaPage(userData)
    } else {
      setShowLogin(false)
      setIsNotMatch(true)
      setTimeout(()=> {
        setIsNotMatch(false)
      }, 2000)
    }
  }

  const onRegisterSubmit = async (values) => {
    console.log('onRegisterSubmit', values)
    const { username, password1, displayName } = values
    const { authStatus, data } = await setUser(username, password1, displayName)
    console.log(authStatus, data)

    switch (authStatus) {
      case 'SUCCESS': 
        setShowRegister(false)
        setIsSuccess(true)
        setTimeout(()=> {
          setIsSuccess(false)
          navigateToHomaPage(data)
        }, 2000)
      break;
      case 'DUPLICATE': 
        setShowRegister(false)
        setIsDuplicate(true)
        setTimeout(()=> {
          setIsDuplicate(false)
        }, 2000)
      break;
      default: break;
    }
  }

  const navigateToHomaPage = (userData) => {
    updateAccountData(userData)
    navigate("../", { replace: true });
  }

  const updateAccountData = (values) => {
    setLocalStorageValueByKey(ACCOUNT, values)
  }

  const onLoginErrorToast = () => {
    return (
      <div className="text-center text-danger">
        <span>Username/Password not match.</span>
      </div>
    )
  }

  const onRegisterDuplicateToast = () => {
    return (
      <div className="text-center text-danger">
        <span>Username already exist.</span>
      </div>
    )
  }

  const onRegisterSuccessToast = () => {
    return (
      <div className="text-center text-success">
        <span>Register successfully.</span>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="content-container">
        <img src={mainIcon} alt="" />
        <div className="button-container">
          <Button type="button" onClick={onModalLoginToggle} isBulk text='Login'/>
          <Button type="button" onClick={onModalRegisterToggle} isBulk text='Register'/>
          <CustomModal 
            isShow={showLogin} 
            onHide={onModalLoginToggle} 
            ModalBodyRender={() => LoginModalBody(onLoginSubmit)}
          />
          <CustomModal 
            isShow={showRegister} 
            onHide={onModalRegisterToggle} 
            ModalBodyRender={() =>RegisterModalBody(onRegisterSubmit)}
          />
          <CustomToast
            isShow={isNotMatch}
            ToastBody={onLoginErrorToast}
          />
          <CustomToast
            isShow={isDuplicate}
            ToastBody={onRegisterDuplicateToast}
          />
          <CustomToast
            isShow={isSuccess}
            ToastBody={onRegisterSuccessToast}
          />
        </div>
      </div>
    </div>
  );
}