import axios from '../../http'
import IP from './ip';

export function detail(article_id) {
  return axios.get(IP.Ip + '/api/v1.0/article/getOneArticle/' + article_id)
}
