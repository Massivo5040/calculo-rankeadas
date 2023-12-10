const img_hero = document.querySelector("#img_hero");
const name_hero = document.querySelector("#name_hero");
const role_hero = document.querySelector("#class_hero");
const exp_hero = document.querySelector("#exp_hero");
const heroes = document.querySelector("#heroes");
const reader = new FileReader();

document.addEventListener("onload", verify_localStorage());

function verify_localStorage() {
  if (localStorage.length == 0) {
    console.log("local storage vazio");
    return;
  }
  localStorage.removeItem(numProcesso);

  for (let item in localStorage) {
    if (localStorage.hasOwnProperty(item)) {
      heroes.innerHTML += localStorage[item];
    }
  }
}

async function load_img() {
  reader.readAsDataURL(img_hero.files[0]);

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      console.log("Deu certo!");
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

async function add_hero() {
  if (
    img_hero.value == "" ||
    name_hero.value == "" ||
    class_hero.value == "" ||
    exp_hero.value == ""
  ) {
    alert("Preencha todos os campos");
    return;
  }

  let img = await load_img();
  let name = name_hero.value;
  let role = role_hero.value;
  let exp = exp_hero.value;

  const tags = {
    tag1: { name: "img", value: img },
    tag2: { name: "h3", value: name },
    tag3: { name: "h4", value: role },
    tag4: { name: "p", value: exp },
  };
  tags.xp = xp_bar(tags.tag4.value);

  create_element(tags);
  let count = 0;
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
  const xp_inf = xp_bar(tags.tag4.value);
  elemento4.textContent = xp_inf[0];
  elemento4.style.backgroundImage = `linear-gradient(${xp_inf[1]})`;
  div.appendChild(elemento4);

  let figure = document.createElement("figure");
  container.appendChild(figure);
  let tag_img = document.createElement("img");
  figure.appendChild(tag_img);
  tag_img.src = xp_inf[2][0];
  let elo = document.createElement("figcaption");
  figure.appendChild(elo);
  elo.textContent = xp_inf[2][1];

  heroes.appendChild(container);
}

function xp_bar(xp) {
  if (xp <= 1000) {
    // Ferro
    let nxp = (xp - 1) / (1000 - 1);
    let percent = Math.floor(nxp * 100);
    let gradient = `to right,
    greenyellow 0%,
    greenyellow ${percent}%,
    gray ${percent}%,
    gray 100%`;

    let imagem = ["./img/ferro.png", "Ferro"];
    xp = `${xp}/1000`;
    return [xp, gradient, imagem];
  } else if (xp <= 2000) {
    // Bronze
    let nxp = (xp - 1001) / (2000 - 1001);
    let percent = Math.floor(nxp * 100);
    let gradient = `to right,
    greenyellow 0%,
    greenyellow ${percent}%,
    gray ${percent}%,
    gray 100%`;

    let imagem = ["./img/bronze.png", "Bronze"];
    xp = `${xp}/2000`;
    return [xp, gradient, imagem];
  } else if (xp <= 5000) {
    // Prata
    let nxp = (xp - 2001) / (5000 - 2001);
    let percent = Math.floor(nxp * 100);
    console.log(percent);
    let gradient = `to right,
    greenyellow 0%,
    greenyellow ${percent}%,
    gray ${percent}%,
    gray 100%`;

    let imagem = ["./img/prata.png", "Prata"];
    xp = `${xp}/5000`;
    return [xp, gradient, imagem];
  } else if (xp <= 7000) {
    // Ouro
    let nxp = (xp - 5001) / (7000 - 5001);
    let percent = Math.floor(nxp * 100);
    let gradient = `to right,
    greenyellow 0%,
    greenyellow ${percent}%,
    gray ${percent}%,
    gray 100%`;

    let imagem = ["./img/ouro.png", "Ouro"];
    xp = `${xp}/7000`;
    return [xp, gradient, imagem];
  } else if (xp <= 8000) {
    // Platina
    let nxp = (xp - 7001) / (8000 - 7001);
    let percent = Math.floor(nxp * 100);
    console.log(`my percent: ${percent}, bing percent: ${percent1}`);
    let gradient = `to right,
    greenyellow 0%,
    greenyellow ${percent}%,
    gray ${percent}%,
    gray 100%`;

    let imagem = ["./img/platina.png", "Platina"];
    xp = `${xp}/8000`;
    return [xp, gradient, imagem];
  } else if (xp <= 9000) {
    // Ascendente
    let nxp = (xp - 8001) / (9000 - 8001);
    let percent = Math.floor(nxp * 100);
    let gradient = `to right,
    greenyellow 0%,
    greenyellow ${percent}%,
    gray ${percent}%,
    gray 100%`;

    let imagem = ["./img/ascendente.png", "Ascendente"];
    xp = `${xp}/9000`;
    return [xp, gradient, imagem];
  } else if (xp <= 10000) {
    // Imortal
    let nxp = (xp - 9001) / (10000 - 9001);
    let percent = Math.floor(nxp * 100);
    let gradient = `to right,
    greenyellow 0%,
    greenyellow ${percent}%,
    gray ${percent}%,
    gray 100%`;

    let imagem = ["./img/imortal.png", "Imortal"];
    xp = `${xp}/10000`;
    return [xp, gradient, imagem];
  } else if (xp >= 10001) {
    // Radiante
    let gradient = `to right,
    greenyellow 0%,
    greenyellow 100%,
    gray 100%,
    gray 100%`;

    let imagem = ["./img/radiante.png", "Radiante"];
    xp = `${xp}`;
    return [xp, gradient, imagem];
  }
}

function empty_list() {
  localStorage.clear();
}
