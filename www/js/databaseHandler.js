var databaseHandler = {
    db: null,
    createDatabase: function () {
        this.db = window.openDatabase(
            "VIC.db",
            "1.0",
            "hi",
            1000000);
        this.db.transaction(
            function (tx) {
                    //Run sql here using tx
                    tx.executeSql(
                        "create table if not exists answer_user(idCuestionario integer, answer integer,question_id integer,user_id, answer_id integer, created_at text, updated_at text, dateF text)",
                        [],
                        function (tx, results) {
                        },
                        function (tx, error) {
                            console.log("Error while creating the table: " + error.message);
                        }
                    );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

        this.db.transaction(
            function (tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists register(idCuestionario integer primary key ,idUser integer, status integer, lesson_id integer, course_id integer, dateF text, created_at text, updated_at text, dateFinish text)",
                    [],
                    function (tx, results) {
                    },
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

        this.db.transaction(
            function (tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists Actualizaciones (idActualizacion integer primary key,IdUsuario integer, Fecha text)",
                    [],
                    function (tx, results) {
                    },
                    function (tx, error) {
                        console.log("Error while creating the table Actualizaciones " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

        this.db.transaction(
            function (tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists courses_finish (idcf integer primary key,course_id integer, dateF text, finish integer DEFAULT 0)",
                    [],
                    function (tx, results) {
                    },
                    function (tx, error) {
                        console.log("Error while creating the table Actualizaciones " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

        this.db.transaction(
            function (tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists answer_question_final (ansFinalId integer, questFinalId integer, user_id integer, response integer, fecha text, status integer, bandera integer)",
                    [],
                    function (tx, results) {
                    },
                    function (tx, error) {
                        console.log("Error while creating the table Actualizaciones " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

        this.db.transaction(
            function (tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists register_final (idFinal integer primary key, user_id integer, fecha text, fecha2 text, fecha3 text, status integer, bandera integer)",
                    [],
                    function (tx, results) {
                    },
                    function (tx, error) {
                        console.log("Error while creating the table Actualizaciones " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

        this.db.transaction(
            function (tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists courses_progress (idProg integer primary key, user_id integer, course_id integer, average integer, fecha text)",
                    [],
                    function (tx, results) {
                    },
                    function (tx, error) {
                        console.log("Error while creating the table Cursos progress " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
        );

    }
}
