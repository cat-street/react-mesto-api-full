module.exports.validator = (v) => /^http(s){0,1}:\/\/[www.]{0,1}([\w-]+\.)+[A-Za-z]+[\S]*/.test(v);
