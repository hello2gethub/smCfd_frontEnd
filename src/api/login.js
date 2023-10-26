import { myAxios } from "../utils/myAxios";

export default function Login(username, password) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: "http://cn-fz-plc-1.openfrp.top:59834/user/login",
      data: {
        userName: username,
        password: password,
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
