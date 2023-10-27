import { myAxios } from "../utils/myAxios";

export default function getAmount(startTime, endTime) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://cn-sc-plc-1.openfrp.top:41303/product/dateRecordsList`,
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
