import {
  createUsuario,
  readUsuario,
  showOneUsuario,
  updateUsuario,
  deleteUsuario,
  getUserByLoginPassword,
} from "../models/usuarioModel.js";

export async function criarUsuario(req, res) {
  console.log("UsuarioController :: criarUsuario");
  const { login, senha } = req.body;

  if (!login || !senha) {
    res.status(400).json({ message: "Login e senha devem ser criados" });
  } else {
    try {
      const [status, resposta] = await createUsuario(login, senha);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "UsuarioController :: criarUsuario" });
    }
  }
}

export async function mostrarUsuario(req, res) {
  console.log("UsuarioController :: mostrarUsuario");

  try {
    const [status, resposta] = await readUsuario();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "UsuarioController :: erro ao mostrarUsuario" });
  }
}

export async function mostrarUmUsuario(req, res) {
  console.log("UsuarioController :: mostrarUmUsuario");
  const { id_usuario } = req.params;

  if (!id_usuario) {
    res.status(400).json({ message: "Login e senha devem ser criados" });
  } else {
    try {
      const [status, resposta] = await showOneUsuario(id_usuario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "UsuarioController :: erro ao mostrarUmUsuario" });
    }
  }
}

export async function atualizarUsuario(req, res) {
    console.log('UsuarioController :: atualizarUsuario');
    const {login, senha} = req.body;
    const {id_usuario} = req.params;

    if (!login || !senha) {
        res.status(400).json({ message: 'login e senha devem ser criados' });
    } else {
        try {
            const [status, resposta] = await updateUsuario(login,senha,id_usuario);
            res.status(status).json(resposta);
        } catch (error) {
            console.log('UsuarioControler :: atualizarUsuario');
            res.status(500).json({ message: "UsuarioController :: erro ao atualizarUsuario" });
        }
    }
}

export async function deletarUsuario(req, res) {
    console.log('UsuarioController :: deletarUsuario');
    const {login, senha} = req.body;

    if (!id_usuario) {
        res.status(400).json({ message: 'id_usuario deve ser informados' });
    } else {
        try {
            const [status, resposta] = await deletarUsuario(id_usuario);
            res.status(status).json(resposta);
        } catch (error) {
            console.log('UsuarioControler :: deletarUsuario');
            res.status(500).json({ message: "UsuarioController :: erro ao deletarUsuario" });
        }
    }
}

export async function logarUsuario(req, res) {
  console.log('UsuarioController :: logarUsuario');
  const { login,senha } = req.body;

  if (!login || !senha) {
      res.status(400).json({ message: 'login e senha devem ser criados' });
  } else {
      try {
          const [status, resposta] = await getUserByLoginPassword(login,senha);
          res.status(status).json(resposta);
      } catch (error) {
          res.status(500).json({ message: "UsuarioController :: erro ao logarUsuario" });
      }
  }
}
