import { myAxios } from "../utils/myAxios";

export default function Approve(status, darctId) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://cn-hk-bgp-4.openfrp.top:12168/approval/commitByDraftId/${darctId}/${status}`,
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
