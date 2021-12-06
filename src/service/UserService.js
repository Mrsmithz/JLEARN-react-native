import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class UserService {
    static async userJoinCourse(form){
        return await axios.post(API.User.userJoinCourse, form)
    }
    static async getUser(){
        return await axios.get(API.User.getUser)
    }
    static async getUserById(id){
        return await axios.get(API.User.getUserById + id)
    }
    static async getScoreboard(id){
        return await axios.get(API.User.getScoreboard + id)
    }
    static async getLastSubmitted(id){
        return await axios.get(API.User.getLastSubmitted + id)
    }
}

export default UserService;