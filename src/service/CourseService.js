import axios from 'axios';
import API from './API'
import { useSelector } from "react-redux";
import useSWR from 'swr'
axios.defaults.withCredentials = true

class CourseService {
  static getAllCourse() {
    const url = API.Course.getAllCourse
    return {url, fetcher}
  }
  static async createCourse(form){
    return await axios.post(API.Course.createCourse, form)
  }
}
export default CourseService;