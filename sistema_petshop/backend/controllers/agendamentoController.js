const db = require('../models/db');

exports.criarAgendamento = async (req, res) => {
  const { nome_pet, raca, data_hora, observacoes } = req.body;
  const imagem = req.file ? req.file.filename : null;

  if (!imagem) return res.status(400).json({ mensagem: 'Imagem do pet é obrigatória' });

  try {
    await db.query(
      'INSERT INTO agendamentos (usuario_id, nome_pet, raca, data_hora, observacoes, imagem) VALUES (?, ?, ?, ?, ?, ?)',
      [req.usuarioId, nome_pet, raca, data_hora, observacoes, imagem]
    );
    res.status(201).json({ mensagem: 'Agendamento criado com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar agendamento' });
  }
};

exports.listarAgendamentos = async (req, res) => {
  try {
    const [agendamentos] = await db.query('SELECT * FROM agendamentos WHERE usuario_id = ?', [req.usuarioId]);
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar agendamentos' });
  }
};

exports.atualizarAgendamento = async (req, res) => {
  const { id } = req.params;
  const { nome_pet, raca, data_hora, observacoes } = req.body;

  try {
    await db.query(
      'UPDATE agendamentos SET nome_pet = ?, raca = ?, data_hora = ?, observacoes = ? WHERE id = ? AND usuario_id = ?',
      [nome_pet, raca, data_hora, observacoes, id, req.usuarioId]
    );
    res.json({ mensagem: 'Agendamento atualizado' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar' });
  }
};

exports.deletarAgendamento = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM agendamentos WHERE id = ? AND usuario_id = ?', [id, req.usuarioId]);
    res.json({ mensagem: 'Agendamento removido' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao deletar agendamento' });
  }
};
