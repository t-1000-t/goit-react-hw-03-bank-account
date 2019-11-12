const saveStorage = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.log(err);
  }
};
const getStorage = key => {
  try {
    const trans = localStorage.getItem(key);
    return trans ? JSON.parse(trans) : '';
  } catch (err) {
    console.log(err);
  }
};

export default { saveStorage, getStorage };
