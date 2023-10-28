import { myAxios } from "../utils/myAxios";

export default function getAmount(startTime, endTime) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://302ec0ad36118c7e82d2edef580f9632.pty.oscollege.net/product/dateRecordsList`,
      data: {
        startTime: startTime,
        endTime: endTime,
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
