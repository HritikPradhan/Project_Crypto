const axios = require("axios");
const Model = require('../Model/Model')

const crypto = async function(req,res){

  try{
    let options = {
    method:"get",
    url:` http://api.coincap.io/v2/assets `
    };
  let coin = await axios(options)
  let coins = coin.data
  let coins2 = coins.data.sort(function (a, b) { return b.changePercent24Hr - a.changePercent24Hr })
  // let data = await Model.create(coins2)
  for (i = 0; i < coins2.length; i++) {
    let currency = {
      symbol: coins2[i].symbol,
      name: coins2[i].name,
      marketCapUsd: coins2[i].marketCapUsd,
      priceUsd: coins2[i].priceUsd
    };

    await Model.findOneAndUpdate({ symbol: coins2[i].symbol }, currency, { upsert: true, new: true } );
  }
  res.status(200).send({msg:"The data is here","crypto":coins2});
  }catch(err){
  console.log(err.message);
  res.status(500).send({msg:"There is some error"})
  }

}

module.exports.crypto = crypto;













// // 3rd problem
// const cities = async function (req,res){
// try{
//   let city = ["Bengaluru","Mumbai","Delhi","Kolkata","Chennai","London","Moscow"]
//   let arr =[];
// for(let i=0;i<city.length;i++){
// let options = {
//   method:"get",
//   url:` http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=ffc803e155dca2e8efa4ea6cc04891e1`
// };
// let Temp = await axios(options)
// arr.push({"city":city[i],"temp":Temp.data.main.temp})

// }
// let world = arr.sort(function(a,b){return parseFloat(a.temp)-parseFloat(b.temp)})
// res.status(200).send({msg:"The data is here","temp":world});
// }catch(err){
// console.log(err.message);
// res.status(500).send({msg:"There is some error"})
// }
// }

// module.exports.cities = cities;