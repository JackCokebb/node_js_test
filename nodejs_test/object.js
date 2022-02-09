const arr = ["jee", "jun", "hyun"];
//console.log(arr[1]);
let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

const obj = {
  name: "jee",
  roles: "student",
};

//console.log(obj.name);
for (let element in obj) {
  console.log(element + ": " + obj[element]);
}
