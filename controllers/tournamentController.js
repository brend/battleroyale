// Controller for tournament-related operations

const Tournament = require('../models/Tournament');

function errobj(message) {
  return { message: message };
}

async function create(req, res) {
  try {
    if (!req.body.name || !req.body.game || !req.body.maximum_participants || !req.body.start_date || !req.body.end_date) {
      return res.status(400).send(errobj('Missing required fields.'));
    }

    if (req.body.maximum_participants < 2) {
      return res.status(400).send(errobj('Maximum participants must be at least 2.'));
    }

    if (req.body.start_date >= req.body.end_date) {
      return res.status(400).send(errobj('End date must be after start date.'));
    }

    if (!req.user.id) {
      return res.status(401).send(errobj('Unauthorized.'));
    }

    const newTournament = await Tournament.create({
      name: req.body.name,
      game: req.body.game,
      maximum_participants: req.body.maximum_participants,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      created_by: req.user.id,
    });
    res.status(201).send(newTournament);
  } catch (error) {
    console.error(error);
    res.status(500).send(errobj('Error creating tournament.' ));
  }
}

async function update(req, res) {
  try {
    console.log("What do you know?", req.params, req.body);
    // Validate input...
    const data = req.body;
    const updatedTournament = await Tournament.findByIdAndUpdate(data._id, data);
    res.status(200).send(updatedTournament);
  } catch (error) {
    console.error(error);
    res.status(500).send(errobj('Error updating tournament.' ));
  }
}

async function remove(req, res) {
  try {
    // Validate input...
    const removedTournament = await Tournament.findByIdAndRemove(req.params);
    res.status(200).send(removedTournament);
  } catch (error) {
    console.error(error);
    res.status(500).send(errobj('Error removing tournament.' ));
  }
}

async function list(req, res) {
  try {
    const tournaments = await Tournament.find();
    res.status(200).send(tournaments);
  } catch (error) {
    console.error(error);
    res.status(500).send(errobj('Error listing tournaments.' ));
  }
}

module.exports = { create, update, remove, list };