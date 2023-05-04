import {Router} from 'express'
import categoria from '../controllers/categoria.controller.js'
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'



const router = Router()

router.get('/', categoria.getCategorias)
router.get('/:id', categoria.getCategoria)
router.post('/', categoria.addCategorias)
router.put('/:id', categoria.updateCategorias)
router.delete('/:id', categoria.deleteCategorias)


export default router