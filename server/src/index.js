import express from 'express';
import { downloadImagem, inserindoImagem } from './controllers/ImagemController.js';
import fileupload from 'express-fileupload'
import { atualizarUsuario, criarUsuario, deletarUsuario, logarUsuario, mostrarUmUsuario, mostrarUsuario } from './controllers/UsuarioController.js';

const app = express();
const porta = 5000;

app.use(fileupload());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Funcionando');
});

app.get('/public/:nome_imagem', downloadImagem);

//CRUD Imagens
app.post('/imagem, inserindoImagem');


//CRUD Usuario
app.post('/usuario/', criarUsuario);
app.get('/usuario/', mostrarUsuario);
app.get('/usuario/:id_usuario',mostrarUmUsuario);
app.put('/usuario/:id_usuario',atualizarUsuario);
app.delete('/usuario/:id_usuario',deletarUsuario);

//Rota para Logar
app.post('/logar/',logarUsuario);

app.listen(porta, () => {
    console.log(`API Rodando na porta ${porta}`);
});