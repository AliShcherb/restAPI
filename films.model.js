const sql = require("./models/db.js");

const Film = function(film) {
    this.name = film.name;
    this.director = film.director;
    this.year = film.year;
};

Film.create = (newFilm, result) => {
    sql.query("INSERT INTO films SET ?", newFilm, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created film: ", { id: res.insertId, ...newFilm });
        result(null, { id: res.insertId, ...newFilm });
    });
};

Film.findById = (filmId, result) => {
    sql.query(`SELECT * FROM films WHERE id = ${filmId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found film: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Film.getAll = result => {
    sql.query("SELECT * FROM films", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("films: ", res);
        result(null, res);
    });
};

Film.updateById = (id, film, result) => {
    sql.query(
        "UPDATE films SET name = ?, director = ?, year = ? WHERE id = ?",
        [film.name, film.director, film.year, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows ==0) {
                // not found Film with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated film: ", { id: id, ...film });
            result(null, { id: id, ...film });
        }
    );
};

Film.remove = (id, result) => {
    sql.query("DELETE FROM films WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted film with id: ", id);
        result(null, res);
    });
};

Film.removeAll = result => {
    sql.query("DELETE FROM films", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} films`);
        result(null, res);
    });
};

module.exports = Film;
