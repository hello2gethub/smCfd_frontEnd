import { myAxios } from "../utils/myAxios";

export default function getAdminDractList(currentPage, pageSize) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: `http://eac444cdfaa15ba19e6cfbcad464d876.pty.oscollege.net/draft/unApprovalDraftList/${currentPage}/${pageSize}`,
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
