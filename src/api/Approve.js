import { myAxios } from "../utils/myAxios";

export default function Approve(status, darctId) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://cn-sc-plc-2.openfrp.top:57880/approval/commitByDraftId/${darctId}/${status}`,
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        }
      })
      .catch((err) => {
        reject({ msg: err });
      });
  });
}
