import http from 'k6/http';
import { check } from 'k6';

export function metadata() {
  const url = 'https://box-newcluster.one.th/downloads/api/select_files_and_folder';

  const payload = JSON.stringify({
    user_id: '83bbdd17e87a09ca6b425fa19057973f',
    account_id: '98e4ab45dce64e3eb82a958b8e10dd9d',
    folder_id: '4cbad6331d50b86c8afe469f7e272f45',
    status_file: '',
    status_folder: '',
    limit: 30,
    offset: 0,
    sort_by: 'cre_dtm',
    direction: 'DESC',
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
