const User = require('../models/usuario')
const bcrypt = require('bcrypt')

const getLoggedUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user)

      .select('-password')
      .populate('eventsAttending', 'title date location eventImgUrl')
    // events attending establecido como array en schema User, connecto los valores del array para  mostrar en la seccion perfil
    if (!user) return res.status(404).json({ msg: 'No User find' })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const updates = {}

    if (name) updates.name = name
    if (email) updates.email = email

    // hash para la nueva contra si se produce el cambio

    if (password) {
      //paso las capas de encriptacion
      const salt = await bcrypt.genSalt(10)
      //y lo añado al cajon de actualizados
      updates.password = await bcrypt.hash(password, salt)
    }

    // cambio de avatar
    console.log('user avatar', req.file)

    if (req.file) {
      updates.avatarLink = req.file.path
    }

    // actualizo el usuario, busco por el id de req.user y lo que se aplica es objeto updates,, runValidators --> sirve para forzar actualizacion de los valores modified en mongo

    const user = await User.findByIdAndUpdate(req.user, updates, {
      new: true,
      runValidators: true
    }).select('-password')
    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = { getLoggedUser, updateMe }
