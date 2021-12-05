import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class ValidateService {
  static async getPreview(form) {
    return await axios.post(API.Validate.getPreview, form)
  }
}
export default ValidateService;