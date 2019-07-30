import axios from "../../http"
import Ip from "../ip"

//查找全部标签
export function allTag() {
  return axios.get(Ip.Ip + '/api/v1.0/article/getAllTag')
};

 //按照标签查找文章
 export function findByTag(value){
  return axios.get(Ip.Ip + '/api/v1.0/article/getArticleByTag?tag=' + value)
 }
