const controller = {}

controller.index = (req, res) => res.send("HOME")
controller.success = (req, res) => res.send("SUCESSO")

module.exports = controller