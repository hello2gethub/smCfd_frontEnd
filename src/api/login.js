import { myAxios } from "../utils/myAxios";

export default function Login(username, password) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "GET",
      url: "/json/loginAdmin.json",
      data: {
        username: username,
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
