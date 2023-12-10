const img = document.querySelector("#img");
const tag_img = document.querySelector("img");
const reader = new FileReader();

console.log(reader);

reader.onload = (e) => {
  tag_img.src = reader.result;
};

function add_hero() {
  reader.readAsDataURL(img.files[0]);
}
