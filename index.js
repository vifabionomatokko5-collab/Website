const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// URL da API
const API_URL = process.env.API_URL || 'https://minecraft-payment-api.onrender.com';

// Rota principal
app.get('/', async (req, res) => {
  try {
    // Buscar status do servidor na API
    const response = await axios.get(`${API_URL}/api/server/status`);
    const data = response.data;
    
    res.render('index', {
      server: data,
      apiUrl: API_URL
    });
  } catch (error) {
    console.error('❌ Erro ao buscar status do servidor:', error);
    res.render('index', {
      server: {
        online: false,
        count: 0,
        max: 100,
        players: [],
        error: 'Não foi possível conectar ao servidor'
      },
      apiUrl: API_URL
    });
  }
});

// Rota para atualizar jogadores via AJAX
app.get('/api/players', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/api/server/players`);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro ao buscar jogadores:', error);
    res.json({ count: 0, players: [] });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Miragem Site rodando em http://localhost:${PORT}`);
  console.log(`📡 API URL: ${API_URL}`);
});
