/* eslint-disable no-console */
/* eslint-disable func-names */
class FilmRepository {
    constructor(database) {
        this.database = database;
    }

    list() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM films', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM films WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO films (name, synopsis, release_year, genre_id) VALUES (?,?,?,?)',
                [data.name, data.synopsis, data.release_year, data.genre_id],
                function (err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        });
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `UPDATE films
                 SET contents = ?,
                     done = ?
                 WHERE id = ?`,
                [data.contents, data.done ? 1 : 0, id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `DELETE FROM films
                 WHERE id = ?`,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }


}

module.exports = FilmRepository;
