import { myAxios } from "../utils/myAxios";

export default function changeShopStatus(status, ids) {
  console.log("status", status);
  console.log("ids", ids);
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://cn-fz-plc-1.openfrp.top:55068/product/editStatus/${status}`,
      data: ids,
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
