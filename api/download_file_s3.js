import http from 'k6/http';

export  function download_file_s3() {
  const url = 'https://box-newcluster.one.th/downloads/api/v1/download_file_s3?user_id=83bbdd17e87a09ca6b425fa19057973f&file_id=7d2f5c5e4f85686c4699da2963ae8c4e&account_id=73a5f849c7d67e5c5edc058a54d98381';


  const response = http.get(url);
  //console.log(response.body);
  return response
}
