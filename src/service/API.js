const BASE_URL = 'http://192.168.1.33:9002/api/v1'
const BASE_URL2 = 'http://192.168.1.33:9999/api/v1'
const BASE_URL3 = 'http://192.168.1.33:9995/api/v1'
const BASE_URL4 = 'http://192.168.1.33:9998/api/v1'
// const BASE_URL = process.env.API_URL
const API = {
    Course:{
        getAllCourse:`${BASE_URL}/course`,
        createCourse:`${BASE_URL}/course`,
        getCourseById:`${BASE_URL}/course/`, //+id
        updateCourse:`${BASE_URL}/course`,
    },
    Auth:{
        getAccessToken:`${BASE_URL}/auth/token/google/verify/`
    },
    User:{
        userJoinCourse:`${BASE_URL}/user/join`,
        getUser:`${BASE_URL}/user/`,
        getUserById:`${BASE_URL}/user/find/`, //+id
    },
    Lesson:{
        createLesson:`${BASE_URL}/lesson`,
        getLessonById:`${BASE_URL2}/lesson/`,
    },
    File:{
        getImage:`${BASE_URL3}/file/image/`
    },
    Assignment:{
        createAssignment:`${BASE_URL4}/assignment`,
        getAssignmentById:`${BASE_URL4}/assignment/`,  //+id
    },
    Validate:{
        getPreview:`${BASE_URL}/validate/veson`
    }
}
export default API
