import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Row, Input, Button, CustomInput } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import * as api from '../../../api'
import { NotificationManager } from 'components/common/react-notifications';
const ResultTable = ({ match }) => {
    const [isSelected, setIsSelected] = useState(false)
    const [data, setData] = useState([])
    const [course, setCourse] = useState("")
    const [session, setSession] = useState("")
    const getResult = () => {
        api.getResultForSessionAndCourse(session, course)
            .then(r => {
                setData(r.data)
            })
            .catch(e => NotificationManager.error("Error fecthing result", "ERROR", 2000, null, null))
    }
    const headers = ["Course Code", "Course Title", "Course Unit", "Matric Number", "Score", "Grade"]
    const filter = () => {
        if(!isSelected) return data;
        var a =[]
        for(const r of data){
            if(r.ca+r.exam!==r.total) a=[...a,r]
        }
        return a;
    }
    return (
        <>

            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="menu.results" match={match} />
                    <Separator className="mb-5" />
                </Colxx>
            </Row>
            <Row className='float-right'>
                <CustomInput
                    className="itemCheck mb-0 mx-2"
                    type="checkbox"
                    checked={isSelected}
                    onChange={(event) => setIsSelected(!isSelected)}
                    label="Corrected Result Only"
                />
                <div className="mb-1 mx-2">
                    <Input
                        type="text"
                        placeholder='session (e.g 2014-2015)'
                        value={session}
                        onChange={e => setSession(e.target.value)}

                    />
                </div>

                <div className="mb-1 mx-2">
                    <Input
                        type="text"
                        placeholder='course (e.g CSC201)'
                        value={course}
                        onChange={e => setCourse(e.target.value)}
                    />
                </div>
                <Button onClick={getResult} className='float-right'>Get Results</Button>
            </Row>
            <>
               { data.length>0&&<table className={`r-table table ${classnames({ 'table-divided': true })}`}>
                    {<thead>
                        <tr>
                            {headers.map(l => <th className={'sorted-asc'}>
                                {l}
                            </th>)}
                        </tr>
                    </thead>}
                    <tbody>
                        {filter().map(r => <tr>
                            <td>
                                {r.course.courseCode}
                            </td>
                            <td>
                                {r.course.courseTitle}
                            </td>
                            <td>
                                {r.course.courseUnit}
                            </td>
                            <td>
                                {r.student.matricNumber}
                            </td>
                            <td>
                                {r.total}
                            </td>
                            <td>
                                {r.grade}
                            </td>
                        </tr>)}

                    </tbody>
                </table>}
            </>
        </>
    )

}
export default ResultTable;