const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [verifica] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (verifica.length > 0) return res.status(400).json({ mensagem: 'Email já registrado' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senhaCriptografada]);
    res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const usuario = usuarios[0];
    if (!usuario) return res.status(401).json({ mensagem: 'Email ou senha inválidos' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: 'Email ou senha inválidos' });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao realizar login' });
  }
};
