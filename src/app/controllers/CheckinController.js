class CheckinController {
  async index(req, res) {
    return res.json({ ok: 'index' });
  }

  async store(req, res) {
    return res.json({ ok: 'store' });
  }

  async update(req, res) {
    return res.json({ ok: 'update' });
  }

  async delete(req, res) {
    return res.json({ ok: 'delete' });
  }
}

export default new CheckinController();
