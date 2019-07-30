import axios from '../../http'
import IP from '../ip';

export function login(paramsData){
  return axios.post(IP.Ip + '/api/v1.0/auth/login',paramsData)
}
