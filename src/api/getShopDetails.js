import { myAxios } from "../utils/myAxios";

export default function getShopDetails(shopId) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: `http://302ec0ad36118c7e82d2edef580f9632.pty.oscollege.net/product/productDetails/${shopId}`,
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
