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
}
export default LessonService;