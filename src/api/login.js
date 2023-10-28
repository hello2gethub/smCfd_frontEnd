import { myAxios } from "../utils/myAxios";

export default function Login(username, password) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: "http://6d67b4ee0a25b4ccf547633a35fb4023.pty.oscollege.net/user/login",
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
