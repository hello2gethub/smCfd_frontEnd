import { myAxios } from "../utils/myAxios";

export default function submitApproval(darctId) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: "http://eac444cdfaa15ba19e6cfbcad464d876.pty.oscollege.net/draft/commitDraft",
      data: {
        id: darctId,
      },
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
