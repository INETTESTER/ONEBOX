import http from 'k6/http';
import { SharedArray } from 'k6/data';
const data = new SharedArray('file_ids', function () {
    return JSON.parse(open('../file/response_data.json')).file_ids;
});

export function trash(scenario) {
  const file_ids = data[scenario.iterationInTest];
  const url = 'https://box-newcluster.one.th/downloads/api/remove_file_folder_to_trash';
  const payload = JSON.stringify({
    account_id: '73a5f849c7d67e5c5edc058a54d98381',
    user_id: '83bbdd17e87a09ca6b425fa19057973f',
    data_id: ''+file_ids,
    data_type: 'file',
    status_data: 'T',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);
  console.log(response.body);
  return response
}
