import axios from "axios"

const base = "/api"
const storage = JSON.parse(sessionStorage.getItem("data"))

// eslint-disable-next-line no-return-await,no-unused-vars
export const login = (payload) => {
        if (payload.role === "student") {
            const obj = {
                matric: payload.username,
                password: payload.password,
                flag: payload.role
            }
            return axios.post(`${base}/auth/login`, obj)
        }
        if (payload.role === "course_operator") {
            const obj = {
                id: payload.username,
                password: payload.password,
                flag: payload.role
            }
            return axios.post(`${base}/auth/login`, obj)
        }
        return axios.get(`${base}/auth/login/admin`, { headers: { "Authorization": `Basic ${btoa(`${payload.username}:${payload.password}`)}`}})

}
export const getResult=(id)=>{
    return axios.get(`${base}/student/${id}`)
}
export const getStudent=(id)=>{
    return axios.get(`${base}/student/get/${id}`)
}
export const yearsOfEntry=()=>{
    return axios.get(`${base}/entryyear`)
}
export const register=(payload)=>{
    if(payload.role==="student"){
        delete payload.role;
        delete payload.staffId;
        delete payload.status;
        return axios.post(`${base}/student`,payload)
    } 
    else{
        delete payload.role;
        delete payload.matricNumber;
        delete payload.othername;
        delete payload.yearOfEntry;
        delete payload.status
        return axios.post(`${base}/courseoperator`,payload)
    }
    
}
export const findResult=(matric,code)=>{
     return axios.get(`${base}/result/${matric}/${code}`)   
}
export const updateResult=(payload)=>{
    return axios.post(`${base}/result`,payload)   
}
export const uploadResult=(formdata)=>{
    const config = {
        headers: {
            'Authorization':`Bearer ${(JSON.parse(sessionStorage.getItem("data")).auth)}`
        }
    }
    return axios.post(`${base}/result/course/upload`,formdata,config)
}
export const getAllOperators=()=>{
    return axios.get(`${base}/courseoperator`) 
}
export const getCourseFile=(code)=>{
    return axios.get(`${base}/courseoperator/${code}/student`,{responseType:'blob'}) 

}
export const uploadCourseDetails=(formdata)=>{
    return axios.post(`${base}/course`,formdata)
}
export const uploadCourseAllocation=(formdata)=>{
    return axios.post(`${base}/courseoperator/allocate`,formdata)
}
export const uploadCoursereg=(formdata)=>{
    return axios.post(`${base}/currentsession/course/upload`,formdata)
}
export const createNewSession=(payload)=>{
    const obj={
        ...payload,
        startDate:Date.parse(payload.startDate),
        closeDate:Date.parse(payload.closeDate)
    }
    return axios.post(`${base}/currentsession`,obj,{headers:{Authorization:`Basic ${(JSON.parse(sessionStorage.getItem("data"))).auth}`}})
}
export const nextSemester=(id)=>{
    return axios.put(`${base}/currentsession/${id}`,{headers:{Authorization:`Basic ${(JSON.parse(sessionStorage.getItem("data"))).auth}`}})
}
export const updateDetails=()=>{
    return axios.get(`${base}/auth/login/admin`,{headers:{Authorization:`Basic ${(JSON.parse(sessionStorage.getItem("data"))).auth}`}})
}
export const getResultForSessionAndCourse=(session,code)=>{
    return axios.get(`${base}/auth/result/${session}/${code}`,{headers:{Authorization:`Basic ${(JSON.parse(sessionStorage.getItem("data"))).auth}`}})
}