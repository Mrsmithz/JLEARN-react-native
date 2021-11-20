import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class FilesService {
  static async getPdfDetail(id){
    return await axios.get(API.File.getPdfDetail + id)
  }
  static async getCodeDetail(id){
    return await axios.get(API.File.getCodeDetail + id)
  }
  static async getImageDetail(id){
    return await axios.get(API.File.getImageDetail + id)
  }
}
export default FilesService;