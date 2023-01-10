import React, { useState,useEffect } from 'react';
import classnames from 'classnames';
import { Button } from 'reactstrap';
import AddNewModal from './AddNewModal';
import * as api from '../../../api'

const ResultTable = ({ data,user="operator"}) => {
    useEffect(()=>{
        
    })
    const downloadCourseFile=(code)=>{
        api.getCourseFile(code)
        .then(response=>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download',code+".csv"); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }
    const [open,setOpen]=useState(false)
    const [code,setCode]=useState()
    const [type,setType]=useState()
    const a =["S/N","Course Code","Course Title","Course Unit","Query Result","Download Upload File"]
    const b =["S/N","Course Code","Course Title","Course Unit",]
    const headers =user==="operator"?a:b
    const queryResult=(r)=>{
        setCode(r)
        setType("query")
        setOpen(true)
    }
    const toggle=()=>{
        setOpen(false)
    }
    const uploadResult=()=>{
        setOpen(true)
        setType("upload")
    }

    return (
        <>
         {user==="operator"&&<Button onClick={uploadResult} className="float-right">Upload Result</Button>}
            <h4 className='float-left'><b>Courses</b></h4>
            <table className={`r-table table ${classnames({ 'table-divided': true })}`}>
                {<thead>
                    <tr>
                   { headers.map(l=><th className={'sorted-asc'}>
                        {l}
                        </th>)}
                    </tr>
                </thead>}
                <tbody>
                   {data.map((r,k)=><tr>
                        <td>
                            {k+1}
                        </td>
                        <td>
                        {r.courseCode}
                        </td>
                        <td>
                            {r.courseTitle}
                        </td>
                        <td>
                            {r.courseUnit}
                        </td>
                       { user==="operator"&&<td>
                            <Button onClick={()=>queryResult(r.courseCode)}>Query Result </Button>
                        </td>}
                        {user==="operator"&&<td>
                            <Button onClick={()=>downloadCourseFile(r.courseCode)}>Download</Button>
                        </td>}
                        
                    </tr>)}
                    
                </tbody>
            </table>
            <AddNewModal modalOpen={open} toggleModal={toggle} code={code} type={type}/>
            </>
    )

}
export default ResultTable;