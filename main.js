console.log("test");

//post name
let textBox = document.querySelector(".name");
let paragraphName = document.querySelector(".paragraph-name");

function displayName(name) {
  let t = document.createTextNode(name);
  paragraphName.appendChild(t);
}

document.querySelector(".send-name").onclick = function () {
  axios.post("/api/name", { name: textBox.value }).then(function (res) {
    displayName(res.data.name);
  });
};