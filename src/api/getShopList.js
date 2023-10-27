import { myAxios } from "../utils/myAxios";

export default function getShopList(obj) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: "http://cn-sc-plc-1.openfrp.top:41303/product/proList",
      data: {
        caretaker: obj.custodian,
        currentPage: obj.currentPage,
        endTime: obj.endTime,
        id: obj.shopId,
        name: obj.shopName,
        pageSize: obj.pageSize,
        proxyId: obj.agent,
        startTime: obj.starTime,
        status: obj.category,
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
