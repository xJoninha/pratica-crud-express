const fs = require("fs");
const path = require("path");

const helper = {};

helper.read = (fileName) =>
  fs.readFileSync(path.join(__dirname, `../data/${fileName}`), "utf-8");

helper.write = (fileName, data) =>
  fs.writeFileSync(
    path.join(__dirname, `../data/${fileName}`),
    JSON.stringify(data, null, 2),
    "utf-8"
  );

const getUsuarios = () => JSON.parse(helper.read("users.json"));

const setUsuarios = (usuarios) => helper.write("users.json", usuarios);

const getUsuarioPorId = (id) =>
  getUsuarios().find((usuario) => usuario.id == id);

const getProximoId = async () => {
  const usuarios = await getUsuarios();
  const newId = parseInt(usuarios[usuarios.length - 1].id) + 1;
  return newId;
};

const controller = {};

controller.add = (req, res) =>
  res.render("usuario-adicionar", {
    title: req.path == "/cadastro" ? `Cadastro` : `Adicionar Usuário`,
  });

controller.create = async (req, res) => {
  const usuarios = await getUsuarios();
  const id = await getProximoId();
  const { nome, sobrenome, email, idade, descricao, admin } = req.body;
  // const avatarFileName = req.file.filename;
  const novoUsuario = {
    id,
    nome,
    sobrenome,
    email,
    idade,
    descricao,
    admin: !!admin
  };
  usuarios.push(novoUsuario);
  setUsuarios(usuarios);
  res.redirect("/sucesso");
};

controller.edit = (req, res) => {
  const usuario = getUsuarioPorId(req.params.id);
  res.render("usuario-editar", {
    title: `Editar Usuário ${req.params.id}`,
    usuario,
  });
};

controller.update = async (req, res) => {
  let usuarios = await getUsuarios();
  usuarios = usuarios.map((usuario) => {
    if (usuario.id == req.params.id) {
      const { nome, sobrenome, email, idade, descricao, admin } =
        req.body;
      // const avatarFileName = req.file.filename;
      return {
        id: usuario.id,
        nome,
        sobrenome,
        email,
        idade,
        descricao,
        admin: !!admin,
      };
    } else {
      return usuario;
    }
  });
  setUsuarios(usuarios);
  res.redirect("/sucesso");
};

controller.exclude = (req, res) =>
  res.render("usuario-excluir", {
    title: `Excluir Usuário ${req.params.id}`,
    usuario: getUsuarioPorId(req.params.id),
  });

controller.delete = async (req, res) => {
  const usuarios = await getUsuarios().filter(
    (usuario) => usuario.id != req.params.id
  );
  setUsuarios(usuarios);
  res.redirect("/sucesso");
};

controller.show = (req, res) =>
  res.render("usuario", {
    title: `Usuário ${req.params.id}`,
    usuario: getUsuarioPorId(req.params.id),
  });

controller.index = async (req, res) =>
  res.render("usuarios", { title: `Usuários`, usuarios: await getUsuarios() });

module.exports = controller;