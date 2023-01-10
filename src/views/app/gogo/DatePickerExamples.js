/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, CardTitle, Input, Button, Col, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx } from 'components/common/CustomBootstrap';
import ResultTable from '../operator/ResultTable';
import * as api from '../../../api'
import { NotificationManager } from 'components/common/react-notifications';

const DatePickerExamples = () => {
  const [payload, setPayload] = useState({
    session: "",
    startDate: new Date(),
    closeDate: new Date()
  });
  const changeSemester=()=>{
    api.nextSemester(2)
    .then(r => {
      changer()
      NotificationManager.success("We are now in a new Semester", "Success", 2000, null, null)
    })
    .catch(e => {
      NotificationManager.error("Semester changed Failed", "ERROR", 2000, null, null)
    })
  }
  const [change,setChange]=useState(0)
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [file3, setFile3] = useState(null)
  const [hideA, setHideA] = useState(true)
  const toggleHide = () => {
    setHideA(!hideA)
  }
  const changer=()=>{
    setChange(Math.random())
  }
  const [session,setSession]=useState({
    operator:0,
    student:0,
    session:{
      semester:{
        name:""
      },
      session:{
        session:""
      }
    }
  })
  const [operator, setOperator] = useState([])
  useEffect(() => {
    api.getAllOperators()
      .then(r => {
        setOperator(r.data)
      })
      api.updateDetails()
      .then(r=>{setSession(r.data.data)
      })
  }, [change])
  const createSession = () => {
    if (Date.parse(payload.startDate) > Date.parse(payload.closeDate)) {
      NotificationManager.error("Close Date cannot preceed Start Date", "ERROR", 2000, null, null)
      return
    }
    if (payload.session === "") {
      NotificationManager.error("Session Name cannot be empty", "ERROR", 2000, null, null)
      return
    }
    api.createNewSession(payload)
      .then(r => {
        changer()
        NotificationManager.success("We are now in a new Session", "Success", 2000, null, null)
      })
      .catch(e => {
        NotificationManager.error("Session creation failed", "ERROR", 2000, null, null)
      })

  }
  const uploadreg = () => {
    if (file1 === null || file1.type !== "text/csv") {
      NotificationManager.error("Only .csv extension file is allowed", "ERROR", 2000, null, null)
      return
    }
    //  setLoading(true)
    const formdata = new FormData()
    formdata.append("file", file1)
    api.uploadCoursereg(formdata)
      .then(r => {
        changer()
        NotificationManager.success("Upload Successful", "Success", 2000, null, null)
      })
      .catch(e => {
        NotificationManager.error("Upload Failed", "ERROR", 2000, null, null)
      })
  }
  const uploadAllocation = () => {
    if (file2 === null || file2.type !== "text/csv") {
      NotificationManager.error("Only .csv extension file is allowed", "ERROR", 2000, null, null)
      return
    }
    //  setLoading(true)
    const formdata = new FormData()
    formdata.append("file", file2)
    api.uploadCourseAllocation(formdata)
      .then(r => {
        changer()
        NotificationManager.success("Upload Successful", "Success", 2000, null, null)
      })
      .catch(e => {
        NotificationManager.error("Upload Failed", "ERROR", 2000, null, null)
      })
  }
  const uploadCourses = () => {
    if (file3 === null || file3.type !== "text/csv") {
      NotificationManager.error("Only .csv extension file is allowed", "ERROR", 2000, null, null)
      return
    }
    //  setLoading(true)
    const formdata = new FormData()
    formdata.append("file", file3)
    api.uploadCourseDetails(formdata)
      .then(r => {
        changer()
        NotificationManager.success("Upload Successful", "Success", 2000, null, null)
      })
      .catch(e => {
        NotificationManager.error("Upload Failed", "ERROR", 2000, null, null)
      })
  }
  return (
    <>
      <Row>
        <Colxx xxs="12" xl="8" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                Create New Session
              </CardTitle>
              <label>
                Session (e.g 2019/2020)
              </label>
              <div className="mb-5">
                <Input
                  type="text"
                  value={payload.session}
                  onChange={e => setPayload({ ...payload, session: e.target.value })}
                />
              </div>
              
              <Row className="mb-5">
                
                <Colxx xxs="6">
                <label>
                Result Opening Date
              </label>
                  <DatePicker
                    selected={payload.startDate}
                    onChange={e => setPayload({ ...payload, startDate: e })}
                    placeholderText={`Result Upload Opening Date`}
                  />
                </Colxx>
                <Colxx xxs="6">
                <label>
                Result Closing Date
              </label>
                  <DatePicker
                    selected={payload.closeDate}
                    onChange={e => setPayload({ ...payload, closeDate: e })}
                    placeholderText={`Result Upload Opening Date`}
                  />
                </Colxx>
              </Row>
              <Button onClick={createSession} className='float-right'>Create Session</Button>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" xl="4" className="mb-4">
          <Row>
            <Colxx xxs="12" xl="6" className="mb-4">
              <Row>
                <Card className="h-100 w-100">
                  <CardBody>
                    <CardTitle>
                      <h2>
                       <b>  {session.operator}</b> Course Operator(s)
                      </h2>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Row>
            </Colxx>
            <Colxx xxs="12" xl="6" className="mb-4">
              <Row>
                <Card className="h-100 w-100">
                  <CardBody>
                    <CardTitle>
                     <h2>
                     <b>{session.student}</b> Student(s)
                     </h2>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Row>
            </Colxx>
          </Row>
          <Row>
            <Card className="h-100 w-100">
              <CardBody>
                <CardTitle>
                  <h2>
                    <b>{session.session.session.session}</b>
                  </h2>
                  <h3>
                    {session.session.semester.name}
                  </h3>
                </CardTitle>
                <Button onClick={changeSemester}className='float-right'>Next Semester</Button>
              </CardBody>
            </Card>
          </Row>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" xl="4" className="mb-4">
          <Card className="h-100">
            <CardBody>
              <CardTitle>
                Upload Course Allocation file (.csv)
              </CardTitle>
              <Input
                type="file"
                // value={file2}
                onChange={e => setFile2(e.target.files[0])}
              />
              <Button onClick={uploadAllocation} className='float-right'>Upload</Button>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" xl="4" className="mb-4">
          <Card className="h-100">
            <CardBody>
              <CardTitle>
                Upload Student Registration file (.csv)
              </CardTitle>
              <Input
                type="file"
                // value={file1}
                onChange={e => setFile1(e.target.files[0])}
              />
              <Button onClick={uploadreg} className='float-right'>Upload</Button>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" xl="4" className="mb-4">
          <Card className="h-100">
            <CardBody>
              <CardTitle>
                Upload Course Details file (.csv)
              </CardTitle>
              <Input
                type="file"
                onChange={e => setFile3(e.target.files[0])}
                
              />
              <Button onClick={uploadCourses} className='float-right'>Upload</Button>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Button className="mr-5" onClick={toggleHide}>{!hideA ? `Hide` : `Show`} Course Allocations</Button>
      {!hideA && <>{operator.map(p =>
        <>
          <Row>
            <h5><b> {`${p.firstname} ${p.lastname}`}'s </b></h5>
            <ResultTable data={p.courseList} user={"admin"} />
          </Row></>)}</>}
    </>
  );
};
export default (DatePickerExamples);
