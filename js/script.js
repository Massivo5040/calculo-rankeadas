const img_hero = document.querySelector("#img_hero");
const name_hero = document.querySelector("#name_hero");
const role_hero = document.querySelector("#class_hero");
const wins_hero = document.querySelector("#wins_hero");
const loses_hero = document.querySelector("#loses_hero");
const heroes = document.querySelector("#heroes");
const reader = new FileReader();

let count = 0;
document.addEventListener("onload", verify_localStorage());

function verify_localStorage() {
  if (localStorage.length == 0) {
    console.log("local storage vazio");
    return;
  }
  localStorage.removeItem("numProcesso");

  for (let item in localStorage) {
    if (localStorage.hasOwnProperty("count")) {
      count = localStorage.getItem("count");
      break;
    } else {
      localStorage.setItem("count", count);
    }
    if (localStorage.hasOwnProperty(item)) {
      heroes.innerHTML += localStorage[item];
    }
  }
}

async function load_img() {
  reader.readAsDataURL(img_hero.files[0]);

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

async function add_hero() {
  if (
    img_hero.value == "" ||
    name_hero.value == "" ||
    role_hero.value == "" ||
    wins_hero.value == "" ||
    loses_hero.value == ""
  ) {
    alert("Preencha todos os campos");
    return;
  }

  let img = await load_img();
  let name = name_hero.value;
  let role = role_hero.value;
  let wins = wins_hero.value;
  let loses = loses_hero.value;
  let balance = wins - loses;

  const tags = {
    tag1: { name: "img", value: img },
    tag2: { name: "h3", value: name },
    tag3: { name: "h4", value: role },
    tag4: { name: "p", value: balance },
  };

  create_element(tags);

  localStorage.setItem(
    `hero${count}`,
    document.querySelectorAll(".hero")[count].outerHTML
  );
  count++;
}

function create_element(tags) {
  let container = document.createElement("article");
  container.classList.add("hero");

  let elemento1 = document.createElement(tags.tag1.name);
  elemento1.src = tags.tag1.value;
  container.appendChild(elemento1);

  let div = document.createElement("div");
  container.appendChild(div);

  let elemento2 = document.createElement(tags.tag2.name);
  elemento2.textContent = tags.tag2.value;
  div.appendChild(elemento2);

  let elemento3 = document.createElement(tags.tag3.name);
  elemento3.textContent = tags.tag3.value;
  div.appendChild(elemento3);

  let elemento4 = document.createElement(tags.tag4.name);
  elemento4.textContent = `Seu saldo de herói (vitórias - derrotas) é: ${tags.tag4.value}`;
  let balance_inf = balance_calc(tags.tag4.value);
  div.appendChild(elemento4);

  let figure = document.createElement("figure");
  container.appendChild(figure);
  let tag_img = document.createElement("img");
  figure.appendChild(tag_img);
  tag_img.src = balance_inf[1][0];
  let elo = document.createElement("figcaption");
  figure.appendChild(elo);
  elo.textContent = balance_inf[1][1];

  heroes.appendChild(container);
}

function balance_calc(balance) {
  if (balance <= 10) {
    // Ferro
    let imagem = ["./img/ferro.png", "Ferro"];
    return [balance, imagem];
  } else if (balance <= 20) {
    // Bronze
    let imagem = ["./img/bronze.png", "bronze"];
    return [balance, imagem];
  } else if (balance <= 50) {
    // Prata
    let imagem = ["./img/prata.png", "prata"];
    return [balance, imagem];
  } else if (balance <= 80) {
    // Ouro
    let imagem = ["./img/ouro.png", "ouro"];
    return [balance, imagem];
  } else if (balance <= 90) {
    // Diamante
    let imagem = ["./img/diamante.png", "diamante"];
    return [balance, imagem];
  } else if (balance <= 100) {
    // Lendário
    let imagem = ["./img/lendario.png", "lendario"];
    return [balance, imagem];
  } else if (balance >= 101) {
    // Imortal
    let imagem = ["./img/imortal.png", "imortal"];
    return [balance, imagem];
  }
}

function empty_list() {
  localStorage.clear();
}
