import { useFormik } from "formik";
import { useState } from "react";
import { mainIcon } from "../../shared/assets/images";
import { Button } from "../../shared/components/button/button";
import { CustomModal } from "../../shared/components/modal/modal";
import './style.css'
import { loginValidate, registerValidate } from "../../shared/utilities/helper"
import { InputField } from "../../shared/components/inputField/inputField";

const LoginModalBody = (onLoginSubmit) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit: (values) => {
      onLoginSubmit(values)
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
    onSubmit: (values) => {
      onRegisterSubmit(values)
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
        type="password1"
        onChange={handleChange}
        value={values.password1}
      />
      <div className='error-text'>
        {errors.username ? <span>{errors.password1}</span> : null}
      </div>

      <label htmlFor="password2">Confirm Password</label>
      <InputField
        id="password2"
        name="password2"
        type="password2"
        onChange={handleChange}
        value={values.password2}
      />
      <div className='error-text'>
        {errors.username ? <span>{errors.password2}</span> : null}
      </div>
      <div className="login-button-container">
        <Button type="submit" isBulk text='Submit'/>
      </div>
    </form>
  );
}

export function LoginPage() {
  const [ showLogin, setShowLogin ] = useState(false)
  const [ showRegister, setShowRegister ] = useState(false)

  const onModalLoginToggle = () => {
    setShowLogin(!showLogin)
  }
  const onModalRegisterToggle = () => {
    setShowRegister(!showRegister)
  }

  const onLoginSubmit = (values) => {
    console.log('onLoginSubmit')
    console.log(values)
  }

  const onRegisterSubmit = (values) => {
    console.log('onRegisterSubmit')
    console.log(values)
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
        </div>
      </div>
    </div>
  );
}