const BASE_URL = 'http://192.168.1.34:9002/api/v1'
const BASE_URL2 = 'http://192.168.1.34:9999/api/v1'
const BASE_URL3 = 'http://192.168.1.34:9995/api/v1'
const BASE_URL4 = 'http://192.168.1.34:9998/api/v1'
// const BASE_URL = process.env.API_URL
const API = {
    Course:{
        getAllCourse:`${BASE_URL}/course`,
        createCourse:`${BASE_URL}/course`,
        getCourseById:`${BASE_URL}/course/`, //+id
        updateCourse:`${BASE_URL}/course`,
        deleteCourse:`${BASE_URL}/course/`,  //+id
    },
    Auth:{
        getAccessToken:`${BASE_URL}/auth/token/google/verify/`
    },
    User:{
        userJoinCourse:`${BASE_URL}/user/join`,
        getUser:`${BASE_URL}/user/`,
        getUserById:`${BASE_URL}/user/find/`, //+id
        getScoreboard:`${BASE_URL}/user/scoreboard/`, //+id
        getLastSubmitted:`${BASE_URL}/history/user/`, //+id
    },
    Lesson:{
        createLesson:`${BASE_URL}/lesson`,
        getLessonById:`${BASE_URL2}/lesson/`,
        updateLesson:`${BASE_URL2}/lesson`,
        deleteLesson:`${BASE_URL2}/lesson/`, //+id
    },
    File:{
        getImage:`${BASE_URL3}/file/image/`,
        getPdfDetail:`${BASE_URL}/file/detail/pdf/`, //+id
        getCodeDetail:`${BASE_URL}/file/detail/code/`, //+id
        getImageDetail:`${BASE_URL}/file/detail/image/`, //+id
    },
    Assignment:{
        createAssignment:`${BASE_URL4}/assignment`,
        getAssignmentById:`${BASE_URL4}/assignment/`,  //+id
        updateAssignment:`${BASE_URL4}/assignment`,
        validateAssignment:`${BASE_URL}/assignment/validate`,
        deleteAssignment:`${BASE_URL4}/assignment/`, //+id
    },
    Validate:{
        getPreview:`${BASE_URL}/validate/veson`
    }
}
export default API
