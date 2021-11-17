import axios from 'axios';
import API from './API'
import { useSelector } from "react-redux";
import useSWR from 'swr'
axios.defaults.withCredentials = true

class CourseService {
  static async createCourse(form){
    return await axios.post(API.Course.createCourse, form)
  }
}
export default CourseService;