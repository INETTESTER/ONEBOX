//=============================== import API =================================
import { sleep } from 'k6';
import { error_check } from '../check/check.js';
import { scenario } from 'k6/execution';
import { upload_3_step } from '../api/upload_3_step.js';
import { etax } from '../api/etax.js';
import { storage } from '../api/storage.js';
import { download_file } from '../api/download_file.js';
import { download_file_s3 } from '../api/download_file_s3.js';
import { trash } from '../api/trash.js';
import { metadata } from '../api/metadata.js';
import { search_update } from '../api/search_update.js';
import { search } from '../api/search.js';
import { upload_file } from '../api/upload_file.js';
import { upload_folder } from '../api/upload_folder.js';


//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  response = upload_3_step();
  //response = etax(cid)
  //response = storage()
  //response = download_file()
  //response = download_file_s3()
  //response = trash(scenario)
  //response = metadata()
  //response = search_update()
  //response = search()
  //response = upload_file()
  //response = upload_folder()


  error_check(response);
  sleep(1)
}











































































const cid = __ENV.cid || "1";
const id = __ENV.id || "1";
const projectname = __ENV.projectname || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
let response;
const scenariox = __ENV.scenariox || "1";
let options;
const vusx = Math.ceil(user / durationx);
if (scenariox == 1) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
        gracefulStop: '120s',
      },
    },
  };
}
else if (scenariox == 2) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    vus: user,
    duration: durationx + 's',
    gracefulStop: '120s',
  };
}
else if (scenariox == 3) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    scenarios: {
      example_scenario: {
        executor: 'constant-arrival-rate',
        // rate: user,
        // timeUnit: durationx+'s',
        rate: vusx,
        timeUnit: '1s',
        preAllocatedVUs: user,
        duration: durationx + 's', // ระบุระยะเวลาที่ต้องการให้ทดสอบ
        gracefulStop: '120s',
      },
    },
  };
}
else {
  options = {
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
      },
    },
  };
}
export { options };