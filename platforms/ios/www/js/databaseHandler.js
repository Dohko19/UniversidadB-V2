var databaseHandler = {
db: null,
createDatabase: function(){
    this.db = window.openDatabase(
        "VIC.db",
        "1.0",
        "hi",
        1000000);
    this.db.transaction(
        function(tx){        
            //Run sql here using tx
            tx.executeSql(
                "create table if not exists Cedula(IdCedula integer primary key,IdUsuario integer,IdCte integer,FechaCaptura text, Imagen blob,geolocation text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table cedula: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists Clientes(IdCliente integer primary key,IdCte integer,NomComercial text, NomContacto text, Telefono text, Email text, Cliente text, Estatus text, Division integer)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table clientes: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists ced_equipos(IdCedproductos integer primary key,IdCedula integer,IdPrd integer, Cantidad integer, Ubicacion text, ImgPrd blob, checkBox text, Comentario text, Tickets integer, FechaRegistro text, Descripcion text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table equipos: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists imagen(IdImagen integer primary key,IdTipoImagen integer,Cantidad integer, Ubicacion text, checkBox text, Comentario text, FotoImagen blob, IdCedula integer)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table imagen: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists entrenamiento(IdEntrenamiento integer primary key,IdCedula integer,PersonaCapacitada text, Puesto text, TemaCapacitacion text, Comentario text, ImagenFirma blob)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table entrenamiento: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists tomaInventario(IdTomaInv integer primary key,IdCedula integer,ImgAlmacen blob, Observaciones text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table inventario: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists pedido(IdPrdInven integer primary key,IdCedula integer,IdCte integer,IdPrd integer,Descripcion text, Inventario integer, CanSolicitada integer,Comentario text, Identificador integer, Observaciones text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table pedido: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists prodnvos(IdNvoP integer primary key,IdCedula integer,IdPrd integer,Uso text, Productos text,Descripcion text,Alta text, Media text, Baja text, UsoDirecto text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table prodnvs: " + error.message);
                }
            );
            tx.executeSql( 
                "create table if not exists cierre(id_cierre integer primary key,IdCedula integer,eval integer,cfirma blob,geolocalizacion text,Solestado text,coment text,fcierre blob, envio integer, FechaCierre text, NombreFirma text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table cierre: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists CedulaSeg(IdCedulaSeg integer primary key,IdUsuario integer,IdCte integer,FechaCaptura text, Imagen blob,geolocation text, envio integer, FechaCierre text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table cedula: " + error.message);
                }
            );
            tx.executeSql(
                "create table if not exists Seguimiento(IdSeguimiento integer primary key, IdCedula integer, IdTipoSeguimiento text, NumTipoSeg text,Comentario text, Otro text,  FotoS blob, FirmaS blob, NombreFirma text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table cedula: " + error.message);
                }
            );
            tx.executeSql( 
                "create table if not exists ObservacionesPedido(id_ObservacionesPedido integer primary key,IdCedula integer,Observaciones text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table ObservacionesPedido: " + error.message);
                }
            );
            //-------------------PROSPECTOS---------
            tx.executeSql( 
                "create table if not exists Prospectos(id_Prospectos integer primary key,IdProyecto integer,IdCedulaV integer, NombreRecibe text, PuestoRecibe text, Telefono text, Correo text, Actividades text, FirmaProspecto blob, FotoProspecto blob, ActividadesNum text )",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table Prospectos: " + error.message);
                }
            );
            tx.executeSql( 
                "create table if not exists Proyectos(IdProyecto integer primary key,FechaCreacion text,NombreProyecto text, IdUsuario integer, Estatus integer, Potencial integer, SegmentoProyecto text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table ObservacionesPedido: " + error.message);
                }
            );
            tx.executeSql( 
                "create table if not exists VisitasVentas(IdCedulaV integer primary key, IdProyecto integer ,FechaVisita text,Imagen text, Geolocalizacion text, envio integer, IdUsuario integer, FechaCierre text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table ObservacionesPedido: " + error.message);
                }
            );
            tx.executeSql( 
                "create table if not exists Minutas(IdMinuta integer primary key, IdCedulaV integer, IdProyecto integer ,Tema text, Compromiso text, FechaMinuta text,NumeroMinuta integer)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table Minuta: " + error.message);
                }
            );
        },
        function(error){
            console.log("Transaction error: " + error.message);
        },
        function(){
            console.log("Create DB transaction completed successfully");
        }
    );

}
}