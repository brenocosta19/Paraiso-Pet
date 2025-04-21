const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const verificarToken = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', verificarToken, upload.single('imagem'), agendamentoController.criarAgendamento);
router.get('/', verificarToken, agendamentoController.listarAgendamentos);
router.put('/:id', verificarToken, agendamentoController.atualizarAgendamento);
router.delete('/:id', verificarToken, agendamentoController.deletarAgendamento);

module.exports = router;
