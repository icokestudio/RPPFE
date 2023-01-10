import React, { useState,useEffect } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput
} from 'reactstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import { NotificationManager } from 'components/common/react-notifications';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import * as api from 'api'


const Register = ({ history }) => {
  const [years,setYears]=useState([])
  const [year,setYear]=useState({})
  useEffect(()=>{
    api.yearsOfEntry()
    .then(r=>{
      setYears(r.data)
    })
  },[])
  const [payload, setPayload] = useState({
    emailAddress: "",
    role: "student",
    firstname: "",
    lastname: "",
    password: "",
    othername: "",
    staffId: "",
    matricNumber: "",
    yearOfEntry: null,
    status: false
  })
  const [loading, setLoading] = useState(false)

  const onUserRegister = () => {
    if(!payload.status&&payload.role==="student"){
      setLoading(true)
      api.getStudent(payload.matricNumber)
      .then(r => {
        setLoading(false)
        if (r.data.password === null) {
          setPayload({ ...payload, status: true })
          NotificationManager.success("Valid Matric Number", "Success", 1400, null, null, "")
          return;
        }
        if (r.data === "") {
          NotificationManager.error("Invalid or unknown Matric Number, please check back again", "ERROR", 1400, null, null, "")
          return;
        }
        NotificationManager.info("Student Registered Already", "Information", 2000, null, null, "")
        return;
      })
      .catch(e => {
        setLoading(false)
        NotificationManager.error("Invalid or unknown Matric Number, please check back again", "ERROR", 1400, null, null, "")
        return;
      })
    }
      if(payload.status&&payload.role==="student" || payload.role==="course_operator"){
        if(payload.password.length<8){
          NotificationManager.error("password must be greater than 7 characters", "ERROR", 1400, null, null, "")
          return
        }
        setLoading(true)
        api.register(payload)
        .then(r=>{
          setLoading(false)
          NotificationManager.success("Registration Successful", "Success", 1400, null, null, "")
          location.replace("/user/login")
          return;
        })
        .catch(e=>{
          setLoading(false)
          NotificationManager.error("registration Failed. Please check through your submitted form", "ERROR", 1400, null, null, "")
          return
        })
      }
    };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">RESULT PROCESSING MADE EASY</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                <u><b>login</b></u>
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              {/* <span className="logo-single" /> */}
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>
              {payload.role === "course_operator" && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.staffId" />
                </Label>
                <Input type="name" defaultValue={payload.staffId} onChange={e => setPayload({ ...payload, staffId: e.target.value })} />
              </FormGroup>}
              {payload.role === "student" && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.MatricNumber" />
                </Label>
                <Input type="name" defaultValue={payload.matricNumber} onChange={e => setPayload({ ...payload, matricNumber: e.target.value })} disabled={payload.status} />
              </FormGroup>}
              {(payload.role === "course_operator" || payload.status) && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.firstname" />
                </Label>
                <Input type="name" defaultValue={payload.firstname} onChange={e => setPayload({ ...payload, firstname: e.target.value })} />
              </FormGroup>}
              {(payload.role === "course_operator" || payload.status) && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.lastname" />
                </Label>
                <Input type="name" defaultValue={payload.lastname} onChange={e => setPayload({ ...payload, lastname: e.target.value })} />
              </FormGroup>}
              {(payload.role === "student" && payload.status) && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.othername" />
                </Label>
                <Input type="name" defaultValue={payload.othername} onChange={e => setPayload({ ...payload, othername: e.target.value })} />
              </FormGroup>}
              {(payload.role === "course_operator" || payload.status) && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                 Email Address
                </Label>
                <Input type="name" defaultValue={payload.emailAddress} onChange={e => setPayload({ ...payload, emailAddress: e.target.value })} />
              </FormGroup>}
              {(payload.role === "student" && payload.status) && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.yearofentry" />
                </Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  options={years.map((x, i) => {
                    return { label: x.session.session, value: x.id, key: i };
                  })}
                  value={year}
                  onChange={(val) => {
                    setPayload({ ...payload, yearOfEntry: val.value})
                    setYear(val)
                  }}
                />
              </FormGroup>}

              {(payload.role === "course_operator" || payload.status) && <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.password" />
                </Label>
                <Input type="password" defaultValue={payload.password} onChange={e => setPayload({ ...payload, password: e.target.value })}/>
              </FormGroup>}
              <CustomInput
                type="radio"
                name="radiusRadio"
                id="student"
                label="Student"
                inline
                defaultChecked={payload.role === 'student'}
                onChange={() => setPayload({ ...payload, role: "student" })}
              />
              <CustomInput
                type="radio"
                name="radiusRadio"
                id="course_operator"
                label="Course Operator"
                inline
                defaultChecked={payload.role === 'course_operator'}
                onChange={() => setPayload({ ...payload, role: "course_operator" })}
              />

              <div className="d-flex justify-content-end align-items-center">

                <Button
                  color="primary"
                  className={`btn-shadow btn-multiple-state ${loading ? 'show-spinner' : ''
                    }`}
                  size="lg"
                  onClick={onUserRegister}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id={payload.role === 'student' && !payload.status ? "user.check" : payload.role === "course_operator" ? "user.registerco" : "user.register"} />
                  </span>
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Register
