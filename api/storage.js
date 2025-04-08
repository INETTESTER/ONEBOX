import http from 'k6/http';

export  function storage() {
  const url = 'https://box-newcluster.one.th/onebox_get_storage_prod/api/check_used_storage'; // URL ของ API
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const payload = JSON.stringify({
    account_id: '98e4ab45dce64e3eb82a958b8e10dd9d',
    convert_storage: 'True',
  });

  const response = http.post(url, payload, params);
  //console.log(response.body);
  return response
}
