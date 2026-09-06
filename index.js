const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para jogadores (simulada ou via API)
app.get('/api/players', (req, res) => {
  // Simulação - você pode conectar com RCON depois
  res.json({
    count: 7,
    players: ['F4RINHA777', 'Jogador2', 'Jogador3', 'Jogador4', 'Jogador5', 'Jogador6', 'Jogador7']
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Miragem Site rodando em http://localhost:${PORT}`);
});