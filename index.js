const express = require("express");
const path = require("path"); // Utilizando biblioteca "path" do express para acessar index.js e style.css

const app = express(); // Variável que está recebendo o express

app.set("view engine", "ejs"); // Fala para o servidor que a view engine (motor que vai renderizar) é o ejs.

app.use(express.static(path.join(__dirname, "public"))) // Arquivos estáticos (index.js e style.css). 

const pokedex = [ //Criando os objetos da pokedex
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
    nome: "CharmanderBulbasaur",
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
];


//Rotas
app.get("/", (req, res) => {
  //Acessando a rota "/"
  res.render("index", {pokedex}); // Já temos a renderização configurada e estamos enviando a nossa const "pokedex" como JSON.
});

app.listen(
  3000,
  () =>
    // porta em que o servidor está rodando
    console.log("Servidor rodando em http://localhost:3000") // Mostrando o endereço HTTP no terminal
);
