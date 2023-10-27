import { myAxios } from "../utils/myAxios";

export default function getAdminDractList(currentPage, pageSize) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: `http://cn-sc-plc-2.openfrp.top:57880/draft/unApprovalDraftList/${currentPage}/${pageSize}`,
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
