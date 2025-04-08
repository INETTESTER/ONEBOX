import http from 'k6/http';
import { check } from 'k6';

export function upload_folder() {
  const url = 'https://box-newcluster.one.th/uploads/api/v2/insert_folder';

  const payload = JSON.stringify({
    folder_name: 'test',
    user_id: '83bbdd17e87a09ca6b425fa19057973f',
    id: '4cbad6331d50b86c8afe469f7e272f45',
    account_id: '98e4ab45dce64e3eb82a958b8e10dd9d',
    department_id: '',
    hashtag: [],
    folder_duplicate: 'create_copy',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  

  //console.log('Response status:', res.status);
  //console.log('Response body:', res.body);
  return res
}
