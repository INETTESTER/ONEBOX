import http from 'k6/http';
import { check } from 'k6';



const fileData = http.file(open('../file/empty file.pdf'), 'empty file.pdf');
export function upload_file() {
  const url = 'https://box-newcluster.one.th/onebox_uploads/api/v3/save/file';

  const formData = {
    one_id: '803610009088',
    folder_path: 'loadtest',
    file:fileData,
    optional_filename: '',
  };

  const headers = {
    Authorization: 'Bearer fb8d3ea4f2b3d4b471a8df4b434a2446c93579d07c5f8ffc0bdc348bc8ba484b8e77f597a9df22586300aa6e35254fa461bf277d1ddd860401b9f4780c9ed861',
  };

  const res = http.post(url, formData, { headers });


  //console.log('Response status:', res.status);
  //console.log('Response body:', res.body);
  return res
}
