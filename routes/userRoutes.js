const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const upload = require('../utils/fileUpload')

const { getLoggedUser, updateMe } = require('../controllers/userControllers')

router.use(auth)

router.get('/myProfile', getLoggedUser)

router.put('/:id/updateMe', upload.single('avatar'), updateMe)

module.exports = router
// get me traera el perfil logeado,
//put selecciona al usuario mediante el id q recibe, upload saca de fileupload la conexion con cloudynary.Se aplica la funcion updateMe, la cual recorre los campos del usuario en busca de actualizaciones. Si recibe nuevo path para el avatar este se actualiza con name "avatar"
