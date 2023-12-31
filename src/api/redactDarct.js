import { myAxios } from "../utils/myAxios";

export default function redactDarct(obj) {
  return new Promise((resolve, reject) => {
    myAxios({
      method: "PUT",
      url: "http://eac444cdfaa15ba19e6cfbcad464d876.pty.oscollege.net/draft/editDraft",
      data: {
        caretaker: obj.userId,
        cashPrice: obj.price,
        category: obj.shopClass,
        description: obj.shopDescription,
        details: obj.shopDetails,
        exchangeLimit: obj.maxTimes,
        image:
          "https://ts1.cn.mm.bing.net/th/id/R-C.598b2776a34bb7e47a4bb00939022eab?rik=%2fpPpPhiey0M9NA&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f50017%2f7341.jpg_wh860.jpg&ehk=TiwsVW8QYgtgSuqMI%2fc260rdX9c72VCmaikkjnMxE1s%3d&risl=&pid=ImgRaw&r=0",
        integralPrice: obj.points,
        name: obj.shopName,
        priceType: obj.priceClass,
        stock: obj.shopStock,
        id: obj.darctId,
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
