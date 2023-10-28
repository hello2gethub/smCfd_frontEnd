import { myAxios } from "../utils/myAxios";

export default function Approve(status, darctId) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://1a25859b556cec235d60b5faf98d8849.pty.oscollege.net/approval/commitByDraftId/${darctId}/${status}`,
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
