require("dotenv").config
const express = require("express");
const req = require("express/lib/request");
const path = require("path"); // Utilizando biblioteca "path" do express para acessar index.js e style.css

const app = express(); // Variável que está recebendo o express

const port = process.env.PORT || 3000
// const port = process.env.PORT || 3000; // Config porta

app.set("view engine", "ejs"); // Fala para o servidor que a view engine (motor que vai renderizar) é o ejs.

app.use(express.static(path.join(__dirname, "public"))); // Arquivos estáticos (index.js e style.css).

app.use(express.urlencoded()); //Cliente envia info do input através de JSON. e URLENCODED recebe

const pokedex = [
  //Criando os objetos da pokedex
  {
    id: 1,
    nome: "Bulbasaur",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  },

  {
    id: 2,
    nome: "Bulbasaur",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  },

  {
    id: 3,
    nome: "Squirtle",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
  },
  {
    id: 4,
    nome: "Caterpie",
    descricao:
      "For protection, it releases a horrible stench from the antenna on its head to drive away enemies.",
    tipo: "Bug",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png",
  },
];

let pokemon = undefined;
//Rotas
//Read do CRUD
app.get("/", (req, res) => {
  //Acessando a rota "/"
  res.render("index", { pokedex, pokemon }); // Já temos a renderização configurada e estamos enviando a nossa const "pokedex" como JSON.
});

//Create do CRUD
app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  res.redirect("/#cards"); //Recarrega a página
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  res.redirect("/#cadastro");
});

//Update do CRUD
app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;

  delete pokedex[id];

  res.redirect("/#cards");
});

app.listen(
  port,
  () =>
    // porta em que o servidor está rodando
    console.log(`Servidor rodando em ${port}`) // Mostrando o endereço HTTP no terminal
);
