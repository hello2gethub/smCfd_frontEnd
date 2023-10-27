import { myAxios } from "../utils/myAxios";

export default function getWays(startTime, endTime) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://cn-sc-plc-1.openfrp.top:41303/product/priceTypeRecords`,
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
