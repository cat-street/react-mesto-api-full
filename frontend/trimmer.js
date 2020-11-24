module.exports.trimmer = (obj) => {
  const arr = Object.entries(obj);
  return arr.reduce((red, val) => {
    // eslint-disable-next-line no-param-reassign
    red[val[0]] = val[1].trim();
    return red;
  }, {});
};
