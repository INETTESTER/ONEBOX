import http from 'k6/http';
import { check } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

const fileData = http.file(open('../file/empty file.pdf'), 'empty file.pdf');

export function upload_3_step() {
    //step 1
    const url_step1 = 'https://box-newcluster.one.th/uploads/api/v1/checking_file_data/upload';
    const payload_step1 = JSON.stringify({
        user_id: "83bbdd17e87a09ca6b425fa19057973f",
        account_id: "98e4ab45dce64e3eb82a958b8e10dd9d",
        folder_id: "4cbad6331d50b86c8afe469f7e272f45",
        file_duplicate: "create_copy",
        filename: "empty file.pdf",
        remark: "",
        size_file: 8615,
        department_id: "",
        hashtag: []
    });

    const params_step1 = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res_step1 = http.post(url_step1, payload_step1, params_step1);
    if (!res_step1 || res_step1.error_code || (res_step1.status !== 200 && res_step1.status !== 201)) {
        console.log("Step 1 Fail");
        return res_step1
    }
    check(res_step1, {
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '204 No Content': (r) => r.status === 204,
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '429 Too Many Requests': (r) => r.status === 429,
        '500 Internal Server Error': (r) => r.status === 500,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
    });
    // แปลงผลลัพธ์ JSON body ให้เป็น Object
    const responseJson = JSON.parse(res_step1.body);

    // ดึงข้อมูลที่ต้องการ
    const data = responseJson.data;
    const account_id = data.account_id;
    const archive_file = data.archive_file;
    const business_id = data.business_id;
    const data_type = data.data_type;
    const department_id = data.department_id;
    const file_duplicate = data.file_duplicate;
    const file_id = data.file_id;
    const file_id_copied = data.file_id_copied;
    const filename = data.filename;
    const folder_from_share = data.folder_from_share;
    const folder_id = data.folder_id;
    const presigned_url = data.presigned_url;
    const AWSAccessKeyId = presigned_url.fields.AWSAccessKeyId;
    const key = presigned_url.fields.key;
    const policy = presigned_url.fields.policy;
    const signature = presigned_url.fields.signature;
    const user_id = data.user_id;

    // console.log(`AWSAccessKeyId: ${AWSAccessKeyId}`);
    // console.log(`Key: ${key}`);
    // console.log(`Policy: ${policy}`);
    // console.log(`Signature: ${signature}`);
    //step 2
    const url_step2 = 'https://inet-s3-object-gw.inet.co.th/one-box-loadtest';

    const formData_step2 = new FormData();
    formData_step2.append('AWSAccessKeyId', '' + AWSAccessKeyId);
    formData_step2.append('key', '' + key);
    formData_step2.append('policy', '' + policy);
    formData_step2.append('signature', '' + signature);
    formData_step2.append('file', fileData);

    const res_step2 = http.post(url_step2, formData_step2.body(), {
        headers: { 'Content-Type': 'multipart/form-data; boundary=' + formData_step2.boundary },
    });
    if (!res_step2 || res_step2.error_code || (res_step2.status !== 200 && res_step2.status !== 201 && res_step2.status !== 204)) {
        console.log("Step 2 Fail");
            console.log(`AWSAccessKeyId: ${AWSAccessKeyId}`);
    console.log(`Key: ${key}`);
    console.log(`Policy: ${policy}`);
    console.log(`Signature: ${signature}`);
        return res_step2
    }
    check(res_step2, {
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '204 No Content': (r) => r.status === 204,
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '429 Too Many Requests': (r) => r.status === 429,
        '500 Internal Server Error': (r) => r.status === 500,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
    });

    //step 3
    const url_step3 = 'https://box-newcluster.one.th/uploads/api/v1/insert_file_data';

    const payload_step3 = JSON.stringify({
        account_id: '' + account_id,
        archive_file: '' + archive_file,
        business_id: '' + business_id,
        data_type: '' + data_type,
        department_id: '' + department_id,
        file_duplicate: '' + file_duplicate,
        file_id: '' + file_id,
        file_id_copied: '' + file_id_copied,
        filename: '' + filename,
        folder_from_share: '' + folder_from_share,
        folder_id: '' + folder_id,
        hashtag: [],
        remark: '',
        size_file: 8615.0,
        uploadChunk: {},
        user_id: '' + user_id,
    });

    const params_step3 = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response_step3 = http.post(url_step3, payload_step3, params_step3);
    if (!response_step3 || response_step3.error_code || (response_step3.status !== 200 && response_step3.status !== 201)) {
        console.log("Step 3 Fail");
        return response_step3
    }
    return response_step3
}
