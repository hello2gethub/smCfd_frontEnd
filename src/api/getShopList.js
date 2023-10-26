import { myAxios } from "../utils/myAxios";

export default function getShopList(category, currentPage, pageSize) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: "/json/shopList.json",
      data: {
        category: category,
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
