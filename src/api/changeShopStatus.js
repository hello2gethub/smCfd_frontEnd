import { myAxios } from "../utils/myAxios";

export default function changeShopStatus(status, ids) {
  console.log("status", status);
  console.log("ids", ids);
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: `http://302ec0ad36118c7e82d2edef580f9632.pty.oscollege.net/product/editStatus/${status}`,
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
