const Film = require("./films.model.js");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Error! Empty content"
        });
    }

    const film = new Film({
        name: req.body.name,
        director: req.body.director,
        year: req.body.year
    });

    Film.create(film, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while creating"
            });
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    Film.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while retrieving"
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Film.findById(req.params.filmId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Film with id ${req.params.filmId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Film with id " + req.params.filmId
                });
            }
        } else res.send(data);
    });
};


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Error! Empty content"
        });
    }

    Film.updateById(
        req.params.filmId,
        new Film(req.body),
        (err, data) => {

            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Film with id ${req.params.filmId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error while updating Film with id " + req.params.filmId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Film.remove(req.params.filmId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Film with id ${req.params.filmId}.`
                });
            } else {
                res.status(500).send({
                    message: "Can not delete Film with id " + req.params.filmId
                });
            }
        } else res.send({ message: `Successful removal` });
    });
};

exports.deleteAll = (req, res) => {
    Film.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while removing all films."
            });
        else res.send({ message: `Successful removal of all films` });
    });
};
