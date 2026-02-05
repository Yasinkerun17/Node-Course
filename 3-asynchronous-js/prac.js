const fetchUserData = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.3) {
        resolve({ id: 1, name: "yasin", surname: data });
      } else reject("number is not greater than 0.3");
    }, 2000);
  });
};

const fetchingdata = async () => {
    try{
    const res = await fetchUserData("kerun");
    console.log(res)
    }
    catch(err){
        console.log(err)
    }
}

fetchingdata();