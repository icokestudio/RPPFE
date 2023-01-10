import React, { useState,useContext } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button, CustomInput } from 'reactstrap';
import { NavLink,Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import * as api from '../../api'
import {context} from '../../App'

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 8) {
    error = 'Value must be longer than 8 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  }
  return error;
};

const Login = () => {
  const [payload, setPayload] = useState({
    username: "",
    password: "",
    role:"student"
  })
  // eslint-disable-next-line no-return-await,no-unused-vars
  const [error, setError] = useState(false)
  // eslint-disable-next-line no-return-await,no-unused-vars
  const [loading, setLoading] = useState(false)
  const [data,setData] = useContext(context)

  const onUserLogin = () => {
    if (!loading) {
      setLoading(true)
      if (payload.username !== '' && payload.password !== '') {
        api.login(payload)
        .then(r=>{
          if(payload.role==="student" || payload.role==="course_operator")setData({...data,auth:r.data.auth,role:payload.role,odata:r.data.data})
          else setData({...data,auth:btoa(`${payload.username}:${payload.password}`),role:payload.role,odata:r.data.data})
          setLoading(false);
          NotificationManager.success("Login successful","Success",1500,null,null,'')
          if(payload.role==="student"){
            api.getResult(payload.username)
            .then(rr=>{
              console.log(rr.data)
              setData({...data,auth:r.data.auth,role:payload.role,odata:r.data.data,result:rr.data})
            })
            .catch(()=>{})
          }
        })
        .catch(e=>{
          setLoading(false)
          NotificationManager.error("Login Failed","Error",2000,null,null,'')})
      }
    }
  };

  return (
    data.role?<Redirect to="/app" />:<Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">RESULT PROCESSING MADE EASY</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not registered, please{' '}
              <NavLink to="/user/register" className="white">
              <u><b>register</b></u>
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              {/* <span className="logo-single" /> */}
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      {payload.role === 'admin'?"Admin Username": payload.role === 'course_operator'? "Staff ID": "Matric Number"}
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={()=>validateEmail(payload.username)}
                      value={payload.username}
                      onChange={e => setPayload({ ...payload, username: e.target.value })}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      value={payload.password}
                      validate={()=>validatePassword(payload.password)}
                      onChange={e => setPayload({ ...payload, password: e.target.value })}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <CustomInput
                    type="radio"
                    name="radiusRadio"
                    id="student"
                    label="Student"
                    inline
                    defaultChecked={payload.role === 'student'}
                    onChange={() => setPayload({...payload,role:"student"})}
                  />
                  <CustomInput
                    type="radio"
                    name="radiusRadio"
                    id="course_operator"
                    label="Course Operator"
                    inline
                    defaultChecked={payload.role === 'course_operator'}
                    onChange={() => setPayload({...payload,role:"course_operator"})}
                  />
                  <CustomInput
                    type="radio"
                    name="radiusRadio"
                    id="admin"
                    label="Admin"
                    inline
                    defaultChecked={payload.role === 'admin'}
                    onChange={() => setPayload({...payload,role:"admin"})}
                  />
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${loading ? 'show-spinner' : ''
                        }`}
                      size="lg"
                      onClick={onUserLogin}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
export default Login
