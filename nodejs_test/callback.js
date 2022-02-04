// function a() {
//   console.log("A");
// }

//anonymous func
// func can be value in JS
var a = function () {
  console.log("A");
};

//a();

//func in var a will be called as a callback func
//after 'slow' func's task is done
function slow(callback) {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  callback();
}

slow(a);
