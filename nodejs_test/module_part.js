const mod = {
  var: "val",
  func: function () {
    console.log(this.var);
  },
};

//export 'mod' as module
module.exports = mod;
