import axios from 'axios';
import API from './API'
import { useSelector } from "react-redux";
import useSWR from 'swr'
axios.defaults.withCredentials = true

class AssignmentService {
  static async createAssignment(form) {
    return await axios.post(API.Assignment.createAssignment, form)
  }
  static async getAssignmentById(id){
    return await axios.get(API.Assignment.getAssignmentById + id)
  }
}
export default AssignmentService;