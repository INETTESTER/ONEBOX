import http from 'k6/http';
import { check } from 'k6';


export function search() {
  const url = 'https://box-newcluster.one.th/search-service/api/v1/search/advance';
  const payload = JSON.stringify({
    "search": "",
    "search_type": ["name"],
    "data_type": ["file", "folder"],
    "account_id": "507c7c27c40beb90fcc4338b1aa3ef07",
    "folder_id": "4cbad6331d50b86c8afe469f7e272f45",
    "upload_date_from": "00000000000000",
    "upload_date_to": "20251231235959",
    "cctv_status": false,
    "hits_per_page": 30,
    "page": 1
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(url, payload, { headers });

  // log response body to console
  //console.log(res.body);
  return res
}
