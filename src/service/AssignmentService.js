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
  static async updateAssignment(form){
    return await axios.put(API.Assignment.updateAssignment, form)
  }
  static async validateAssignment(form){
    return await axios.post(API.Assignment.validateAssignment, form)
  }
}
export default AssignmentService;