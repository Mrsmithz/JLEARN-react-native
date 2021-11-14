import axios from 'axios';
import API from './API'
import { useSelector } from "react-redux";
import useSWR from 'swr'

axios.defaults.withCredentials = true

const fetcher = (...args) => axios.get(...args, {
  headers:{
    Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiTEVBUk5FUiIsImlkIjoiNjE4ZWFjZTA2MzE1MzAzYmVkZjFmZWQxIiwic3ViIjoiNjIwNzAxNjVAaXQua21pdGwuYWMudGgiLCJpYXQiOjE2MzY4OTYyMDQsImV4cCI6MTYzNjk4MjYwNH0.1s9gcWsczLUgpkztLndhUC1FMsF1S9A8T0ZdjRSawkdbJugv6v0GdyCBkKPl9mVY`
  }
}).then(res => res.data)
class ClassroomService {
  static async getAllClassroom() {
    const url = API.Classroom.getAllClassroom
    const {data, error} = useSWR(url, fetcher)
    console.log(data)
    return data
  }
  // static async getUsers(id) {
  //   return await axios.get(`${API.Classroom.getUser}/${id}/users`)
  // }
  // static async getOneClassroom(id) {
  //     return await axios.get(API.Classroom.getOneClassrom+id)
  // }
  // static async updateClassroom(id, payload){
  //   return await axios.put(API.Classroom.update+id, payload)

  // }
  // static async createClassroom(form){
  //   return await axios.post(API.Classroom.create, form)
  // }
  // static async deleteClassroom(id){
  //   return await axios.delete(API.Classroom.delete+id)
  // }
  // static async addUserClassroom(id, form){
  //   return await axios.put(API.Classroom.addUser+id, form)
  // }
  // static async updateUserRole(id, userId, form){
  //   return await axios.put(`${API.Classroom.updateRole}/${id}/role/${userId}`, form)
  // }
}
export default ClassroomService;