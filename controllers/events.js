const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
  try {
    const eventos = await Evento.find().populate('user', 'name');

    res.status(201).json({
      ok: true,
      eventos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, intente de nuevo o hable con el administrador',
    });
  }
};

const crearEvento = async (req, res = response) => {
  try {
    const evento = new Evento(req.body);

    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.status(201).json({
      ok: true,
      msg: 'evento creado',
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, intente de nuevo o hable con el administrador',
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  try {
    const eventoId = req.params.id;

    if (!eventoId) {
      return res.status(400).json({
        ok: false,
        msg: 'No se envió el id del evento',
      });
    }

    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: 'Evento no existe con ese id',
      });
    }

    if (evento.user.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de actualizar el evento',
      });
    }


    const nuevoEvento = {
      ...req.body,
      user: req.uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

    res.status(201).json({
      ok: true,
      msg: 'Evento Actualizado',
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, intente de nuevo o hable con el administrador',
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  try {
    const eventoId = req.params.id;

    if (!eventoId) {
      return res.status(400).json({
        ok: false,
        msg: 'No se envió el id del evento',
      });
    }

    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: 'Evento no existe con ese id',
      });
    }

    if (evento.user.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio para eliminar el evento',
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.status(201).json({
      ok: true,
      msg: 'Evento Eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, intente de nuevo o hable con el administrador',
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
