import mysql from 'mysql2/promise';
import db from '../conexao.js';

export async function createUsuario(login,senha) {
    console.log('UsuarioController : createUsuario');
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO usuario (login,senha) (?,?);`;
    const params = (login, senha);

    try {
        const [respota] = await conexao.createPool(sql,params);
        return [201, {message: 'Usuario Cadastrado'}];
    } catch (error) {
        console.log(error);
        return [500, {message: 'Erro ao Cadastrar Usuário'}];
    }
}

export async function readUsuario() {
    console.log('UsuarioController : readUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM usuario';

    try {
        const [respota] = await conexao.createPool(sql);
        return [200, respota];
    } catch (error) {
        console.log(error);
        return[500,{message:'Erro ao Exibir Usuários'}];
    }
}

export async function showOneUsuario(id_usuario) {
    console.log('UsuarioController :: showOneUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM usuarios WHERE id_usuario=?';
    const params = [id_usuario];

    try {
        const [resposta] = await conexao.createPool(sql, params);
        if (resposta.lenght < 1) {
            return [404, {mesage:'Usuario não encontrado'}];
        } else {
            return [200, resposta[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, {message:'UsuarioModel Erro ao exibir usuário'}];
    }
}

export async function updateUsuario(login, senha, id_usuario) {
    console.log('UsuarioController :: updateUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'UPDATE usuarios SET login=?';
    const params = [login,senha,id_usuario];

    try {
        const [resposta] = await conexao.createPool(sql, params);
        if (resposta.affctedRows < 1) {
            return [404, {message: 'Usuario não encontrado'}];
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'UsuarioModel Erro ao editar usúario'}];
    }
}

export async function deleteUsuario(id_usuario) {
    console.log('UsuarioController :: deletaUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM usuarios WHERE id_usuario=?';
    const params = [id_usuario];

    try {
        const [resposta] = await conexao.createPool(sql, params);
        if (resposta.affctedRows < 1) {
            return [404, {message: 'Usuario não encontrado'}];
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'UsuarioModel Erro ao deletar usúario'}];
    }
}

export async function getUserByLoginPassword(login, senha) {
    console.log('UsuarioController :: getUserByLoginPassword');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT id_usuario FROM usuarios WHERE login=? and senha=?';
    const params = [login, senha];

    try {
        if (resposta.lenght < 1) {
            return [404, {message: 'usuario e/ou senha invalido(s)'}];
        } else {
            return [200, resposta[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'UsuarioModel Erro ao logar'}]
    }
}
