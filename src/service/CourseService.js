import axios from 'axios';
import API from './API'
import { useSelector } from "react-redux";
import useSWR from 'swr'
axios.defaults.withCredentials = true

class CourseService {
  static async createCourse(form){
    return await axios.post(API.Course.createCourse, form)
  }
  static async getCourseById(id){
    return await axios.get(API.Course.getCourseById+id)
  }
  static async updateCourse(form){
    return await axios.put(API.Course.updateCourse, form)
  }
}
export default CourseService;