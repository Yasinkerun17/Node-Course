const fs = require("fs");
const superagent = require("superagent");
// const { resolve } = require("superagent/lib/request-base");

function readFilePro(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
}

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("could not write file");
      resolve("succeeded");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);

    console.log("link is: ", imgs);
    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog Image saved to file");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: Ready";
};

(async () => {
  console.log("1: before Ready");
  const x = await getDogPic();
  console.log(x);
  console.log("3: after ready");
})();

/*
getDogPic().then(x => {
  console.log(x)  
}).catch(err => {
  console.log('ERROR')
})
*/

/*readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log("link is: ", res.body.message);

    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Image is saved");
  })
  .catch((err) => {
    console.log(err);
  });
  */
