const anonFunc = function () {
  console.log("i am anonymous function!");
};

console.log(anonFunc);
anonFunc();

const arr = [anonFunc, "foo", "bar"];
arr[0]();

const obj = {
  func: anonFunc,
};

obj.func();
