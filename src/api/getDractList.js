import { myAxios } from "../utils/myAxios";

export default function getDractList(currentPage, pageSize) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: `http://cn-bj-plc-2.openfrp.top:59354/draft/draftList/${currentPage}/${pageSize}`,
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
