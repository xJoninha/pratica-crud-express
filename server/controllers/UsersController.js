const fs = require('fs');
const path = require('path')

const helper = {}

helper.read = fileName => fs.readFileSync(path.join(__dirname, `../data/${fileName}`), 'utf-8')

helper.write = (fileName, data) => fs.writeFileSync(
    path.join(__dirname, `../data/${fileName}`), 
    JSON.stringify(data, null, 2),
    'utf-8'
)

const getUsuarios = () => JSON.parse(helper.read('users.json'))

const getUsuariosPorID = id => getUsuarios().find(usuario => usuario.id == id)


const controller = {}

// GET
controller.index = (req, res) => {
    const usuarios = getUsuarios()
    res.render(`usuarios`, {
        title: 'UsersController.index',
        usuarios
    })
}

controller.add = (req, res) => {
    const usuario = getUsuariosPorID(req.params.id)
    res.json(usuario)
}

controller.edit = async (req, res) => {
    const usuario = await getUsuariosPorID(req.params.id)
    res.render(`usuario-editar`, {
        title: 'UsersController.show',
        usuario
    })
}

controller.update = async (req, res) => {
    const usuario = await getUsuariosPorID(req.params.id)
    res.render(`usuario-editar`, {
        title: 'UsersController.update',
        usuario
    })
}

controller.exclude = (req, res) => {
    const usuario = getUsuariosPorID(req.params.id)
    res.json(usuario)
}

controller.show = (req, res) => {
    const usuario = getUsuariosPorID(req.params.id)
    res.render(`usuario`, {
        title: 'UsersController.show',
        usuario
    })
}

module.exports = controller