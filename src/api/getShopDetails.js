import { myAxios } from "../utils/myAxios";

export default function getShopDetails(shopId) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: `http://cn-sc-plc-1.openfrp.top:41303/product/productDetails/${shopId}`,
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
