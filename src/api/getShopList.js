import { myAxios } from "../utils/myAxios";

export default function getShopList(currentPage, pageSize) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: "/json/shopList.json",
      data: {
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
