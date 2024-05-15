const Entry = require("../models/Entry.js");

async function listEntries(req, res) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const entries = await Entry.find({ user }).populate("tournament");

        return res.send(entries);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error listing entries" });
    }
}

async function upsertEntry(req, res) {
    try {
        const tournamentId = req.query.tournament;
        const userId = req.user?.id;
        const data = req.body;

        if (!tournamentId || !userId || !data) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const entry = await Entry.findOneAndUpdate(
            { user: userId, tournament: tournamentId },
            { user: userId, tournament: tournamentId, data: data },
            { upsert: true, new: true, runValidators: true }
        );

        return res.send(entry);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error upserting entry" });
    }
}

module.exports = { listEntries, upsertEntry };