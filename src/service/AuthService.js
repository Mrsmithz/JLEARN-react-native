import axios from 'axios';
import API from './API'
import { useSelector } from "react-redux";
import useSWR from 'swr'
axios.defaults.withCredentials = true

class AuthService {
  static async getAccessToken(idToken) {
    return await axios.get(API.Auth.getAccessToken + idToken)
  }
}
export default AuthService;