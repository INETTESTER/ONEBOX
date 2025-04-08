import http from 'k6/http';
import { check } from 'k6';

export function search_update() {
  const url = 'https://box-newcluster.one.th/search-service/api/v1/search/files/update';
  const payload = JSON.stringify({
    data_type: 'folder',
    data_id: '4cbad6331d50b86c8afe469f7e272f45',
    include_children: false,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  // ตรวจสอบว่า status code เป็น 200
 

  // แสดงผลลัพธ์ที่ได้จาก API
  //console.log('Response body:', res.body);
  return res
}
