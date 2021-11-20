import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class LessonService {
  static async createLesson(form){
    return await axios.post(API.Lesson.createLesson, form)
  }
  static async getLessonById(id){
    return await axios.get(API.Lesson.getLessonById+id)
  }
  static async updateLesson(form){
    return await axios.put(API.Lesson.updateLesson, form)
  }
}
export default LessonService;