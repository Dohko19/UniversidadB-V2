var productHandler={
    addCedula: function(IdUsuario,IdCte,FechaCaptura,Imagen,geolocation){
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "insert into Cedula(IdUsuario,IdCte,FechaCaptura,Imagen,geolocation) values(?,?,?,?,?)",
                    [IdUsuario,IdCte,FechaCaptura,Imagen,geolocation],
                    function(tx, results){},
                    function(tx, error){
                        console.log("add client error: " + error.message);
                    }
                );
                console.log("Registro guardado correctamente");
            },
            function(error){},
            function(){}
        );
    },
    addCedulaseg: function(IdUsuario,IdCte,FechaCaptura,Imagen,geolocation, envio){
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "insert into CedulaSeg(IdUsuario,IdCte,FechaCaptura,Imagen,geolocation, envio) values(?,?,?,?,?,?)",
                    [IdUsuario,IdCte,FechaCaptura,Imagen,geolocation,envio],
                    function(tx, results){},
                    function(tx, error){
                        console.log("add client error: " + error.message);
                    }
                );
                console.log("Registro guardado correctamente");
            },
            function(error){},
            function(){}
        );
    }
   

};