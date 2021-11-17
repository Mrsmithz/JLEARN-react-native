import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class UserService {
    static async userJoinCourse(form){
        return await axios.post(API.User.userJoinCourse, form)
    }
}

export default UserService;