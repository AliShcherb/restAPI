module.exports = app => {
    const films = require("./film.controller.js");

    app.post("/films", films.create);
    app.get("/films", films.findAll);
    app.get("/films/:filmId", films.findOne);
    app.put("/films/:filmId", films.update);
    app.delete("/films/:filmId", films.delete);
    app.delete("/films", films.deleteAll);
};