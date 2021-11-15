const BASE_URL = 'http://192.168.1.33:9002/api/v1'
// const BASE_URL = process.env.API_URL
const API = {
    Course:{
        getAllCourse:`${BASE_URL}/course`,
        createCourse:`${BASE_URL}/course`
    },
    Auth:{
        getAccessToken:`${BASE_URL}/auth/token/google/verify/`
    }
}
export default API
