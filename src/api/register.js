import { myAxios } from "../utils/myAxios";

export default function Register(obj) {
  console.log(obj);
  return new Promise((resolve, reject) => {
    myAxios({
      method: "POST",
      url: "http://cn-bj-plc-2.openfrp.top:59354/user/register",
      data: {
        nickName: obj.nickname,
        userName: obj.username,
        password1: obj.password,
        password2: obj.password2,
        phonenumber: obj.telephone,
        sex: obj.sex,
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
