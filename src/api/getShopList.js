import { myAxios } from "../utils/myAxios";

export default function getShopList(category, currentPage, pageSize) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: "http://cn-fz-plc-1.openfrp.top:55068/product/proList",
      data: {
        status: category,
        currentPage: currentPage,
        pageSize: pageSize,
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
