import http from 'k6/http';
import { check } from 'k6';
const fileData = http.file(open('../file/empty file.pdf'), 'empty file.pdf');

export function etax(cid) {
    //setp1
    const url = 'https://box-newcluster.one.th/onebox_uploads/api/v2/credential/savefile_for_inbox';

    const params = {
        headers: {
            Authorization: 'Bearer fb8d3ea4f2b3d4b471a8df4b434a2446c93579d07c5f8ffc0bdc348bc8ba484b8e77f597a9df22586300aa6e35254fa461bf277d1ddd860401b9f4780c9ed861',
        },
    };

    const payload = {
        saver_id: 'db90eca3239b9a90746911ce8ea91f44',
        saver_type: '2',
        folder_name: 'etax',
        file: fileData,
    };

    const response = http.post(url, payload, params);
    if (!response || response.error_code || (response.status !== 200 && response.status !== 201)) {
        console.log("Step 1 Fail");
        return response
    }
    check(response, {
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
    // ดึง id จาก response
    const jsonResponse = response.json();
    const fileId = jsonResponse.data.id;

    //step 2
    const document_no = `${__VU}${__ITER}${cid}`;
    const url_step2 = 'https://box-newcluster.one.th/onebox_uploads/api/send_file_inbox'; // URL ของ API
    const params_step2 = {
        headers: {
            'Authorization': 'Bearer fb8d3ea4f2b3d4b471a8df4b434a2446c93579d07c5f8ffc0bdc348bc8ba484b8e77f597a9df22586300aa6e35254fa461bf277d1ddd860401b9f4780c9ed861',
            'Content-Type': 'application/json',
        },
    };

    const payload_step2 = JSON.stringify({
        sender_id: 'db90eca3239b9a90746911ce8ea91f44',
        sender_type: '2',
        file_id: '' + fileId,
        receiver_id: 'd191728110e65c1783347270e404da3d',
        receiver_type: '2',
        header_info: {
            SalerName: '',
            buyerTaxid: '6150328111820',
            document_no: ''+document_no,
            sellerTaxid: '2757420532036',
            SourceSystem: '',
            Document_Date: '',
            buyerBranchid: '00000',
            document_date: '',
            document_type: 'ใบรับ',
            sellerBranchid: '00000',
            Document_Number: '',
            DocumentTypeCode: '',
        },
    });

    const response_step2 = http.post(url_step2, payload_step2, params_step2);
    return response_step2
}
