//id_usuario
var IdUsuario = localStorage.getItem("IdUsuario");
    $("#IdUsuario").val(IdUsuario);
    //Borrar variable de sesión
function logaout(){
    window.localStorage.removeItem("IdUsuario");
    window.localStorage.removeItem("IdCedula");
    window.localStorage.removeItem("IdCedulaSeg");
    window.localStorage.removeItem("IdCedulaV");
    window.localStorage.removeItem("IdProyecto");
    window.localStorage.removeItem("Opcion");
    window.localStorage.removeItem("Division");
    window.localStorage.removeItem("Nombre");
    window.localStorage.removeItem("Apellidos");
    window.localStorage.removeItem("signate");
    window.location.href = "index.html";
}
//Buscar Cliente
//Buscar Cliente
function buscarC(){
    app.preloader.show('blue');
    var opc = localStorage.getItem("Opcion");
    var Division = localStorage.getItem("Division");
    if(opc == 1){

        var icedulas = localStorage.getItem("IdCedula");
        var cte = $('#cte').val();
        var geolocation = $("#geolocation").val();
        var imagenC = $("#imagenC").val();
        var fecha = new Date();
        //var fFinal = '2019-8-9 12:36:30'; //comentada
        var fFinal = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
        var ncomercial = $("#ncomercial").val();
    	var ncontacto = $("#ncontacto").val();
    	var telefono = $("#telefono").val();
    	var correo = $("#correo").val();
    	var estatusc = $("#estatusc").val();
        var Nomcte = $("#Nomcte").val();
        if(cte != ''){


                if(icedulas > 0){  //Actualizar la cedula de seguimiento
                    databaseHandler.db.transaction(
                        function(tx){

                            tx.executeSql(
                                "UPDATE Cedula SET IdCte = ? WHERE IdCedula = ?",
                                [cte, icedulas],
                                function(tx, results){
                                      app.dialog.alert('El registro se actualizo correctamente.', 'Aviso');
                                      app.preloader.hide();

                                    databaseHandler.db.transaction(
                                        function(tx){

                                            tx.executeSql(
                                                "Select * from Clientes where IdCte = ? AND Division = ?",
                                                [cte, Division],
                                                function(tx, results){
                                                    var length = results.rows.length;
                                                    if(length > 0){

                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "UPDATE Clientes SET NomComercial = ?, NomContacto = ?, Telefono = ?, Email = ?, Estatus = ?, Cliente = ? WHERE IdCte = ? AND Division = ?",
                                                                    [ncomercial, ncontacto, telefono, correo, estatusc, Nomcte ,cte, Division],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorrido'});

                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    } else {

                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "INSERT INTO Clientes (NomComercial, NomContacto, Telefono, Email, IdCte, Estatus, Cliente, Division) VALUES (?,?,?,?,?,?,?,?)",
                                                                    [ncomercial, ncontacto, telefono, correo, cte, estatusc, Nomcte, Division ],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorrido'});
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    }
                                                },
                                                function(tx, error){
                                                    console.log("Error al guardar cedula: " + error.message);
                                                    app.preloader.hide();
                                                }
                                            );
                                        },
                                    function(error){},
                                    function(){}
                                );
                                },
                                function(tx, error){
                                    console.log("Error al guardar cedula: " + error.message);
                                    app.preloader.hide();
                                }
                            );
                        },
                    function(error){},
                    function(){}
                );
                 //Actualizar el cliente si existe o insertarlo en su defecto

                } else {
                    var Division = localStorage.getItem("Division");
                    if(Division == 3){
                        var NomJson ='ClientesCDC';
                        var NomDescCli = 'ClientesCDCDesc';
                    }else{
                        var NomJson = 'clientes_desc';
                        var NomDescCli = "Clientes";
                    }
                    if(imagenC != ''){//insertar la cedula
                    app.request.get(cordova.file.externalRootDirectory + "/jsons/"+NomDescCli+".json", { IdCed: cte}, function (data) {
                      var content = JSON.parse(data);
                      var valor='';
                      for(var i=0; i < content.length; i++){
                        for (var i = 0; i < data.length; i++) {
                                if(content[i].IdCte == cte){
                                    //DATOS A GUARDAR
                                    productHandler.addCedula(IdUsuario,cte,fFinal,imagenC,geolocation);
                                    databaseHandler.db.transaction(
                                    function(tx){

                                        tx.executeSql(
                                            "Select MAX(IdCedula) as Id from Cedula",
                                            [],
                                            function(tx, results){
                                                var length = results.rows.length;
                                                var item = results.rows.item(0);

                                                localStorage.setItem("IdCedula", item.Id);
                                                localStorage.setItem("IdCte", cte);
                                                //localStorage.setItem("Opcion", opc);
                                                app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                app.preloader.hide();
                                                databaseHandler.db.transaction(
                                        function(tx){

                                            tx.executeSql(
                                                "Select * from Clientes where IdCte = ? AND Division = ?",
                                                [cte, Division],
                                                function(tx, results){
                                                    var length = results.rows.length;
                                                    if(length > 0){

                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "UPDATE Clientes SET NomComercial = ?, NomContacto = ?, Telefono = ?, Email = ?, Estatus = ?, Cliente = ? WHERE IdCte = ? AND Division = ?",
                                                                    [ncomercial, ncontacto, telefono, correo, estatusc, Nomcte ,cte, Division],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorrido'});
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    } else {

                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "INSERT INTO Clientes (NomComercial, NomContacto, Telefono, Email, IdCte, Estatus, Cliente, Division) VALUES (?,?,?,?,?,?,?,?)",
                                                                    [ncomercial, ncontacto, telefono, correo, cte, estatusc, Nomcte , Division],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorrido'});
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                         app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    }
                                                },
                                                function(tx, error){
                                                    console.log("Error al guardar cedula: " + error.message);
                                                    app.preloader.hide();
                                                }
                                            );
                                        },
                                    function(error){},
                                    function(){}
                                );
                                            },
                                            function(tx, error){
                                                console.log("Error al guardar cedula: " + error.message);
                                                app.preloader.hide();
                                            }
                                        );
                                    },
                                    function(error){},
                                    function(){}
                                );
                                //Actualizar el cliente si existe o insertarlo en su defecto

                                }
                            }

                        }
                     });
                } else {
                    app.dialog.alert('El campo: Fotograf\u00eda. Es requerido.', 'Alerta!');
                    app.preloader.hide();
                }
        }
        } else {
            app.dialog.alert('Favor de seleccionar un cliente.', 'Alerta!');
            app.preloader.hide();
        }
    }
    if(opc == 2){ //Inicio guardar cedula de seguimiento
        var icedulas = localStorage.getItem("IdCedulaSeg");
        var Division = localStorage.getItem("Division");
        var cte = $('#cte').val();
        var geolocation = $("#geolocation").val();
        var imagenC = $("#imagenC").val();
        var fecha = new Date();
        var fFinal = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
        var ncomercial = $("#ncomercial").val();
    	var ncontacto = $("#ncontacto").val();
    	var telefono = $("#telefono").val();
    	var correo = $("#correo").val();
    	var estatusc = $("#estatusc").val();
        var Nomcte = $("#Nomcte").val();
        if(cte != ''){
                if(icedulas > 0){  //Actualizar la cedula de seguimiento
                    databaseHandler.db.transaction(
                        function(tx){

                            tx.executeSql(
                                "UPDATE CedulaSeg SET IdCte = ? WHERE IdCedulaSeg = ?",
                                [cte, icedulas],
                                function(tx, results){
                                      app.dialog.alert('El registro se actualizo correctamente.', 'Aviso');
                                      app.preloader.hide();

                                    databaseHandler.db.transaction(
                                        function(tx){

                                            tx.executeSql(
                                                "Select * from Clientes where IdCte = ? AND Division = ?",
                                                [cte, Division],
                                                function(tx, results){
                                                    var length = results.rows.length;
                                                    if(length > 0){
                                                       app.preloader.hide();
                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "UPDATE Clientes SET NomComercial = ?, NomContacto = ?, Telefono = ?, Email = ?, Estatus = ?, Cliente = ? WHERE IdCte = ? AND Division = ?",
                                                                    [ncomercial, ncontacto, telefono, correo, estatusc, Nomcte ,cte, Division],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorridoseg'});
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    } else {

                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "INSERT INTO Clientes (NomComercial, NomContacto, Telefono, Email, IdCte, Estatus, Cliente, Division) VALUES (?,?,?,?,?,?,?,?)",
                                                                    [ncomercial, ncontacto, telefono, correo, cte, estatusc, Nomcte, Division],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorridoseg'});
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    }
                                                },
                                                function(tx, error){
                                                    console.log("Error al guardar cedula: " + error.message);
                                                    app.preloader.hide();
                                                }
                                            );
                                        },
                                    function(error){},
                                    function(){}
                                );
                                },
                                function(tx, error){
                                    console.log("Error al guardar cedula: " + error.message);
                                    app.preloader.hide();
                                }
                            );
                        },
                    function(error){},
                    function(){}
                );
                 //Actualizar el cliente si existe o insertarlo en su defecto

                } else { //insertar la cedula
                    var Division = localStorage.getItem("Division");

                    if(Division == 3){
                        var NomJson ='ClientesCDC';
                        var NomDescCli = 'ClientesCDCDesc';
                    }else{
                        var NomJson = 'clientes_desc';
                        var NomDescCli = "Clientes";
                    }

                    if(imagenC != ''){
                    app.request.get(cordova.file.externalRootDirectory + "/jsons/"+NomDescCli+".json", { IdCed: cte}, function (data) {
                      var content = JSON.parse(data);
                      var valor='';
                      for(var i=0; i < content.length; i++){
                        for (var i = 0; i < data.length; i++) {
                                if(content[i].IdCte == cte){
                                    //DATOS A GUARDAR
                                    var envio = 0;

                                    productHandler.addCedulaseg(IdUsuario,cte,fFinal,imagenC,geolocation, envio);
                                    databaseHandler.db.transaction(
                                    function(tx){

                                        tx.executeSql(
                                            "Select MAX(IdCedulaSeg) as Id from CedulaSeg",
                                            [],
                                            function(tx, results){
                                                var length = results.rows.length;
                                                var item = results.rows.item(0);

                                                localStorage.setItem("IdCedulaSeg", item.Id);
                                                localStorage.setItem("IdCte", cte);
                                                //localStorage.setItem("Opcion", opc);
                                                app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                app.preloader.hide();
                                                databaseHandler.db.transaction(
                                        function(tx){

                                            tx.executeSql(
                                                "Select * from Clientes where IdCte = ? AND Division = ?",
                                                [cte, Division],
                                                function(tx, results){
                                                    var length = results.rows.length;
                                                    if(length > 0){

                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "UPDATE Clientes SET NomComercial = ?, NomContacto = ?, Telefono = ?, Email = ?, Estatus = ?, Cliente = ? WHERE IdCte = ? AND Division = ?",
                                                                    [ncomercial, ncontacto, telefono, correo, estatusc, Nomcte ,cte, Division],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorridoseg'});
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    } else {

                                                        databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "INSERT INTO Clientes (NomComercial, NomContacto, Telefono, Email, IdCte, Estatus, Cliente, Division) VALUES (?,?,?,?,?,?,?,?)",
                                                                    [ncomercial, ncontacto, telefono, correo, cte, estatusc, Nomcte,Division],
                                                                    function(tx, results){
                                                                        app.views.main.router.navigate({name: 'recorridoseg'});
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                         app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                    }
                                                },
                                                function(tx, error){
                                                    console.log("Error al guardar cedula: " + error.message);
                                                    app.preloader.hide();
                                                }
                                            );
                                        },
                                    function(error){},
                                    function(){}
                                );
                                            },
                                            function(tx, error){
                                                console.log("Error al guardar cedula: " + error.message);
                                                app.preloader.hide();
                                            }
                                        );
                                    },
                                    function(error){},
                                    function(){}
                                );
                                //Actualizar el cliente si existe o insertarlo en su defecto

                                }
                            }

                        }
                     });
                    } else {
            app.dialog.alert('El campo: Fotograf\u00eda. Es requerido.', 'Alerta!');
            app.preloader.hide();
        }
                } //else insertar cedula



        } else {
            app.dialog.alert('Favor de seleccionar un cliente.', 'Alerta!');
            app.preloader.hide();
        }
     }//fin de guardar cedula de seguimiento
}
//codigo equipo
function DatosEqu(){
    app.preloader.show('blue');
    var IdC = localStorage.getItem("IdCte");
    var Idcodigos = $("#codigos").val();
    app.request.get(cordova.file.externalRootDirectory + '/jsons/equipos_cte.json', function (data) {
        var content = JSON.parse(data);
        for(var i=0; i < content.length; i++){
                if(content[i].IdCte == IdC){
                    if(content[i].IdPrd == Idcodigos){
        $("#ProCte").val(content[0].IdPrd);
        $("#DescEqu").val(content[0].Descripcion);
                    }
            }
        }
    });
    app.preloader.hide();
}

function guardadNuevoEq(){
    var IdC = localStorage.getItem("IdCte");
    var Division = localStorage.getItem("Division");
    var PCode = $("#PCode").val();
    var PDesc = $("#PDesc").val();
    var r = 0;

    if(Division == 3){
        var NomEquipos = 'equipos_cteCDC';
    } else {
        var NomEquipos = 'equipos_cte';
    }


    if(PCode != ''){
        app.request.get(cordova.file.externalRootDirectory + "/jsons/"+NomEquipos+".json", function (data) {
            var content = JSON.parse(data);
            var x=0;
            var datos = new Array();
            for(var i=0; i < content.length; i++){
                if(content[i].IdCte == IdC){
                    datos[x]= {'Valor':x,'Code':content[i].IdPrd};
                    if(datos[x].Code == PCode){
                        r++;
                    }else{
                    }
                    x++;
                }
            }
            if(r > 0){
                app.dialog.alert('El equipo ya se encuentra en el listado de codigos.', 'Alerta');
                app.preloader.hide();
            }else{
                option = document.createElement("option");
                option.value = PCode;
                option.text = unescape(PCode + "   " + PDesc);
                select.appendChild(option);
                $("#DescEqu").val(PDesc);
                app.dialog.alert('El equipo se agrego al listado de codigos.', 'Aviso');
                app.preloader.hide();
            }
        });
    }else{
        app.dialog.alert('Favor de buscar un producto.', 'Aleta!');
        app.preloader.hide();
    }
}


//---EQUIPO--------------------
function guardarEquipo(){
    app.preloader.show('blue');
    var icedula = localStorage.getItem("IdCedula");
    var IdPrd = $("#codigos").val();
    var Descripcion = $("#DescEqu").val();
    var radio = $('input[name=demo-radio]:checked').val();
    var cantidad =  $("#cantidad").val();
    var ubicacion = $("#ubicacion").val();
    var tickets = document.getElementById("tickets").value;
    var comentario = $("#comentario").val();
    var file_data = $('#imagenC').val();
    var fecha = new Date();
    var fFinal = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();

    if(IdPrd != 0){
        //if(!radio != true){
            if(radio == 'Equipo en buen estado'){
                //if(file_data != ""){
                                databaseHandler.db.transaction(
                                    function(tx){
                                        tx.executeSql(
                                            "INSERT INTO ced_equipos (IdCedula,IdPrd , Cantidad , Ubicacion , ImgPrd , checkbox,Comentario , Tickets , FechaRegistro, Descripcion ) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                            [icedula, IdPrd, cantidad,ubicacion, file_data, radio, comentario, tickets, fFinal, Descripcion ],
                                            function(tx, results){
                                           //Extraer el ultimo registro
                                           app.preloader.hide();
                                            databaseHandler.db.transaction(
                                            function(tx){
                                                tx.executeSql(
                                                    "Select MAX(IdCedproductos) as Id from ced_equipos",
                                                    [],
                                                    function(tx, results){
                                                        var length = results.rows.length;
                                                        var item = results.rows.item(0);
                                                        var IdCEq = item.Id;
                                                        app.preloader.hide();
                                                        //Consultar el producto
                                                          databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "Select * from ced_equipos where IdCedproductos = ?",
                                                                    [IdCEq],
                                                                    function(tx, results){
                                                                        var length = results.rows.length;
                                                                        var item1 = results.rows.item(0);
                                                                        if(item1.Tickets == 1){NomTicket = "Da&ntilde;o del equipo por uso normal";}
                                                                        if(item1.Tickets == 2){NomTicket = "Equipo da&ntilde;ado por descuido";}
                                                                        if(item1.Tickets == 3){NomTicket = "Mantenimiento correctivo";}
                                                                        if(item1.Tickets == ''){NomTicket = "";}
                                                                        $("#DescEqu").val("");
                                                                        $("#cantidad").val("");
                                                                        $("#ubicacion").val("");
                                                                        $("#comentario").val("");
                                                                        $('#imagenC').val("");
                                                                        $("#TabEquipos tbody").append("<tr id='fila"+ item1.IdCedproductos +"'><td><a href='#' onclick='eliminarFila("+ item1.IdCedproductos +", 1);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></a></td><td><img src='"+item1.ImgPrd+"' width='60px'/></td><td text-align: center;>" + item1.IdPrd + "</td><td text-align: center;>"+unescape(item1.Descripcion)+"</td><td text-align: center;>"+ item1.Cantidad + "</td><td text-align: center;>" + item1.Ubicacion + "</td><td text-align: center;>"+ radio+"</td><td text-align: center;>"+ item1.Comentario+"</td><td text-align: center;>"+ NomTicket + "</td></tr>");
                                                                        $("#codigos").css("background-color", "#FFFFFF");
                                                                        $("#cantidad").css("background-color", "#FFFFFF");
                                                                        $("#comentario").css("background-color", "#FFFFFF");

                                                                        document.getElementById("Bradio").checked = false;
                                                                        document.getElementById("Mradio").checked = false;

                                                                        document.ready = document.getElementById("codigos").value = '0';

                                                                        $('.preloader').remove();
                                                                        $('.infinite-scroll-preloader').remove();
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                        //Fin de consulgtar el producto
                                                    },
                                                    function(tx, error){
                                                        console.log("Error al guardar cedula: " + error.message);
                                                        app.preloader.hide();
                                                    }
                                                );
                                            },
                                            function(error){},
                                            function(){}
                                        ); //FIN DE Extraer el ultimo registro
                                           app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                           app.preloader.hide();
                                        },
                                        function(tx, error){
                                            console.log("Error al guardar el equipo: " + error.message);
                                            app.preloader.hide();
                                        }
                                    );
                                },
                                function(error){},
                                function(){}
                            );
                            /*}else{
                                app.dialog.alert('El campo: Fotograf\u00eda. Es requerido.', 'Alerta!');
                                app.preloader.hide();
                            }*/
            }else if(radio == 'Equipo en mal estado'){
                if(cantidad != ""){
                    if(ubicacion != ""){
                        if(tickets != 0){
                            //if(file_data != ""){
                                databaseHandler.db.transaction(
                                    function(tx){
                                        tx.executeSql(
                                            "INSERT INTO ced_equipos (IdCedula,IdPrd , Cantidad , Ubicacion , ImgPrd , checkbox,Comentario , Tickets , FechaRegistro, Descripcion ) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                            [icedula, IdPrd, cantidad, ubicacion, file_data, radio, comentario, tickets, fFinal, Descripcion ],
                                            function(tx, results){
                                           //Extraer el ultimo registro
                                           app.preloader.hide();
                                            databaseHandler.db.transaction(
                                            function(tx){
                                                tx.executeSql(
                                                    "Select MAX(IdCedproductos) as Id from ced_equipos",
                                                    [],
                                                    function(tx, results){
                                                        var length = results.rows.length;
                                                        var item = results.rows.item(0);
                                                        var IdCEq = item.Id;
                                                        app.preloader.hide();
                                                        //Consultar el producto
                                                          databaseHandler.db.transaction(
                                                            function(tx){
                                                                tx.executeSql(
                                                                    "Select * from ced_equipos where IdCedproductos = ?",
                                                                    [IdCEq],
                                                                    function(tx, results){
                                                                        var length = results.rows.length;
                                                                        var item1 = results.rows.item(0);
                                                                        if(item1.Tickets == 1){NomTicket = "Da&ntilde;o del equipo por uso normal";}
                                                                        if(item1.Tickets == 2){NomTicket = "Equipo da&ntilde;ado por descuido";}
                                                                        if(item1.Tickets == 3){NomTicket = "Mantenimiento correctivo";}
                                                                        if(item1.Tickets == ''){NomTicket = "";}
                                                                        $("#DescEqu").val("");
                                                                        $("#cantidad").val("");
                                                                        $("#ubicacion").val("");
                                                                        $("#comentario").val("");
                                                                        $('#imagenC').val("");
                                                                        $("#TabEquipos tbody").append("<tr id='fila"+ item1.IdCedproductos +"'><td><a href='#' onclick='eliminarFila("+ item1.IdCedproductos +", 1);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></a></td><td><img src='"+item1.ImgPrd+"' width='60px'/></td><td text-align: center;>" + item1.IdPrd + "</td><td text-align: center;>"+unescape(item1.Descripcion)+"</td><td text-align: center;>"+ item1.Cantidad + "</td><td text-align: center;>" + item1.Ubicacion + "</td><td text-align: center;>"+ radio+"</td><td text-align: center;>"+ item1.Comentario+"</td><td text-align: center;>"+ NomTicket + "</td></tr>");
                                                                        $("#codigos").css("background-color", "#FFFFFF");
                                                                        $("#cantidad").css("background-color", "#FFFFFF");
                                                                        $("#comentario").css("background-color", "#FFFFFF");

                                                                        document.getElementById("Bradio").checked = false;
                                                                        document.getElementById("Mradio").checked = false;

                                                                        document.ready = document.getElementById("codigos").value = '0';

                                                                        $('.preloader').remove();
                                                                        $('.infinite-scroll-preloader').remove();
                                                                        app.preloader.hide();
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar cedula: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                        );
                                                        //Fin de consulgtar el producto
                                                    },
                                                    function(tx, error){
                                                        console.log("Error al guardar cedula: " + error.message);
                                                        app.preloader.hide();
                                                    }
                                                );
                                            },
                                            function(error){},
                                            function(){}
                                        ); //FIN DE Extraer el ultimo registro
                                           app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                           app.preloader.hide();
                                        },
                                        function(tx, error){
                                            console.log("Error al guardar el equipo: " + error.message);
                                            app.preloader.hide();
                                        }
                                    );
                                },
                                function(error){},
                                function(){}
                            );
                            /*}else{
                                app.dialog.alert('El campo: Fotograf\u00eda. Es requerido.', 'Alerta!');
                                app.preloader.hide();
                            }*/
                        }else{
                            app.dialog.alert('Seleccione un motivo(Ticket).', 'Alerta!');
                            app.preloader.hide();
                        }
                    }else{
                        app.dialog.alert('El campo: Ubicaci\u00f3n. Es requerido.', 'Alerta!');
                        app.preloader.hide();
                    }
                }else{
                    app.dialog.alert('El campo: Cantidad. Es requerido.', 'Alerta!');
                    app.preloader.hide();
                }
            }else{
                app.dialog.alert('Seleccione el estado del equipo.', 'Alerta!');
                app.preloader.hide();
            }
    }else{
        app.dialog.alert('Seleccione un codigo.', 'Alerta!');
        app.preloader.hide();
    }
}




//TOMA DE INVENTARIO
function TomaInventario(){
    app.preloader.show('blue');
    var IdCte = localStorage.getItem("IdCte");
    var icedula = localStorage.getItem("IdCedula");
    var opciones =  $('input[name="fotoal"]:checked').val();
    var file_data = $('#imagenC').val();
    var Observaciones =  $("#observaciones").val();
    //if($("#observaciones").val() != ''){
        databaseHandler.db.transaction(
            function(tx1){
                tx1.executeSql(
                    "INSERT INTO tomaInventario (IdCedula ,ImgAlmacen , Observaciones ) VALUES (?,?,?)",
                    [icedula, file_data, Observaciones],
                    function(tx2, results){
                       //Extraer el ultimo registro
                        databaseHandler.db.transaction(
                        function(tx3){
                            tx3.executeSql(
                                "Select MAX(IdTomaInv) as Id from tomaInventario",
                                [],
                                function(tx4, results){
                                    var length = results.rows.length;
                                    var item = results.rows.item(0);
                                    var IdCEq = item.Id;
                                    //Consultar el producto
                                        databaseHandler.db.transaction(
                                            function(tx5){
                                                tx5.executeSql(
                                                    "Select * from tomaInventario where IdTomaInv = ?",
                                                    [IdCEq],
                                                    function(tx5, results){
                                                        var length = results.rows.length;
                                                        var item2 = results.rows.item(0);
                                                        $("#observaciones").val('');
                                                        $('#imagenC').val('');
                                                        $("#TabObserva tbody").append("<tr id='fila"+ item2.IdTomaInv +"'><td><a href='#' onclick='eliminarFila("+ item2.IdTomaInv +", 4);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></a></td><td><img src='"+item2.ImgAlmacen+"' width='60px'/></td><td style='text-align: center;'>"+ item2.Observaciones +"</td></tr>");
                                                        $("#observaciones").css("background-color", "#FFFFFF");
                                                        app.preloader.hide();
                                                    },
                                                    function(tx5, error){
                                                        console.log("Error al guardar registro: " + error.message);
                                                    }
                                                );
                                            },
                                            function(error){},
                                            function(){}
                                        );
                                    //Fin de consulgtar el producto
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                    app.preloader.hide();
                                }
                            );
                        },
                        function(error){},
                        function(){}
                        ); //FIN DE Extraer el ultimo registro
                           app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                           app.preloader.hide();
                        },
                        function(tx2, error){
                            console.log("Error al guardar el imagen: " + error.message);
                            app.preloader.hide();
                        }
                    );
                },
                function(error){},
                function(){}
        );
    // } else {
    //     app.dialog.alert('El campo: Observaciones. Es requerido.', 'Alerta!');
    //     app.preloader.hide();
    // }
}


//Ingresar nuevo producto en Pedido
function guardadNuevoProdPEDIDO(){
    var icedula = localStorage.getItem("IdCedula");
    var IdCte = localStorage.getItem("IdCte");
    var PCode = $("#PCode").html();
    var PDesc =$("#PDesc").val();
    var inventario = $("#PInven").val();
    var cantidad = $("#PCanti").val();
    var comentario = $("#PComen").val();
    var identificador = '1';

    if(PCode != ''){
        databaseHandler.db.transaction(
            function(tx1){
                tx1.executeSql(
                    "INSERT INTO pedido (IdCedula, IdCte,IdPrd, Descripcion,Inventario,CanSolicitada,Comentario, Identificador) VALUES (?,?,?,?,?,?,?,?)",
                    [icedula,IdCte,PCode, PDesc, inventario,cantidad,comentario, identificador],
                    function(tx1, results){
                        var valor = results.rows.length;
                        app.dialog.alert('El producto fue agregado', 'Aviso!');
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "SELECT MAX(IdPrdInven) as Id FROM pedido ",
                                    [],
                                    function(tx1, results){
                                        var valor = results.rows.length;
                                        var item = results.rows.item(0);
                                        var IdCEq = item.Id;

                                        databaseHandler.db.transaction(
                                            function(tx1){
                                                tx1.executeSql(
                                                    "select * from pedido WHERE IdPrdInven = ?",
                                                    [IdCEq],
                                                    function(tx1, results){
                                                        var valor = results.rows.length;
                                                        var item2 = results.rows.item(0);

                                                        $("#PrdCode tbody").append("<tr><td text-align: center;>"+item2.IdPrd+"</td><td text-align: center;><span id='descripcion"+item2.IdPrd+"' name='descripcion"+item2.Descripcion+"'>"+item2.Descripcion+"</span></td><td text-align: center;><span id='text4'><input class='spanBlanco' type='number' style='width: 100%; font-size: 11pt; text-align: center;' id='inventario"+item2.IdPrd+"' name='inventario"+item2.IdPrd+"' onchange='guardarP("+item2.IdPrd+")' value='"+item2.Inventario+"'/></span></td><td text-align: center;><span id='text4'><input class='spanBlanco' style='width: 100%; font-size: 11pt; text-align: center;' type='number' id='cantidad"+item2.IdPrd+"' name='cantidad"+item2.IdPrd+"' onchange='guardarP("+item2.IdPrd+")' value='"+item2.CanSolicitada+"'/></span></td><td text-align: center;><textarea rows='1' style='width:95%; text-align: center;' class='spanBlanco' id='comentario"+item2.IdPrd+"' name='comentario"+item2.IdPrd+"' onchange='guardarP("+item2.IdPrd+")'>"+item2.Comentario+"</textarea></td><td text-align: center;></td><td text-align: center;></td></tr>");
                                                        PCode = $("#PCode").html("");
                                                        PDesc =$("#PDesc").val("");
                                                        inventario = $("#PInven").val("");
                                                        cantidad = $("#PCanti").val("");
                                                        comentario = $("#PComen").val("");
                                                        app.preloader.hide();


                                                    }
                                            )},
                                            function(error){},
                                            function(){}
                                        );

                                    }
                            )},
                            function(error){},
                            function(){}
                        );
                    }
            )},
            function(error){},
            function(){}
        );
    }else{
        app.dialog.alert('Favor de agregar un nuevo producto.', 'Alerta!');
        app.preloader.hide();
    }

}


function guardarP(idpedido){

    var icedula = localStorage.getItem("IdCedula");
    var IdCte = localStorage.getItem("IdCte");
    var descripcion =$("#descripcion"+idpedido).html();
    var inventario = $("#inventario"+idpedido).val();
    var cantidad = $("#cantidad"+idpedido).val();
    var comentario = $("#comentario"+idpedido).val();
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql(
                "select * from pedido WHERE IdCedula= ? AND IdPrd = ?",
                [icedula,idpedido],
                function(tx1, results){
                    var valor = results.rows.length;
                    if(valor > 0){
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "UPDATE pedido SET Inventario = ?, CanSolicitada = ?, Comentario = ? WHERE IdCedula = ? AND IdPrd = ?",
                                    [inventario,cantidad,comentario,icedula,idpedido],
                                    function(tx1, results){
                                        var valor = results.rows.length;
                                        app.preloader.hide();
                                        //alert(valor);
                                    }
                            )},
                            function(error){},
                            function(){}
                        );
                    }else{
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "INSERT INTO pedido (IdCedula, IdCte,IdPrd, Descripcion,Inventario,CanSolicitada,Comentario) VALUES (?,?,?,?,?,?,?)",
                                    [icedula,IdCte,idpedido, descripcion, inventario,cantidad,comentario],
                                    function(tx1, results){
                                        var valor = results.rows.length;
                                        app.preloader.hide();

                                    }
                            )},
                            function(error){},
                            function(){}
                        );
                    }
                }
        )},
        function(error){},
        function(){}
    );

}

function ObservacionesPe(){
    var icedula = localStorage.getItem("IdCedula");
    var observaciones = $("#Obser").val();
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql(
                "select * from ObservacionesPedido WHERE IdCedula= ?",
                [icedula],
                function(tx1, results){
                    var valor = results.rows.length;
                    if(valor > 0){
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "UPDATE ObservacionesPedido SET Observaciones = ? WHERE IdCedula = ? ",
                                    [observaciones,icedula],
                                    function(tx1, results){
                                        var valor = results.rows.length;
                                        app.preloader.hide();
                                    }
                            )},
                            function(error){},
                            function(){}
                        );
                    }else{
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "INSERT INTO ObservacionesPedido (IdCedula, Observaciones) VALUES (?,?)",
                                    [icedula,observaciones],
                                    function(tx1, results){
                                        var valor = results.rows.length;
                                        app.preloader.hide();
                                    }
                            )},
                            function(error){},
                            function(){}
                        );
                    }
                }
        )},
        function(error){},
        function(){}
    );
}
function GuardarProd(){
    app.preloader.show('blue');
    var IdCte = localStorage.getItem("IdCte");
    var icedula = localStorage.getItem("IdCedula");
    var IdInv = localStorage.getItem("IdInventario");
    var idprd = $("#ProCte").val();
    var DescPrd = $("#DescPrd").val();
    var Invent = $("#Invent").val();
    var Comentario = $("#Coment").val();
    var CanSolicitada = $("#CanSolicitada").val();
    var checkbox = document.getElementById("BuenEstado");

    if(checkbox.checked == true){
        if(Comentario == ""){
           app.dialog.alert('El campo: Comentario. Es requerido.', 'Alerta!');
           app.preloader.hide();
        }else{
            var bol = "No se levanto pedido";
            databaseHandler.db.transaction(
                    function(tx1){
                        tx1.executeSql(
                            "INSERT INTO pedido (IdCedula,IdPrd, Inventario, CanSolicitada, IdCte, Descripcion,checkbox,Comentario) VALUES (?,?,?,?,?,?,?,?)",
                            [icedula, "", "", "", "", "",bol,Comentario],
                            function(tx2, results){
                           //Extraer el ultimo registro
                                databaseHandler.db.transaction(
                                    function(tx3){
                                        tx3.executeSql(
                                        "Select MAX(IdPrdInven) as Id from pedido",
                                        [],
                                        function(tx4, results){
                                            var length = results.rows.length;
                                            var item = results.rows.item(0);
                                            var IdCEq = item.Id;
                                            //Consultar el producto
                                            databaseHandler.db.transaction(
                                                function(tx5){
                                                    tx5.executeSql(
                                                    "Select * from pedido where IdPrdInven = ?",
                                                    [IdCEq],
                                                        function(tx5, results){
                                                            var length = results.rows.length;
                                                            var item2 = results.rows.item(0);
                                                            app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                            $("#TabProductos1 tbody").append("<tr id='fila"+ item2.IdPrdInven +"'><td bgcolor='#E7FFDF'><a href='#' onclick='eliminarFila("+ item2.IdPrdInven +", 5);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></a></td><td bgcolor='#E7FFDF' text-align: center;>" + item2.IdPrd + "</td><td bgcolor='#E7FFDF' text-align: center;>" + item2.Descripcion + "</td><td bgcolor='#E7FFDF' text-align: center;>"+ item2.Inventario + "</td><td bgcolor='#E7FFDF' text-align: center;>" + item2.CanSolicitada + "</td><td bgcolor='#E7FFDF' text-align: center;>" + bol + "</td><td bgcolor='#E7FFDF' text-align: center;>" + item2.Comentario + "</td></tr>");

                                                            $("#CanSolicitada").val('');
                                                            $("#Invent").val('');
                                                            $("#PromCompra").val('');
                                                            $("#PedSugerido").val('');
                                                            $("#FUltVta").val('');
                                                            $("#DescPrd").val('');
                                                            app.preloader.hide();
                                                        },
                                                        function(tx5, error){
                                                            console.log("Error al guardar registro: " + error.message);
                                                            app.preloader.hide();
                                                        }
                                                    );
                                                },
                                                function(error){},
                                                function(){}
                                            );
                                            //Fin de consulgtar el producto
                                        },
                                        function(tx4, error){
                                            console.log("Error al guardar registro: " + error.message);
                                            app.preloader.hide();
                                        }
                                    );
                                },
                            function(error){},
                            function(){}
                        ); //FIN DE Extraer el ultimo registro
                        },
                        function(tx2, error){
                            console.log("Error al guardar la imagen: " + error.message);
                            app.preloader.hide();
                        }
                    );
                },
                function(error){},
                function(){}
            );
        }
    }else{
        if($("#Invent").val() != ''){
            if($("#CanSolicitada").val() != ''){
                var bfalse = "";
                databaseHandler.db.transaction(
                    function(tx1){
                        tx1.executeSql(
                            "INSERT INTO pedido (IdCedula,IdPrd, Inventario, CanSolicitada, IdCte, Descripcion,checkbox,Comentario) VALUES (?,?,?,?,?,?,?,?)",
                            [icedula, idprd, Invent, CanSolicitada, IdCte, DescPrd,bfalse,Comentario],
                            function(tx2, results){
                           //Extraer el ultimo registro
                                databaseHandler.db.transaction(
                                    function(tx3){
                                        tx3.executeSql(
                                        "Select MAX(IdPrdInven) as Id from pedido",
                                        [],
                                        function(tx4, results){
                                            var length = results.rows.length;
                                            var item = results.rows.item(0);
                                            var IdCEq = item.Id;
                                            //Consultar el producto
                                            databaseHandler.db.transaction(
                                                function(tx5){
                                                    tx5.executeSql(
                                                    "Select * from pedido where IdPrdInven = ?",
                                                    [IdCEq],
                                                        function(tx5, results){
                                                            var length = results.rows.length;
                                                            var item2 = results.rows.item(0);
                                                            app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                            $("#TabProductos1 tbody").append("<tr id='fila"+ item2.IdPrdInven +"'><td><a href='#' onclick='eliminarFila("+ item2.IdPrdInven +", 5);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></a></td><td text-align: center;>" + item2.IdPrd + "</td><td text-align: center;>" + item2.Descripcion + "</td><td text-align: center;>"+ item2.Inventario + "</td><td text-align: center;>" + item2.CanSolicitada + "</td><td text-align: center;>" + bfalse + "</td><td text-align: center;>" + item2.Comentario+ "</td></tr>");
                                                            app.preloader.hide();
                                                            $("#CanSolicitada").val('');
                                                            $("#Invent").val('');
                                                            $("#PromCompra").val('');
                                                            $("#PedSugerido").val('');
                                                            $("#FUltVta").val('');
                                                            $("#DescPrd").val('');
                                                        },
                                                        function(tx5, error){
                                                            console.log("Error al guardar registro: " + error.message);
                                                            app.preloader.hide();
                                                        }
                                                    );
                                                },
                                                function(error){},
                                                function(){}
                                            );
                                            //Fin de consulgtar el producto
                                        },
                                        function(tx4, error){
                                            console.log("Error al guardar registro: " + error.message);
                                            app.preloader.hide();
                                        }
                                    );
                                },
                            function(error){},
                            function(){}
                        ); //FIN DE Extraer el ultimo registro
                        },
                        function(tx2, error){
                            console.log("Error al guardar la imagen: " + error.message);
                            app.preloader.hide();
                        }
                    );
                },
                function(error){},
                function(){}
            );
            } else {
                app.dialog.alert('El campo: Cantidad solicitada. Es requerido.', 'Alerta!');
                app.preloader.hide();
            }
        } else {
            app.dialog.alert('El campo: Inventario al dia de cliente. Es requerido.', 'Alerta!');
            app.preloader.hide();
        }
    }
}
//imagen
function gimagen(){

    //IMAGEN EN BUEN ESTADO NO PEDIR NADA
    app.preloader.show('blue');
    var file_data = $('#imagenC').val();
    var icedula = localStorage.getItem("IdCedula");
    var tipoimagen = document.getElementById("tipoimagen").value;
    var cantidad = $("#cantidad").val();
    var ubicacion =  $("#ubicacion").val();
    var comentario = $("#comentario").val();
    var radio = $('input[name=demo-radio1]:checked').val();
    app.preloader.hide();
    if(tipoimagen != 0){
        if(radio == 1 || radio == 2){
            if(radio == 1){ //Buen estado
                databaseHandler.db.transaction(
                function(tx1){
                    tx1.executeSql(
                        "INSERT INTO imagen (IdTipoImagen,Cantidad, Ubicacion ,checkbox, Comentario, FotoImagen, IdCedula) VALUES (?,?,?,?,?,?,?)",
                        [tipoimagen, cantidad, ubicacion, radio,comentario, file_data, icedula ],
                        function(tx2, results){
                           //Extraer el ultimo registro
                            databaseHandler.db.transaction(
                            function(tx3){
                                tx3.executeSql(
                                "Select MAX(IdImagen) as Id from imagen",
                                [],
                                function(tx4, results){
                                    var length = results.rows.length;
                                    var item = results.rows.item(0);
                                    var IdCEq = item.Id;
                                    //Consultar el producto
                                    databaseHandler.db.transaction(
                                        function(tx5){
                                            tx5.executeSql(
                                                "Select * from imagen where IdImagen = ?",
                                                [IdCEq],
                                                function(tx5, results){
                                                    var length = results.rows.length;
                                                    var item2 = results.rows.item(0);
                                                    if(item2.IdTipoImagen == 1){ var TipoImagen = "Wallchart"; }
                                                    if(item2.IdTipoImagen == 2){ var TipoImagen = "Etiqueta"; }
                                                    if(item2.IdTipoImagen == 3){ var TipoImagen = "Imagen del cliente"; }
                                                    if(item2.IdTipoImagen == 4){ var TipoImagen = "Carpeta del cliente"; }
                                                    if(item2.IdTipoImagen == 5){ var TipoImagen = "Concentraci&oacute;n de Equipos"; }
                                                    if(item2.checkBox == 1){ var Estado ="Imagen en buen estado"; }
                                                    if(item2.checkBox == 2){ var Estado ="Imagen en mal estado"; }
                                                    $("#tablaimagen tbody").append("<tr id='fila"+ item2.IdImagen +"'><td><a href='#' onclick='eliminarFila("+ item2.IdImagen +", 2);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></td><td text-align: center;><img src='"+item2.FotoImagen+"' width='60px'/></td><td text-align: center;>" + TipoImagen + "</td><td text-align: center;>" + item2.Cantidad + "</td><td  text-align: center;>"+ item2.Ubicacion+"</td><td  text-align: center;>"+ Estado + "</td><td  text-align: center;>"+ item2.Comentario + "</td></tr>");
                                                    $("#cantidad").val('');
                                                    $("#ubicacion").val('');
                                                    $("#comentario").val('');
                                                    $('#imagenC').val('');

                                                    $("#cantidad").css("background-color", "#ffffff");
                                                    $("#ubicacion").css("background-color", "#ffffff");
                                                    $("#comentario").css("background-color", "#ffffff");
                                                    $("#tipoimagen").css("background-color", "#ffffff");
                                                    document.getElementById("BradioI").checked = false;
                                                    document.getElementById("MradioI").checked = false;

                                                    document.ready = document.getElementById("tipoimagen").value = '0';

                                                    app.preloader.hide();
                                                },
                                                function(tx5, error){
                                                    console.log("Error al guardar registro: " + error.message);
                                                    app.preloader.hide();
                                                }
                                            );
                                        },
                                        function(error){},
                                        function(){}
                                    );
                                        //Fin de consulgtar el producto
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                            },
                            function(error){},
                            function(){}
                        ); //FIN DE Extraer el ultimo registro
                           app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                        },
                        function(tx2, error){
                            console.log("Error al guardar el imagen: " + error.message);

                        }
                    );
                },
                function(error){},
                function(){}
                );
            }else if(radio == 2){ //mal estado
            if(cantidad != ''){
                if(ubicacion != ''){
                    if(comentario != ''){
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "INSERT INTO imagen (IdTipoImagen,Cantidad, Ubicacion ,checkbox, Comentario, FotoImagen, IdCedula) VALUES (?,?,?,?,?,?,?)",
                                    [tipoimagen, cantidad, ubicacion, radio,comentario, file_data, icedula ],
                                    function(tx2, results){
                                       //Extraer el ultimo registro
                                        databaseHandler.db.transaction(
                                        function(tx3){
                                            tx3.executeSql(
                                            "Select MAX(IdImagen) as Id from imagen",
                                            [],
                                            function(tx4, results){
                                                var length = results.rows.length;
                                                var item = results.rows.item(0);
                                                var IdCEq = item.Id;
                                                //Consultar el producto
                                                databaseHandler.db.transaction(
                                                    function(tx5){
                                                        tx5.executeSql(
                                                            "Select * from imagen where IdImagen = ?",
                                                            [IdCEq],
                                                            function(tx5, results){
                                                                var length = results.rows.length;
                                                                var item2 = results.rows.item(0);
                                                                if(item2.IdTipoImagen == 1){ var TipoImagen = "Wallchart"; }
                                                                if(item2.IdTipoImagen == 2){ var TipoImagen = "Etiqueta"; }
                                                                if(item2.IdTipoImagen == 3){ var TipoImagen = "Imagen del cliente"; }
                                                                if(item2.IdTipoImagen == 4){ var TipoImagen = "Carpeta del cliente"; }
                                                                if(item2.IdTipoImagen == 5){ var TipoImagen = "Concentraci&oacute;n de Equipos"; }
                                                                if(item2.checkBox == 1){ var Estado ="Imagen en buen estado"; }
                                                                if(item2.checkBox == 2){ var Estado ="Imagen en mal estado"; }
                                                                $("#tablaimagen tbody").append("<tr id='fila"+ item2.IdImagen +"'><td><a href='#' onclick='eliminarFila("+ item2.IdImagen +", 2);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></td><td text-align: center;><img src='"+item2.FotoImagen+"' width='60px'/></td><td text-align: center;>" + TipoImagen + "</td><td text-align: center;>" + item2.Cantidad + "</td><td  text-align: center;>"+ item2.Ubicacion+"</td><td  text-align: center;>"+ Estado + "</td><td  text-align: center;>"+ item2.Comentario + "</td></tr>");
                                                                $("#cantidad").val('');
                                                                $("#ubicacion").val('');
                                                                $("#comentario").val('');
                                                                $('#imagenC').val('');

                                                                $("#cantidad").css("background-color", "#ffffff");
                                                                $("#ubicacion").css("background-color", "#ffffff");
                                                                $("#comentario").css("background-color", "#ffffff");
                                                                $("#tipoimagen").css("background-color", "#ffffff");
                                                                document.getElementById("BradioI").checked = false;
                                                                document.getElementById("MradioI").checked = false;
                                                                document.ready = document.getElementById("tipoimagen").value = '0';
                                                                app.preloader.hide();
                                                            },
                                                            function(tx5, error){
                                                                console.log("Error al guardar registro: " + error.message);
                                                            }
                                                        );
                                                    },
                                                    function(error){},
                                                    function(){}
                                                );
                                                    //Fin de consulgtar el producto
                                            },
                                            function(tx4, error){
                                                console.log("Error al guardar registro: " + error.message);
                                            }
                                        );
                                        },
                                        function(error){},
                                        function(){}
                                    ); //FIN DE Extraer el ultimo registro
                                       app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                    },
                                    function(tx2, error){
                                        console.log("Error al guardar el imagen: " + error.message);

                                    }
                                );
                            },
                            function(error){},
                            function(){}
                            );
                    } else {
                        app.dialog.alert('El campo: Comentario. Es requerido.', 'Alerta!');
                        app.preloader.hide();
                    }
                } else {
                    app.dialog.alert('El campo: Ubicacion. Es requerido.', 'Alerta!');
                    app.preloader.hide();
                }
            }else {
                app.dialog.alert('El campo: Cantidad. Es requerido.', 'Alerta!');
                app.preloader.hide();
            }
            }
        }else {
            app.dialog.alert('Favor de seleccionar en que estado se encuentra. Es requerido.', 'Alerta!');
            app.preloader.hide();
        }
    } else {
        app.dialog.alert('El campo: Tipo. Es requerido.', 'Alerta!');
        app.preloader.hide();
    }

}
//entrenamiento
function gentrenamiento(){
    app.preloader.show('blue');
    var icedula = localStorage.getItem("IdCedula");
    var file_data = $('#imagenC').val();
    var personaCapacitada = $("#personaCapacitada").val();
    var puesto  = $("#puesto").val();
    var temaCapacitacion = $("#temaCapacitacion").val()
    var comentario = $("#comentario").val();
    if($("#personaCapacitada").val() != '' ){
        if($("#puesto").val() != ''){
            if($("#temaCapacitacion").val() != ''){
                if($("#comentario").val() != ''){
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "INSERT INTO entrenamiento (IdCedula,PersonaCapacitada, Puesto, TemaCapacitacion, Comentario, ImagenFirma) VALUES (?,?,?,?,?,?)",
                                    [icedula, personaCapacitada, puesto, temaCapacitacion, comentario, file_data ],
                                    function(tx2, results){
                                       //Extraer el ultimo registro
                                        databaseHandler.db.transaction(
                                        function(tx3){
                                            tx3.executeSql(
                                                "Select MAX(IdEntrenamiento) as Id from entrenamiento",
                                                [],
                                                function(tx4, results){
                                                    var length = results.rows.length;
                                                    var item = results.rows.item(0);
                                                    var IdCEq = item.Id;
                                                    //Consultar el producto
                                                    databaseHandler.db.transaction(
                                                        function(tx5){
                                                            tx5.executeSql(
                                                                "Select * from entrenamiento where IdEntrenamiento = ?",
                                                                [IdCEq],
                                                                function(tx5, results){
                                                                    var length = results.rows.length;
                                                                    var item2 = results.rows.item(0);
                                                                    app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                                    $("#personaCapacitada").val('');
                                                                    $("#puesto").val('');
                                                                    $("#temaCapacitacion").val('');
                                                                    $("#comentario").val('');
                                                                    $('#imagenC').val('');
                                                                    $("#tablaE tbody").append("<tr id='fila"+ item2.IdEntrenamiento +"'><td><a href='#' onclick='eliminarFila("+ item2.IdEntrenamiento +", 3);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></a></td><td><img src='"+item2.ImagenFirma+"' width='60px'/></td><td text-align: center;>" + item2.PersonaCapacitada+ "</td><td text-align: center;>" + item2.Puesto + "</td><td text-align: center;>" + item2.TemaCapacitacion + "</td><td text-align: center;>" + item2.Comentario + "</td></tr>");
                                                                    $("#personaCapacitada").css("background-color", "#FFFFFF");
                                                                    $("#puesto").css("background-color", "#FFFFFF");
                                                                    $("#temaCapacitacion").css("background-color", "#FFFFFF");
                                                                    $("#comentario").css("background-color", "#FFFFFF");
                                                                    app.preloader.hide();

                                                                },
                                                                function(tx5, error){
                                                                    console.log("Error al guardar registro: " + error.message);
                                                                    app.preloader.hide();
                                                                }
                                                            );
                                                        },
                                                        function(error){},
                                                        function(){}
                                                    );
                                                    //Fin de consulgtar el producto
                                                },
                                                function(tx4, error){
                                                    console.log("Error al guardar registro: " + error.message);
                                                }
                                            );
                                        },
                                        function(error){},
                                        function(){}
                                        ); //FIN DE Extraer el ultimo registro
                                    },
                                    function(tx2, error){
                                        console.log("Error al guardar el imagen: " + error.message);
                                    }
                                );
                            },
                            function(error){},
                            function(){}
                        );

                } else{
                    app.dialog.alert('El campo: Comentario. Es requerido.', 'Alerta!');
                    app.preloader.hide();
                }
            } else{
                app.dialog.alert('El campo: Tema capacitaci\u00f3n. Es requerido.', 'Alerta!');
                app.preloader.hide();
            }
        } else{
           app.dialog.alert('El campo: Puesto. Es requerido.', 'Alerta!');
           app.preloader.hide();
        }
    }else{
        app.dialog.alert('El campo: Persona capacitada. Es requerido.', 'Alerta!');
        app.preloader.hide();
    }
}

//pantalla vertical pedido
function vertical(){
    screen.orientation.lock('portrait');
        screen.orientation.unlock();
}



//voltear
    function landsca(){
        var $sigdiv = $("#signature").jSignature({'UndoButton':true})
        screen.orientation.lock('landscape');
        //screen.orientation.unlock();
        }
//guardar la firma
    function gfirma(){
        var $sigdiv = $("#signature").jSignature({'UndoButton':true})
        var data2 = $sigdiv.jSignature('getData', 'default');
        $("#signate").val(data2);
        screen.orientation.lock('portrait');
        screen.orientation.unlock();

        $('#ImagenFirmaView').attr('src', data2);
        $('#VolverFirmar').html("*Vover a firmar*");
     }
//GUARDAR NUEVOS PRODUCTOS
function GuardarNuevoP(){
    app.preloader.show('blue');
    var cod = $("#autocomplete-dropdown-ajax").val();
    var cod1 = cod.split('-');
    var codigo = cod1[0];
    var Descripcion = cod1[1];
    var icedula = localStorage.getItem("IdCedula");
    var usop = $("#usop").val();

    if(codigo == ""){
        app.dialog.alert('El campo: C\u00f3digo. Es requerido.', 'Alerta!');
        app.preloader.hide();
    }else if(usop == ""){
        app.dialog.alert('El campo: Uso. Es requerido.', 'Alerta!');
        app.preloader.hide();
    }else {
        databaseHandler.db.transaction(
            function(tx1){
                tx1.executeSql(
                    "INSERT INTO prodnvos (IdCedula,IdPrd, Uso, Descripcion) VALUES (?,?,?,?)",
                    [icedula, codigo, usop, Descripcion],
                    function(tx2, results){
                       //Extraer el ultimo registro
                        databaseHandler.db.transaction(
                        function(tx3){
                            tx3.executeSql(
                                "Select MAX(IdNvoP) as Id from prodnvos",
                                [],
                                function(tx4, results){
                                    var length = results.rows.length;
                                    var item = results.rows.item(0);
                                    var IdCEq = item.Id;
                                    //Consultar el producto
                                      databaseHandler.db.transaction(
                                        function(tx5){
                                            tx5.executeSql(
                                                "Select * from prodnvos where IdNvoP = ?",
                                                [IdCEq],
                                                function(tx5, results){
                                                    var length = results.rows.length;
                                                    var item2 = results.rows.item(0);
                                                    app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                     $("#tablaPNvo1 tbody").append("<tr id='fila"+ item2.IdNvoP +"'><td><a href='#' onclick='eliminarFila("+ item2.IdNvoP +", 6);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></a></td><td text-align: center;>" + item2.IdPrd+ "</td><td text-align: center;>" + item2.Descripcion + "</td><td text-align: center;>" + item2.Uso + "</td></tr>");

                                                     $("#tabladilucion dilucionbody").append("");
                                                     $("#usop").val('');
                                                     $("#descripcion").val('');
                                                    $("#usop").val('');
                                                    $("#alta").html('');
                                                    $("#media").html('');
                                                    $("#baja").html('');
                                                    $("#usodirecto").html('');

                                                    app.preloader.hide();
                                                },
                                                function(tx5, error){
                                                    console.log("Error al guardar registro: " + error.message);
                                                }
                                            );
                                        },
                                        function(error){},
                                        function(){}
                                    );
                                    //Fin de consulgtar el producto
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    ); //FIN DE Extraer el ultimo registro

                    },
                    function(tx2, error){
                        console.log("Error al guardar el imagen: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
    }
}



//ELIMINAR
function eliminarFila(index, opc) {
    if(opc == 1) { //Eliminar Equipo
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "DELETE FROM ced_equipos WHERE IdCedproductos = ?",
                    [index],
                    function(tx, results){
                         app.dialog.alert('El registro se elimino satisfactoriamente.', 'Aviso');
                         $("#fila" + index).remove();
                         app.preloader.hide();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);
                        app.preloader.hide();
                    }
                );
            },
            function(error){},
            function(){}
        );
    }
    if(opc == 2) { //Eliminar imagen
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "DELETE FROM imagen WHERE IdImagen = ?",
                    [index],
                    function(tx, results){
                         app.dialog.alert('El registro se elimino satisfactoriamente.', 'Aviso');
                         $("#fila" + index).remove();
                         app.preloader.hide();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);
                        app.preloader.hide();

                    }
                );
            },
            function(error){},
            function(){}
        );
    }
    if(opc == 3) { //Eliminar entrenamiento
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "DELETE FROM entrenamiento WHERE IdEntrenamiento = ?",
                    [index],
                    function(tx, results){
                         app.dialog.alert('El registro se elimino satisfactoriamente.', 'Aviso');
                         $("#fila" + index).remove();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);

                    }
                );
            },
            function(error){},
            function(){}
        );
    }

    if(opc == 4) { //Eliminar observaciones toma inventarios
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "DELETE FROM tomaInventario WHERE IdTomaInv = ?",
                    [index],
                    function(tx, results){
                         app.dialog.alert('El registro se elimino satisfactoriamente.', 'Aviso');
                         $("#fila" + index).remove();
                         app.preloader.hide();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);
                        app.preloader.hide();
                    }
                );
            },
            function(error){},
            function(){}
        );
    }
    if(opc == 5) { //Eliminar pedido
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "DELETE FROM pedido WHERE IdPrdInven = ?",
                    [index],
                    function(tx, results){
                         app.dialog.alert('El registro se elimino satisfactoriamente.', 'Aviso');
                         $("#fila" + index).remove();
                         app.preloader.hide();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);
                        app.preloader.hide();
                    }
                );
            },
            function(error){},
            function(){}
        );
    }
    if(opc == 6) { //Eliminar producto nuevo
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "DELETE FROM prodnvos WHERE IdNvoP = ?",
                    [index],
                    function(tx, results){
                         app.dialog.alert('El registro se elimino satisfactoriamente.', 'Aviso');
                         $("#fila" + index).remove();
                         app.preloader.hide();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);
                        app.preloader.hide();
                    }
                );
            },
            function(error){},
            function(){}
        );
    }

    if(opc == 7) { //Eliminar Seguimiento
        databaseHandler.db.transaction(
            function(tx){

                tx.executeSql(
                    "DELETE FROM Seguimiento WHERE IdSeguimiento = ?",
                    [index],
                    function(tx, results){
                         app.dialog.alert('El registro se elimino satisfactoriamente.', 'Aviso');
                         $("#fila" + index).remove();
                         app.preloader.hide();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);
                        app.preloader.hide();

                    }
                );
            },
            function(error){},
            function(){}
        );
    }
}

//CIERRE
function gcierre(){
    app.preloader.show('blue');
    var IdCte = localStorage.getItem("IdCte");
    var IdCed = localStorage.getItem("IdCedula");
    var file_data = $('#signate').val();
    var estre = $("#eval").val();
    var ccte = $("#text2").val();
    var envio = $('input[name="estado"]:checked').val();
    var geo = $("#geolocation").val();
    var NombreFirma = $("#NombreFirma").val();

    var NombreCuenta = $("#NombreCuenta").val();
    var CorreoCuenta = $("#CorreoCuenta").val();

    var nombre = document.getElementById('cli').innerHTML;
    var ArCadena = nombre.split(' ');
    var cliente = ArCadena[0];
    var ClienteMin = cliente.toLowerCase();

    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql(
                "SELECT IdCedula FROM cierre WHERE IdCedula = ?",
                [IdCed],
                function(tx1, results){
                    var length = results.rows.length;

                    if(length > 0){
                        databaseHandler.db.transaction(
                            function(tx){
                                tx.executeSql(
                                    "UPDATE cierre SET eval = ?,cfirma = ?,coment = ?,NombreFirma = ?, NombreCuenta = ?, CorreoCuenta = ? WHERE IdCedula = ?",
                                    [estre,file_data,ccte,NombreFirma,NombreCuenta,CorreoCuenta,IdCed],
                                    function(tx, results){
                                        $("#adios").html("<input type='hidden' id='imagenC' name='imagenC'/> <span style='font-weight: bold; color: #8B0000;'>Ya me voy</span><br /><br /><a href='#' style='background-color: white; border: none; outline:none; width: 15%;' onclick='capturePhoto();'><img src='img/cam.png' width='40px' /></a> <br /><input type='image' name='smallImage' style='display:none; margin: 0 auto;margin: 0 auto; width:90px; height:120px;' id='smallImage' src='' /><br><br><label style='font-size: 12px;'><strong>Comentario de la calificación:</strong></label><center><textarea rows='5' style='color: grey;' disabled>"+ ccte +"</textarea></center><br><br><a href='#' onclick='gcierref();' style='border: none; outline:none;'><img src='img/save2.png' width='50px' /></a>");
                                        app.preloader.hide();
                                        app.preloader.hide();
                                    },
                                    function(tx, error){
                                        console.log("add client error: " + error.message);
                                        app.dialog.alert('Error al enviar..', 'Error');
                                        app.preloader.hide();
                                    }
                                );
                            },
                            function(error){},
                            function(){}
                        );
                    }else{
                        if(estre == 0){
                             app.dialog.alert('Favor de evaluar la visita.', 'Importante');
                             app.preloader.hide();
                        }else if(estre == 1 || estre ==2 || estre ==3 || (ClienteMin == 'dominos')){
                            if(ccte == ''){
                               app.dialog.alert('Favor de colocar sus comentarios.', 'Importante');
                               app.preloader.hide();
                            }  else {
                                databaseHandler.db.transaction(
                                    function(tx1){
                                        tx1.executeSql(
                                            "INSERT INTO cierre (IdCedula,eval,cfirma,geolocalizacion,Solestado,coment,NombreFirma,NombreCuenta,CorreoCuenta) VALUES (?,?,?,?,?,?,?,?,?)",
                                            [IdCed,estre,file_data,geo,envio,ccte,NombreFirma,NombreCuenta,CorreoCuenta],
                                            function(tx1, results){

                                                $('.icon-back').remove();
                                                $('.back').remove();
                                                $("#adios").html("<input type='hidden' id='imagenC' name='imagenC'/> <span style='font-weight: bold; color: #8B0000;'>Ya me voy</span><br /><br /><a href='#' style='background-color: white; border: none; outline:none; width: 15%;' onclick='capturePhoto();'><img src='img/cam.png' width='40px' /></a> <br /><input type='image' name='smallImage' style='display:none; margin: 0 auto;margin: 0 auto; width:90px; height:120px;' id='smallImage' src='' /><br><br><label style='font-size: 12px;'><strong>Comentario de la calificación:</strong></label><center><textarea rows='5' style='color: grey;' disabled>"+ ccte +"</textarea></center><br><br><a href='#' onclick='gcierref();' style='border: none; outline:none;'><img src='img/save2.png' width='50px' /></a>");
                                                app.preloader.hide();
                                                 $("#signate").val("");
                                            },
                                            function(tx1, error){
                                                console.log("add client error: " + error.message);
                                                app.preloader.hide();
                                            }
                                        );
                                    }
                                    );
                                }
                            }else {
                                databaseHandler.db.transaction(
                                    function(tx1){
                                        tx1.executeSql(
                                            "INSERT INTO cierre (IdCedula,eval,cfirma,geolocalizacion,Solestado,coment,NombreFirma,NombreCuenta,CorreoCuenta) VALUES (?,?,?,?,?,?,?,?,?)",
                                            [IdCed,estre,file_data,geo,envio,ccte,NombreFirma,NombreCuenta,CorreoCuenta],
                                            function(tx1, results){

                                                $('.icon-back').remove();
                                                $('.back').remove();
                                                $("#adios").html("<input type='hidden' id='imagenC' name='imagenC'/> <span style='font-weight: bold; color: #8B0000;'>Ya me voy</span><br /><br /><a href='#' style='background-color: white; border: none; outline:none; width: 15%;' onclick='capturePhoto();'><img src='img/cam.png' width='40px' /></a> <br /><input type='image' name='smallImage' style='display:none; margin: 0 auto;margin: 0 auto; width:90px; height:120px;' id='smallImage' src='' /><br><br><label style='font-size: 12px;'><strong>Comentario de la calificación:</strong></label><center><textarea rows='5' style='color: grey;' disabled>"+ ccte +"</textarea></center><br><br><a href='#' onclick='gcierref();' style='border: none; outline:none;'><img src='img/save2.png' width='50px' /></a>");
                                                app.preloader.hide();
                                            },
                                            function(tx1, error){
                                                console.log("add client error: " + error.message);
                                                app.preloader.hide();
                                            }
                                        );
                                    }
                                    );
                            }
                    }
                },
                function(tx1, error){
                    console.log("add client error: " + error.message);
                    app.preloader.hide();
                }
            );
        }
    );
}




//CIERRE 2DA PARTE
function gcierref(){
    app.preloader.show('blue');
    var IdCte = localStorage.getItem("IdCte");
    var IdCed = localStorage.getItem("IdCedula");
    var imgF = $("#imagenC").val();
    var file_data = $('#imagenC').val();
    var env = 1;
    var fecha = new Date();
    var fFinal = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
    //VALIDACION DE CAMPOS
    if(file_data != ''){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "UPDATE cierre SET fcierre = ?, envio = ?, FechaCierre = ? WHERE IdCedula = ?",
                    [ imgF, env , fFinal ,IdCed ],
                    function(tx, results){
                        app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                        window.localStorage.removeItem("IdCedula");
                        window.localStorage.removeItem("IdCte");
                        window.localStorage.removeItem("IdInventario");
                        app.preloader.hide();
                        window.location.href = "./menu.html";
                        app.preloader.hide();
                    },
                    function(tx, error){
                        console.log("add client error: " + error.message);
                        app.dialog.alert('Error al enviar..', 'Error');
                        app.preloader.hide();
                    }
                );
            },
            function(error){},
            function(){}
        );
    }else{
        app.dialog.alert('El campo: Fotograf\u00eda. Es requerido.', 'Alerta!');
        app.preloader.hide();
    }
}



function llevar(cte, idcedula){
    app.dialog.alert(" Puede seguir usando la aplicacion","Enviando.");
    databaseHandler.db.transaction(
    function(tx7){
        tx7.executeSql(
            "UPDATE cierre SET envio = 2 WHERE IdCedula = ?",
            [idcedula],
            function(tx7, results){

            }
        );
    }
);
var coche        = new Array();
          var datosce      = new Array();
          var datos        = new Array();
          var datos1       = new Array();
          var datosen      = new Array();
          var datosal      = new Array();
          var datospe      = new Array();
          var datospn      = new Array();
          var datosci      = new Array();
          var datosop      = new Array();
          var datosAct     = new Array();
          var datosCues    = new Array();

          var datosResumen = new Array();

          var ce   = 0;
          var c    = 0;
          var F    = 0;
          var en   = 0;
          var al   = 0;
          var pe   = 0;
          var pn   = 0;
          var ci   = 0;
          var op   = 0;
          var Act  = 0;
          var Cues = 0;

          var res = 0;

          var fecha = new Date();
          var Anio = fecha.getFullYear();
          var Mes = fecha.getMonth();

          databaseHandler.db.transaction(
          function(tx){
            tx.executeSql("SELECT * FROM Cedula INNER JOIN Clientes ON Cedula.IdCte = Clientes.IdCte WHERE Cedula.IdCedula = ?",[idcedula],
            function(tx, results){
              //alert("Entro a Enviar en automatico el AR");
              var length = results.rows.length;
              for(var i = 0; i< length; i++){
                var item1 = results.rows.item(i);
                datosce[ce] = {'Valor':ce,'IdCedula':item1.IdCed,'IdUsuario':item1.IdUsuario,'IdCte':item1.IdCte,'FechaCaptura':item1.FechaCaptura,'Imagen':item1.Imagen,'geolocation': item1.geolocation,'NomComercial': item1.NomComercial,'NomContacto': item1.NomContacto,'Telefono': item1.Telefono,'Email': item1.Email,'Cliente':item1.Cliente,'TipoT':'1'};
                ce++;
              }

              databaseHandler.db.transaction(
                function(tx2){
                  tx2.executeSql("SELECT * FROM ced_equipos WHERE IdCedula = ?",[idcedula],
                    function(tx2, results){
                     var form_dataE = new FormData();
                     var length = results.rows.length;
                     var vEqu = 0;
                      for(var i = 0; i< length; i++){
                          var item3 = results.rows.item(i);
                          datos[c] = {'Valor':c, 'IdCedula': item3.IdCed, 'IdPrd': item3.IdPrd, 'Cantidad':item3.Cantidad,'Ubicacion': item3.Ubicacion,'ImgPrd':item3.ImgPrd,'Comentario':item3.Comentario,'Tickets':item3.Tickets,'FechaRegistro':item3.FechaRegistro,'checkBox':item3.checkBox,'TipoT': '2'};
                          c++;
                          vEqu++;
                      }
                      databaseHandler.db.transaction(
                        function(tx){
                          tx.executeSql("SELECT * FROM imagen WHERE IdCedula = ?",[idcedula],
                            function(tx, results){
                              var length = results.rows.length;
                              for(var i = 0; i< length; i++){
                                var item4 = results.rows.item(i);
                                //datos1[F] = {'Valor':F,'Ubicacion':item3.Ubicacion, 'Cantidad': item3.Cantidad, 'img': item3.IdCedula, 'TipoT': '2'};
                                datos1[F] = {'Valor':F,'IdCedula': item4.IdCed,'IdTipoImagen': item4.IdTipoImagen,'Cantidad': item4.Cantidad,'Ubicacion': item4.Ubicacion,'Comentario': item4.Comentario,'FotoImagen': item4.FotoImagen,'checkBox': item4.checkBox,'TipoT': '3'};
                                F++;
                              }
                              databaseHandler.db.transaction(
                                function(tx){
                                  tx.executeSql("SELECT * FROM entrenamiento WHERE IdCedula = ?",[idcedula],
                                    function(tx, results){
                                      var length = results.rows.length;
                                      for(var i = 0; i< length; i++){
                                        var item4 = results.rows.item(i);
                                        datosen[en] = {'Valor':en,'IdCedula': item4.IdCed,'PersonaCapacitada': item4.PersonaCapacitada,'TemaCapacitacion': item4.TemaCapacitacion,'Comentario': item4.Comentario,'ImagenFirma': item4.ImagenFirma,'Puesto': item4.Puesto,'TipoT': '4'};
                                        en++;
                                      }
                                      databaseHandler.db.transaction(
                                        function(tx){
                                          tx.executeSql("SELECT * FROM tomaInventario WHERE IdCedula = ?",[idcedula],
                                            function(tx, results){
                                              var length = results.rows.length;
                                              for(var i = 0; i< length; i++){
                                                var item4 = results.rows.item(i);
                                                 datosal[al] = {'Valor':al,'IdCedula': item4.IdCed,'ImgAlmacen': item4.ImgAlmacen,'Observaciones': item4.Observaciones,'TipoT': '5'};
                                                 al++;
                                              }
                                              databaseHandler.db.transaction(
                                                function(tx){
                                                  tx.executeSql("SELECT * FROM pedido WHERE IdCedula = ?",[idcedula],
                                                    function(tx, results){
                                                      var length = results.rows.length;
                                                      for(var i = 0; i< length; i++){
                                                        var item4 = results.rows.item(i);
                                                        datospe[pe] = {'Valor':pe,'IdCedula': item4.IdCed,'IdCte':item4.IdCte,'IdPrd': item4.IdPrd,'Descripcion':item4.Descripcion,'Inventario': item4.Inventario,'CanSolicitada':item4.CanSolicitada,'Identificador':item4.Identificador,'Observaciones':item4.Observaciones,'Comentario': item4.Comentario,'TipoT': '6'};
                                                        pe++;
                                                      }
                                                      databaseHandler.db.transaction(
                                                        function(tx){
                                                          tx.executeSql("SELECT * FROM prodnvos WHERE IdCedula = ?",[idcedula],
                                                            function(tx, results){
                                                              var length = results.rows.length;
                                                              for(var i = 0; i< length; i++){
                                                                var item4 = results.rows.item(i);
                                                                 datospn[pn] = {'Valor':pn,'IdCedula': item4.IdCed,'IdPrd': item4.IdPrd,'Uso':item4.Uso,'Productos': item4.Producto,'Descripcion':item4.Descripcion,'Alta':item4.Alta,'Media':item4.Media,'Baja':item4.Baja,'UsoDirecto':item4.UsoDirecto,'TipoT': '7'};
                                                                 pn++;
                                                              }
                                                              databaseHandler.db.transaction(
                                                                function(tx){
                                                                  tx.executeSql("SELECT * FROM cierre WHERE IdCedula = ?",[idcedula],
                                                                    function(tx, results){
                                                                      var length = results.rows.length;

                                                                      for(var i = 0; i< length; i++){
                                                                        var item4 = results.rows.item(i);
                                                                        datosci[ci] = {'Valor':ci,'IdCedula': item4.IdCed,'eval': item4.eval,'cfirma':item4.cfirma,'geolocalizacion': item4.geolocalizacion,'Solestado':item4.Solestado,'coment':item4.coment,'fcierre':item4.fcierre,'envio':item4.envio,'TipoT': '8', 'FechaCierre': item4.FechaCierre, 'NombreFirma': item4.NombreFirma, 'NombreCuenta': item4.NombreCuenta, 'CorreoCuenta': item4.CorreoCuenta};
                                                                        ci++;
                                                                       }
                                                                       databaseHandler.db.transaction(
                                                                        function(tx){
                                                                          tx.executeSql("SELECT * FROM ObservacionesPedido WHERE IdCedula = ?",[idcedula],
                                                                            function(tx, results){
                                                                              var length = results.rows.length;
                                                                              for(var i = 0; i< length; i++){
                                                                                var item4 = results.rows.item(i);
                                                                                 datosop[op] = {'Valor':op,'IdCedula': item4.IdCed,'Observaciones':item4.Observaciones,'TipoT': '9'};
                                                                                 op++;
                                                                              }
                                                                              databaseHandler.db.transaction(
                                                                                function(tx){
                                                                                  tx.executeSql("SELECT IdUsuario, Fecha, RFC FROM Actualizaciones ORDER BY IdActualizacion DESC LIMIT 1",[],
                                                                                    function(tx, results){
                                                                                      var length = results.rows.length;
                                                                                      for(var i = 0; i< length; i++){
                                                                                        var item4 = results.rows.item(i);
                                                                                         datosAct[Act] = {'Valor':Act,'IdUsuario': item4.IdUsuario,'Fecha':item4.Fecha,'RFC':item4.RFC,'TipoT': '10'};
                                                                                         Act++;
                                                                                      }
                                                                                      databaseHandler.db.transaction(
                                                                                        function(tx){
                                                                                          tx.executeSql("SELECT * FROM Cuestionarios WHERE IdCedula = ?",[idcedula],
                                                                                            function(tx, results){
                                                                                              var length = results.rows.length;
                                                                                              for(var i = 0; i< length; i++){
                                                                                                var item4 = results.rows.item(i);
                                                                                                 datosCues[Cues] = {'Valor':Cues,'IdCedula': item4.IdCedula,'IdCte':item4.IdCte,'IdPregunta':item4.IdPregunta,'Checkbox':item4.Checkbox,'Texto':item4.Texto,'NivelRiesgo':item4.NivelRiesgo,'IdCuestionario':item4.IdCuestionario,'Division':item4.Division,'Evidencia':item4.Evidencia,'TipoT': '10'};
                                                                                                 Cues++;
                                                                                              }
                                                                                                $.ajax({
                                                                                                  type: "POST",
                                                                                                  async : true,
                                                                                                  url: "http://www.appbennetts.com/VIC/ProcesosVIC7/GuardarVIC7.php",
                                                                                                  dataType: 'html',
                                                                                                  data: {'arrayce': JSON.stringify(datosce),'array': JSON.stringify(datos), 'array1': JSON.stringify(datos1),'arrayen': JSON.stringify(datosen),'arrayal': JSON.stringify(datosal),'arraype': JSON.stringify(datospe),'arraypn': JSON.stringify(datospn),'arrayci': JSON.stringify(datosci),'arrayop': JSON.stringify(datosop),'arrayAct': JSON.stringify(datosAct),'arrayCues': JSON.stringify(datosCues)},
                                                                                                  success: function(respuesta){

                                                                                                    var respu1 = respuesta.split("._.");
                                                                                                    var dat1 = respu1[0];
                                                                                                    var dat2 = respu1[1];

                                                                                                    if(dat1 == "CEDULA"){
                                                                                                      if(dat2 > 0){
                                                                                                        databaseHandler.db.transaction(
                                                                                                          function(tx7){
                                                                                                            tx7.executeSql("UPDATE cierre SET envio = 3 WHERE IdCedula = ?",[idcedula],
                                                                                                              function(tx7, results){
                                                                                                              }
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                              });
                                                                                              },
                                                                                           function(tx, error){
                                                                                             console.log("add client error: " + error.message);
                                                                                             app.dialog.alert('Error al enviar..', 'Error');
                                                                                             app.preloader.hide();
                                                                                           }
                                                                                          );
                                                                                        },
                                                                                        function(error){},
                                                                                        function(){}
                                                                                      );
                                                                                      },
                                                                                   function(tx, error){
                                                                                     console.log("add client error: " + error.message);
                                                                                     app.dialog.alert('Error al enviar..', 'Error');
                                                                                     app.preloader.hide();
                                                                                   }
                                                                                  );
                                                                                },
                                                                                function(error){},
                                                                                function(){}
                                                                              );
                                                                           },
                                                                           function(tx, error){
                                                                             console.log("add client error: " + error.message);
                                                                             app.dialog.alert('Error al enviar..', 'Error');
                                                                             app.preloader.hide();
                                                                           }
                                                                          );
                                                                        },
                                                                        function(error){},
                                                                        function(){}
                                                                      );
                                                                    },
                                                                    function(tx, error){
                                                                      console.log("add client error: " + error.message);
                                                                      app.dialog.alert('Error al enviar..', 'Error');
                                                                      app.preloader.hide();
                                                                    }
                                                                  );
                                                                },
                                                                function(error){},
                                                                function(){}
                                                              );
                                                            },
                                                            function(tx, error){
                                                              console.log("add client error: " + error.message);
                                                              app.dialog.alert('Error al enviar..', 'Error');
                                                              app.preloader.hide();
                                                            }
                                                          );
                                                        },
                                                        function(error){},
                                                        function(){}
                                                      );
                                                    },
                                                    function(tx, error){
                                                      console.log("add client error: " + error.message);
                                                      app.dialog.alert('Error al enviar..', 'Error');
                                                      app.preloader.hide();
                                                    }
                                                  );
                                                },
                                                function(error){},
                                                function(){}
                                              );
                                            },
                                            function(tx, error){
                                              console.log("add client error: " + error.message);
                                              app.dialog.alert('Error al enviar..', 'Error');
                                              app.preloader.hide();
                                            }
                                          );
                                        },
                                        function(error){},
                                        function(){}
                                      );
                                    },
                                    function(tx, error){
                                      console.log("add client error: " + error.message);
                                      app.dialog.alert('Error al enviar..', 'Error');
                                      app.preloader.hide();
                                    }
                                  );
                                },
                                function(error){},
                                function(){}
                              );
                             },
                             function(tx, error){
                              console.log("add client error: " + error.message);
                              app.dialog.alert('Error al enviar..', 'Error');
                              app.preloader.hide();
                             }
                            );
                          },
                          function(error){},
                          function(){}
                          );
                          //alert(coche["Ubicacion"]);
                        },
                        function(tx, error){
                          console.log("add client error: " + error.message);
                          app.dialog.alert('Error al enviar..', 'Error');
                          app.preloader.hide();
                        }
                      );
                    },
                    function(error){},
                    function(){}
                  );
                },
                function(tx, error){
                  console.log("add client error: " + error.message);
                  app.dialog.alert('Error al enviar..', 'Error');
                  app.preloader.hide();
                }
              );
            },
            function(error){},
            function(){}
          );
}





function llevarVenta(IdProyecto, IdCedulaV){
    app.dialog.alert(" Puede seguir usando la aplicacion","Enviando.");
    databaseHandler.db.transaction(
        function(tx7){
            tx7.executeSql(
                "UPDATE VisitasVentas SET envio = 2 WHERE IdCedulaV = ?",
                [IdCedulaV],
                function(tx7, results){

                }
            );
        }
    );
    var datospros = new Array();
    var datosproy = new Array();
    var datosven = new Array();
    var datosminu = new Array();
    var pros = 0;
    var proy = 0;
    var ven = 0;
    var minu = 0;
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "SELECT * FROM Prospectos WHERE IdProyecto = ? AND IdCedulaV = ? ;",
                [IdProyecto,IdCedulaV],
                function(tx, results){
                    var length = results.rows.length;

                    for(var i = 0; i< length; i++){
                        var item4 = results.rows.item(i);
                         datospros[pros] = {'Valor':pros,'IdProyecto': item4.IdProyecto,'IdCedulaV': item4.IdCedulaV,'NombreRecibe':item4.NombreRecibe,'PuestoRecibe':item4.PuestoRecibe,'Telefono':item4.Telefono,'Correo':item4.Correo,'Actividades':item4.Actividades,'FirmaProspecto':item4.FirmaProspecto,'FotoProspecto':item4.FotoProspecto, 'ActividadesNum': item4.ActividadesNum};
                         pros++;
                   }
                   databaseHandler.db.transaction(
                        function(tx){
                            tx.executeSql(
                                "SELECT * FROM Proyectos WHERE IdProyecto = ?;",
                                [IdProyecto],
                                function(tx, results){
                                    var length = results.rows.length;

                                    for(var i = 0; i< length; i++){
                                        var item5 = results.rows.item(i);
                                         datosproy[proy] = {'Valor':proy,'IdProyecto': item5.IdProyecto,'FechaCreacion': item5.FechaCreacion,'NombreProyecto':item5.NombreProyecto,'IdUsuario':item5.IdUsuario,'Estatus':item5.Estatus,'Potencial':item5.Potencial,'SegmentoProyecto':item5.SegmentoProyecto};
                                         proy++;
                                   }
                                   databaseHandler.db.transaction(
                                        function(tx){
                                            tx.executeSql(
                                                "SELECT * FROM VisitasVentas WHERE IdCedulaV = ? AND IdProyecto = ?;",
                                                [IdCedulaV, IdProyecto],
                                                function(tx, results){
                                                    var length = results.rows.length;

                                                    for(var i = 0; i< length; i++){
                                                        var item5 = results.rows.item(i);
                                                         datosven[ven] = {'Valor':ven,'IdCedulaV':item5.IdCedulaV,'IdProyecto': item5.IdProyecto,'FechaVisita': item5.FechaVisita,'Imagen':item5.Imagen,'Geolocalizacion':item5.Geolocalizacion,'envio':item5.envio,'IdUsuario':item5.IdUsuario,'FechaCierre':item5.FechaCierre};
                                                         ven++;
                                                   }
                                                   databaseHandler.db.transaction(
                                                        function(tx){
                                                            tx.executeSql(
                                                                "SELECT * FROM Minutas WHERE IdCedulaV = ? AND IdProyecto = ?;",
                                                                [IdCedulaV, IdProyecto],
                                                                function(tx, results){
                                                                    var length = results.rows.length;

                                                                    for(var i = 0; i< length; i++){
                                                                        var item6 = results.rows.item(i);
                                                                         datosminu[minu] = {'Valor':minu,'IdCedulaV':item6.IdCedulaV,'IdProyecto': item6.IdProyecto,'Tema': item6.Tema,'Comrpomiso':item6.Compromiso,'FechaMinuta':item6.FechaMinuta,'NumeroMinuta':item6.NumeroMinuta};
                                                                         minu++;
                                                                   }
                                                                     $.ajax({
                                                                        type: "POST",
                                                                        async : true,
                                                                        url: "http://www.appbennetts.com/VIC/ProcesosVIC7/GuardarVentas.php",
                                                                        dataType: 'html',
                                                                        data: {'arrayprospecto': JSON.stringify(datospros),'arrayproyectos': JSON.stringify(datosproy),'arrayventas': JSON.stringify(datosven),'arrayminutas': JSON.stringify(datosminu)},
                                                                        success: function(respuesta){
                                                                          //Cambiar el estatus

                                                                        //setTimeout(function(){
                                                                            databaseHandler.db.transaction(
                                                                                function(tx7){
                                                                                    tx7.executeSql(
                                                                                        "UPDATE VisitasVentas SET envio = 3 WHERE IdCedulaV = ?",
                                                                                        [IdCedulaV],
                                                                                        function(tx7, results){

                                                                                        }
                                                                                    );
                                                                                }
                                                                            );
                                                                    //}, 3000);
                                                                    //Fin de camiar el estatus


                                                                            }
                                                                        });
                                                                    },
                                                                    function(tx, error){
                                                                        console.log("add client error: " + error.message);
                                                                        app.dialog.alert('Error al enviar..', 'Error');
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            },
                                                            function(error){},
                                                            function(){}
                                                            );

                                                },
                                                function(tx, error){
                                                console.log("add client error: " + error.message);
                                                app.dialog.alert('Error al enviar..', 'Error');
                                                app.preloader.hide();
                                            }
                                        );
                                    },
                                    function(error){},
                                    function(){}
                                    );
                                },
                                function(tx, error){
                                console.log("add client error: " + error.message);
                                app.dialog.alert('Error al enviar..', 'Error');
                                app.preloader.hide();
                            }
                        );
                    },
                    function(error){},
                    function(){}
                    );
                 },
                function(tx, error){
                console.log("add client error: " + error.message);
                app.dialog.alert('Error al enviar..', 'Error');
                app.preloader.hide();
            }
        );
    },
    function(error){},
    function(){}
    );
}


function continuarCed(idcte, idc){
    localStorage.setItem("IdCedula",idc);
    localStorage.setItem("IdCte",idcte);
    localStorage.setItem("Opcion", '1');
    app.views.main.router.navigate({ name: 'recorrido'});
}
function continuarCedSeg(idcte, idc){
    localStorage.setItem("IdCedulaSeg",idc);
    localStorage.setItem("IdCte",idcte);
    localStorage.setItem("Opcion", '2');
    app.views.main.router.navigate({ name: 'recorridoseg'});
}
function continuarCedVis(idcte, idc){
    localStorage.setItem("IdCedulaV",idc);
    localStorage.setItem("IdProyecto",idcte);
    localStorage.setItem("Opcion", '3');
    app.views.main.router.navigate({ name: 'prospectos'});
}
function continuarCedAudi(idcte, idc){
    localStorage.setItem("IdCedulaA",idc);
    localStorage.setItem("IdCte",idcte);
    localStorage.setItem("Opcion", '4');
    app.views.main.router.navigate({ name: 'auditoria'});
}

function verpdf(IdCte,IdCed, TipoC){
    if(TipoC == 1){
        app.views.main.router.navigate({ name: 'visualizar' , params: {IdCte: IdCte, IdCed: IdCed}});
    }else if(TipoC == 2){
        app.views.main.router.navigate({ name: 'visualizars' , params: {IdCte: IdCte, IdCed: IdCed}});
    }else if(TipoC == 3){
        app.views.main.router.navigate({ name: 'visualizarv' , params: {IdCte: IdCte, IdCed: IdCed}});
    }
}
function verpdfAuditoria(Division,IdCed){
    app.views.main.router.navigate({ name: 'visualizara' , params: {Division: Division, IdCed: IdCed}});
}
//metodo regresar
function regresar(){
     window.location.href = "./menu.html";
     screen.orientation.lock('portrait');
}

function llevarTodoSegInd(cte, ced){
    app.dialog.alert(" Puede seguir usando la aplicacion","Enviando.");
    databaseHandler.db.transaction(
        function(tx7){
            tx7.executeSql(
                "UPDATE CedulaSeg SET envio = 2 WHERE IdCedula = ?",
                [ced],
                function(tx7, results){

                }
            );
        }
    );


    var datosce = new Array();
    var datosseg = new Array();

    var ce = 0;
    var s = 0;
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "SELECT * FROM CedulaSeg INNER JOIN Clientes ON CedulaSeg.IdCte = Clientes.IdCte WHERE CedulaSeg.IdCedulaSeg = ?",
                [ced],
                function(tx, results){
                    app.dialog.alert('Enviando. Puede continuar usando la aplicaci\u00f3n.', 'Aviso');
                    var length = results.rows.length;
                    for(var i = 0; i< length; i++){
                        var item1 = results.rows.item(i);
                         datosce[ce] = {'Valor':ce,'IdUsuario':item1.IdUsuario,'IdCte':item1.IdCte,'FechaCaptura':item1.FechaCaptura,'Imagen':item1.Imagen,'geolocation': item1.geolocation,'NomComercial': item1.NomComercial,'NomContacto': item1.NomContacto,'Telefono': item1.Telefono,'Email': item1.Email,'Cliente':item1.Cliente,'TipoT':'1', 'FechaCierre': item1.FechaCierre};

                         ce++;
                   }
                   databaseHandler.db.transaction(
                        function(tx){
                            tx.executeSql(
                                "SELECT * FROM Seguimiento WHERE IdCedula = ?",
                                [ced],
                                function(tx, results){
                                    var length = results.rows.length;
                                    for(var i = 0; i< length; i++){
                                        var item3 = results.rows.item(i);
                                         datosseg[s] = {'Valor':s, 'IdCedula': item3.IdCed, 'IdTipoSeguimiento': item3.IdTipoSeguimiento, 'NumTipoSeg':item3.NumTipoSeg,'Otro': item3.Otro,'FotoS':item3.FotoS,'FirmaS':item3.FirmaS,'TipoT': '2', 'FechaCierre': item3.FechaCierre,'NombreFirma': item3.NombreFirma, 'Comentario':item3.Comentario};

                                         s++;
                                   }
                                    $.ajax({
                                        type: "POST",
                                        async : true,
                                        url: "http://www.appbennetts.com/VIC/ProcesosVIC7/GuardarApoyo.php",
                                        dataType: 'html',
                                        data: {'arrayce': JSON.stringify(datosce),'arrayseg': JSON.stringify(datosseg)},
                                        success: function(respuesta){

                                            //UPDATE
                                            //Cambiar el estatus
                                       // setTimeout(function(){
                                            databaseHandler.db.transaction(
                                                function(tx7){
                                                    tx7.executeSql(
                                                        "UPDATE CedulaSeg SET envio = 3 WHERE IdCedulaSeg = ?",
                                                        [ced],
                                                        function(tx7, results){

                                                        }
                                                    );
                                                }
                                            );
                                    //}, 3000);
                                    //Fin de// camiar el estatus


                                        }
                                    });

                                    },
                                function(tx, error){
                                    console.log("add client error: " + error.message);
                                    app.dialog.alert('Error al enviar..', 'Error');
                                    app.preloader.hide();
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                },
                function(tx, error){
                    console.log("add client error: " + error.message);
                    app.dialog.alert('Error al enviar..', 'Error');
                    app.preloader.hide();
                }
            );
        },
        function(error){},
        function(){}
    );
}


// eliminar registros apoyo

function EliminarApoyoR(){
    var IdUsuario = localStorage.getItem("IdUsuario");
    var res ='';
    var fecha = new Date();
    var fecha_ingreso = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();

    FFinalF= editar_fecha(fecha_ingreso, "-9", "d","-");
     //alert("eliminar registros apoyo");
     //alert(FFinalF);

        //ELIMINAR REGISTROS DE APOYO
         databaseHandler.db.transaction(
            function(tx5){

                tx5.executeSql(
                    "SELECT * FROM CedulaSeg   WHERE envio = 3 AND FechaCaptura < ? ",
                    [FFinalF],
                    function(tx5, results){

                        var length = results.rows.length;
                        for(var i = 0; i< length; i++){
                            var item2 = results.rows.item(i);
                            var IdCEliminar1 = item2.IdCedulaSeg;
                            databaseHandler.db.transaction(
                                function(tx4){
                                    tx4.executeSql(
                                        "DELETE FROM CedulaSeg WHERE IdCedulaSeg = ?",
                                        [IdCEliminar1],
                                        function(tx4, results){
                                        },
                                        function(tx4, error){
                                            console.log("Error al guardar registro: " + error.message);
                                        }
                                    );
                                },
                                function(error){},
                                function(){}
                            );

                            databaseHandler.db.transaction(
                                function(tx4){
                                    tx4.executeSql(
                                        "DELETE FROM Seguimiento WHERE IdCedula = ?",
                                        [IdCEliminar1],
                                        function(tx4, results){
                                        },
                                        function(tx4, error){
                                            console.log("Error al guardar registro: " + error.message);
                                        }
                                    );
                                },
                                function(error){},
                                function(){}
                            );
                        }
                    },
                    function(tx5, error){
                        console.log("Error al guardar registro: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );

        //FIN DE ELIMINAR REGISTROS DE APOYO
}

function sumarDias(fecha, dias){
    var fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return fecha.toLocaleDateString( fecha.getTimezoneOffset(), options );
}
//ELIMINAR REGISTROS  totales
function EliminarRegistros(){
    var IdUsuario = localStorage.getItem("IdUsuario");
    var res ='';
    var fecha = new Date();
    var fecha_ingreso = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();

    FFinalF= editar_fecha(fecha_ingreso, "-9", "d","-");
    databaseHandler.db.transaction(
            function(tx5){
                tx5.executeSql(
                    "SELECT * FROM Cedula as c INNER JOIN  cierre as ci ON ci.IdCedula = c.IdCedula AND ci.envio = 3 WHERE c.FechaCaptura < ?",
                    [FFinalF],
                    function(tx5, results){
                        var length = results.rows.length;
                        for(var i = 0; i< length; i++){
                            var item2 = results.rows.item(i);
                            var IdCEliminar = item2.IdCedula;

                            //ELIMINAR EQUIPOS

                        databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM ced_equipos WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR EQUIPOS

                        //ELIMINAR IMAGEN
                       databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM imagen WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                         },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR IMAGEN

                        //ELIMINAR ENTRENAMIENTO
                        databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM entrenamiento WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR ENTRENAMIENTO

                        //ELIMINAR TOMA INVENTARIO
                      databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM tomaInventario WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                          },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA INVENTARIO

                         //ELIMINAR TOMA PEDIDO
                        databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM pedido WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA PEDIDO

                         //ELIMINAR TOMA PROD NUEVOS
                         databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM prodnvos WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA PROD NUEVOS
                        //ELIMINAR OBSRVACIONES PEDIDO
                             databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM ObservacionesPedido WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );

                        //FIN DE ELIMINAR OBSERVACIONES PEDIDO
                         //ELIMINAR TOMA CEDULA
                         databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM Cedula WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA PROD CEDULA

                         //ELIMINAR TOMA PROD CIERRE
                         databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM cierre WHERE IdCedula = ?",
                                [IdCEliminar],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA PROD CIERRE
                            }

                    },
                    function(tx5, error){
                        console.log("Error al guardar registro: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );

}

function EliminarActualizacion(){
    var IdUsuario = localStorage.getItem("IdUsuario");
    var res ='';
    var fecha = new Date();
    var fecha_ingreso = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();

    FFinalF= editar_fecha(fecha_ingreso, "-9", "d","-");
    databaseHandler.db.transaction(
        function(tx5){
            tx5.executeSql(
                "SELECT * FROM Actualizaciones as c WHERE c.Fecha < ?",
                [FFinalF],
                function(tx5, results){
                    var length = results.rows.length;
                    for(var i = 0; i< length; i++){
                        var item2 = results.rows.item(i);
                        var IdEliminar = item2.idActualizacion;
                        alert(IdEliminar);
                        //ELIMINAR REGISTRO
                        databaseHandler.db.transaction(
                                function(tx4){
                                    tx4.executeSql(
                                        "DELETE FROM Actualizaciones WHERE idActualizacion = ?",
                                        [IdEliminar],
                                        function(tx4, results){
                                        },
                                        function(tx4, error){
                                            console.log("Error al eliminar: " + error.message);
                                        }
                                    );
                                },
                                function(error){
                                    console.log("Erroooor")
                                },
                                function(){}
                            );

                    }
                }
            )
        }
    );
}





function EliminarReg(IdCed, tipo){
    app.dialog.confirm('¿Está seguro que desea eliminar la cedula?','Aviso!', function () {
        if(tipo == 1){
        //ELIMINAR LA CEDULA
               //ELIMINAR EQUIPOS

                        databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM ced_equipos WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR EQUIPOS

                        //ELIMINAR IMAGEN
                       databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM imagen WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                         },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR IMAGEN

                        //ELIMINAR ENTRENAMIENTO
                        databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM entrenamiento WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR ENTRENAMIENTO

                        //ELIMINAR TOMA INVENTARIO
                      databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM tomaInventario WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                          },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA INVENTARIO

                         //ELIMINAR TOMA PEDIDO
                        databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM pedido WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA PEDIDO

                         //ELIMINAR TOMA PROD NUEVOS
                         databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM prodnvos WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA PROD NUEVOS

                         //ELIMINAR TOMA CEDULA
                         databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM Cedula WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TCUESTIONARIO
                        databaseHandler.db.transaction(
                            function(tx4){
                                tx4.executeSql(
                                    "DELETE FROM Cuestionarios WHERE IdCedula = ?",
                                    [IdCed],
                                    function(tx4, results){
                                    },
                                    function(tx4, error){
                                        console.log("Error al guardar registro: " + error.message);
                                    }
                                );
                            },
                            function(error){},
                            function(){}
                        );

                         //ELIMINAR TOMA PROD CIERRE
                         databaseHandler.db.transaction(
                        function(tx4){
                            tx4.executeSql(
                                "DELETE FROM cierre WHERE IdCedula = ?",
                                [IdCed],
                                function(tx4, results){
                                },
                                function(tx4, error){
                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                        //ELIMINAR TOMA PROD CIERRE
        //FIN DE ELIMINAR CEDULA
        $("#conc" + IdCed).remove();
        }
        if(tipo == 2){
            databaseHandler.db.transaction(
                function(tx4){
                    tx4.executeSql(
                        "DELETE FROM CedulaSeg WHERE IdCedulaSeg = ?",
                        [IdCed],
                        function(tx4, results){
                        },
                        function(tx4, error){
                            console.log("Error al guardar registro: " + error.message);
                        }
                    );
                },
                function(error){},
                function(){}
            );

            databaseHandler.db.transaction(
                function(tx4){
                    tx4.executeSql(
                        "DELETE FROM Seguimiento WHERE IdCedula = ?",
                        [IdCed],
                        function(tx4, results){
                        },
                        function(tx4, error){
                            console.log("Error al guardar registro: " + error.message);
                        }
                    );
                },
                function(error){},
                function(){}
            );
            $("#concSeg" + IdCed).remove();
        }
        if(tipo == 3){
            databaseHandler.db.transaction(
                function(tx4){
                    tx4.executeSql(
                        "DELETE FROM VisitasVentas WHERE IdCedulaV = ?",
                        [IdCed],
                        function(tx4, results){
                        },
                        function(tx4, error){
                            console.log("Error al guardar registro: " + error.message);
                        }
                    );
                },
                function(error){},
                function(){}
            );

            databaseHandler.db.transaction(
                function(tx4){
                    tx4.executeSql(
                        "DELETE FROM Prospectos WHERE IdCedulaV = ?",
                        [IdCed],
                        function(tx4, results){
                        },
                        function(tx4, error){
                            console.log("Error al guardar registro: " + error.message);
                        }
                    );
                },
                function(error){},
                function(){}
            );
            $("#concVis" + IdCed).remove();
        }
        if(tipo == 4){
            databaseHandler.db.transaction(
                function(tx4){
                    tx4.executeSql(
                        "DELETE FROM RegistroAuditorias WHERE IdCedulaA = ?",
                        [IdCed],
                        function(tx4, results){
                        },
                        function(tx4, error){
                            console.log("Error al guardar registro: " + error.message);
                        }
                    );
                },
                function(error){},
                function(){}
            );

            databaseHandler.db.transaction(
                function(tx4){
                    tx4.executeSql(
                        "DELETE FROM ResultAuditorias WHERE IdCedulaA = ?",
                        [IdCed],
                        function(tx4, results){
                        },
                        function(tx4, error){
                            console.log("Error al guardar registro: " + error.message);
                        }
                    );
                },
                function(error){},
                function(){}
            );
            $("#concVis" + IdCed).remove();
        }



    app.dialog.alert('Registro eliminado', 'Aviso!');

    });
}

//VALIDAR QUE TENGA INFORMACION PARA CERRAR LA CEDULA O EN SU DEFECTO GUARDAR LA CEDULA PARA EL ENVIO DE LA INFORMACION
function gEnvioCS(){
    //alert("cambiar el estatus de la cedula para el envio al servidor");
    var IdCedulaSeg = localStorage.getItem("IdCedulaSeg");
    databaseHandler.db.transaction(
            function(tx1){

                tx1.executeSql(
                    "SELECT * FROM Seguimiento WHERE  IdCedula = ?",
                    [IdCedulaSeg],
                    function(tx1, results){
                        var datos = results.rows.length;
                        if(datos > 0){
                            databaseHandler.db.transaction(
                                function(tx2){

                                    tx2.executeSql(
                                        "UPDATE CedulaSeg SET envio = 1 WHERE  IdCedulaSeg = ?",
                                        [IdCedulaSeg],
                                        function(tx2, results){
                                            app.dialog.alert('Cedula de apoyo, guardada correctamente.', 'Aviso');
                                            window.location.href = "./menu.html";
                                        },
                                        function(tx2, error){
                                            console.log("Error al consultar: " + error.message);
                                        }
                                    );
                                    console.log("Consulta correcta");
                                },
                                function(error){},
                                function(){}
                            );

                        } else {
                            app.dialog.alert('La cedula de apoyo no contiene ningun registro.', 'Aviso');
                        }

                    },
                    function(tx, error){
                        console.log("Error al consultar: " + error.message);
                    }
                );
                console.log("Consulta correcta");
            },
            function(error){},
            function(){}
        );

}

//GUARDAR DATOS GENERALES DEL CLIENTE

function gdatosgrals(){
    app.preloader.show('blue');
    var Opcion1 = localStorage.getItem("Opcion");

    var ncomercial = $("#ncomercial").val();
	var ncontacto = $("#ncontacto").val();
	var telefono = $("#telefono").val();
	var correo = $("#correo").val();
	var estatusc = $("#estatusc").val();
    var Nomcte = $("#Nomcte").val();
    var cte = $('#cte').val();
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "UPDATE Clientes SET NomComercial = ?, NomContacto = ?, Telefono = ?, Email = ?, Estatus = ?, Cliente = ? WHERE IdCte = ?",
                [ncomercial, ncontacto, telefono, correo, estatusc, Nomcte ,cte],
                function(tx, results){
                    app.dialog.alert('Datos actualizados correctamente.', 'Alerta!');
                    app.preloader.hide();
                    if(Opcion1 == 2){
                        app.views.main.router.navigate({name: 'recorridoseg'});
                    }
                },
                function(tx, error){
                    console.log("Error al guardar cedula: " + error.message);
                    app.preloader.hide();
                }
            );
        },
        function(error){},
        function(){}
    );
}

//GUARDAR SEGUIMIENTO

function gTSeguimiento(){
    var fecha = new Date();
    var fFinal = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();

    var IdCedulaSeg = localStorage.getItem("IdCedulaSeg");
    var comentario = $("#comentario").val();
    var imagen2 = $("#imagenC").val();
    var tipo = $("#tipos").val();
    var signate = $("#signate").val();
    var comenotro = $("#OpcOtra").val();
    var NombreFirma = $("#NombreFirma").val();

    if(comenotro == ''){
        comenotro1 = '';
    } else {
        comenotro1 = comenotro;
    }
    var TipoImagen;
    var le=0;
    le = tipo.length;
    var opciones ='';
    var c=0;
    for(var i=0; i<= le-1; i++){
        var t = tipo[i];
        if(t == 1 || t == 2 || t == 3 || t == 7){
            c++;
        }
    }
    if(c > 0){

                if(le > 0){
                    if(comentario != ''){

               for(var i=0; i<= le-1; i++){
                    var t = tipo[i];

                    if(t == 1){ TipoImagen = ",Apoyo a instalaci\u00f3n y rellenado de equipos"; }
                    if(t == 2){ TipoImagen = ",Apoyo a entrega de productos"; }
                    if(t == 3){ TipoImagen = ",Apoyo en instalaci\u00f3n"; }
                    if(t == 4){ TipoImagen = ",Apoyo en negociaci\u00f3n"; }
                    if(t == 5){ TipoImagen = ",Capacitaci\u00f3n a un compañero"; }
                    if(t == 6){ TipoImagen = ",Cobranza"; }
                    if(t == 7){ TipoImagen = ",Mantenimiento a equipos"; }
                    if(t == 8){ TipoImagen = ",Seguimiento en campo"; }
                    if(t == 9){ TipoImagen = ",Otro"; }
                    opciones = opciones + " "+ TipoImagen;
                }
                databaseHandler.db.transaction(
                    function(tx4){
                        tx4.executeSql(
                            "INSERT INTO Seguimiento (IdCedula, IdTipoSeguimiento, Comentario, Otro, FotoS, FirmaS, NumTipoSeg,NombreFirma) VALUES (?,?,?,?,?,?,?,?) ",
                            [IdCedulaSeg, opciones, comentario, comenotro1, imagen2, signate, tipo , NombreFirma ],
                            function(tx4, results){
                                databaseHandler.db.transaction(
                                    function(tx5){
                                        tx5.executeSql(
                                            "Select MAX(IdSeguimiento) as Id from Seguimiento",
                                            [],
                                            function(tx5, results){
                                                var lengthS = results.rows.length;
                                                for(var i = 0; i< lengthS; i++){
                                                    var item2 = results.rows.item(i);
                                                         databaseHandler.db.transaction(
                                                        function(tx5){
                                                            tx5.executeSql(
                                                                "Select * from Seguimiento Where IdSeguimiento = ?",
                                                                [item2.Id],
                                                                function(tx5, results){

                                                                    var lengthSU = results.rows.length;
                                                                    for(var i = 0; i< lengthSU; i++){
                                                                        var item3 = results.rows.item(i);
                                                                        $("#tablaseg tbody").append("<tr id='fila"+ item3.IdSeguimiento +"'><td><a href='#' onclick='eliminarFila("+ item3.IdSeguimiento +", 7);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></td><td text-align: center;><img src='" + item3.FotoS + "' width='60px' /></td><td text-align: center;>"+item3.NombreFirma+"</td><td text-align: center;><img src='" + item3.FirmaS + "' width='80px' /></td><td text-align: center;>" + item3.IdTipoSeguimiento + "</td><td text-align: center;>" + item3.Comentario + "</td><td text-align: center;>"+ item3.Otro+"</td></tr>");
                                                                        $("#comentario").val('');
                                                                        $("#imagenC").val('');

                                                                        $("#OpcOtra").val('');
                                                                        $("#NombreFirma").val('');
                                                                        $("#comentario").css("background-color", "#ffffff");
                                                                        $("#OpcOtra").css("background-color", "#ffffff");
                                                                        $("#tipos").css("background-color", "#ffffff");
                                                                        $("#NombreFirma").css("background-color", "#ffffff");
                                                                    }
                                                                    databaseHandler.db.transaction(
                                                                        function(tx){
                                                                            tx.executeSql(
                                                                                "UPDATE CedulaSeg SET FechaCierre = ? WHERE IdCedulaSeg = ?",
                                                                                [fFinal, IdCedulaSeg],
                                                                                function(tx, results){

                                                                                },
                                                                                function(tx, error){
                                                                                    console.log("Error al guardar cedula: " + error.message);
                                                                                    app.preloader.hide();
                                                                                }
                                                                            );
                                                                        },
                                                                        function(error){},
                                                                        function(){}
                                                                    );
                                                                    app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                                    app.views.main.router.navigate({name: 'cierreseg'});
                                                                },
                                                                function(tx5, error){
                                                                    console.log("Error al guardar registro: " + error.message);
                                                                }
                                                            );
                                                        },
                                                        function(error){},
                                                        function(){}
                                                    );
                                                }

                                            },
                                            function(tx5, error){
                                                console.log("Error al guardar registro: " + error.message);
                                            }
                                        );
                                    },
                                    function(error){},
                                    function(){}
                                );
                            },
                            function(tx4, error){
                                console.log("Error al guardar registro: " + error.message);
                            }
                        );
                    },
                    function(error){},
                    function(){}
                );
                } else {
            app.dialog.alert('Comentario: campo requerido.', 'Aviso');

        }
            } else {
                app.dialog.alert('Favor de seleccionar el tipo de seguimiento.', 'Aviso');
        }

    } else {

        if(le > 0){
            if(comentario != ''){
       for(var i=0; i<= le-1; i++){
            var t = tipo[i];

            if(t == 1){ TipoImagen = ",Apoyo a instalaci\u00f3n y rellenado de equipos"; }
            if(t == 2){ TipoImagen = ",Apoyo a entrega de productos"; }
            if(t == 3){ TipoImagen = ",Apoyo en instalaci\u00f3n"; }
            if(t == 4){ TipoImagen = ",Apoyo en negociaci\u00f3n"; }
            if(t == 5){ TipoImagen = ",Capacitaci\u00f3n a un compañero"; }
            if(t == 6){ TipoImagen = ",Cobranza"; }
            if(t == 7){ TipoImagen = ",Mantenimiento a equipos"; }
            if(t == 8){ TipoImagen = ",Seguimiento en campo"; }
            if(t == 9){ TipoImagen = ",Otro"; }
            opciones = opciones + " "+ TipoImagen;
        }
        databaseHandler.db.transaction(
            function(tx4){
                tx4.executeSql(
                    "INSERT INTO Seguimiento (IdCedula, IdTipoSeguimiento, Comentario, Otro, FotoS, FirmaS, NumTipoSeg,NombreFirma) VALUES (?,?,?,?,?,?,?,?) ",
                    [IdCedulaSeg, opciones, comentario, comenotro1, imagen2, signate, tipo ,NombreFirma],
                    function(tx4, results){
                        databaseHandler.db.transaction(
                            function(tx5){
                                tx5.executeSql(
                                    "Select MAX(IdSeguimiento) as Id from Seguimiento",
                                    [],
                                    function(tx5, results){
                                        var lengthS = results.rows.length;
                                        for(var i = 0; i< lengthS; i++){
                                            var item2 = results.rows.item(i);
                                                 databaseHandler.db.transaction(
                                                function(tx5){
                                                    tx5.executeSql(
                                                        "Select * from Seguimiento Where IdSeguimiento = ?",
                                                        [item2.Id],
                                                        function(tx5, results){

                                                            var lengthSU = results.rows.length;
                                                            for(var i = 0; i< lengthSU; i++){
                                                                var item3 = results.rows.item(i);
                                                                $("#tablaseg tbody").append("<tr id='fila"+ item3.IdSeguimiento +"'><td><a href='#' onclick='eliminarFila("+ item3.IdSeguimiento +", 7);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></td><td text-align: center;><img src='" + item3.FotoS + "' width='60px' /></td><td text-align: center;>"+item3.NombreFirma+"</td><td text-align: center;><img src='" + item3.FirmaS + "' width='80px' /></td><td text-align: center;>" + item3.IdTipoSeguimiento + "</td><td text-align: center;>" + item3.Comentario + "</td><td text-align: center;>"+ item3.Otro+"</td></tr>");
                                                                $("#comentario").val('');
                                                                $("#imagenC").val('');

                                                                $("#OpcOtra").val('');
                                                                $("#NombreFirma").val('');
                                                                $("#comentario").css("background-color", "#ffffff");
                                                                $("#OpcOtra").css("background-color", "#ffffff");
                                                                $("#tipos").css("background-color", "#ffffff");
                                                                $("#NombreFirma").css("background-color", "#ffffff");
                                                            }
                                                            databaseHandler.db.transaction(
                                                                        function(tx){
                                                                            tx.executeSql(
                                                                                "UPDATE CedulaSeg SET FechaCierre = ? WHERE IdCedulaSeg = ?",
                                                                                [fFinal, IdCedulaSeg],
                                                                                function(tx, results){

                                                                                },
                                                                                function(tx, error){
                                                                                    console.log("Error al guardar cedula: " + error.message);
                                                                                    app.preloader.hide();
                                                                                }
                                                                            );
                                                                        },
                                                                        function(error){},
                                                                        function(){}
                                                                    );
                                                            app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                            app.views.main.router.navigate({name: 'cierreseg'});
                                                        },
                                                        function(tx5, error){
                                                            console.log("Error al guardar registro: " + error.message);
                                                        }
                                                    );
                                                },
                                                function(error){},
                                                function(){}
                                            );
                                        }

                                    },
                                    function(tx5, error){
                                        console.log("Error al guardar registro: " + error.message);
                                    }
                                );
                            },
                            function(error){},
                            function(){}
                        );
                    },
                    function(tx4, error){
                        console.log("Error al guardar registro: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
        } else {
            app.dialog.alert('Comentario: campo requerido.', 'Aviso');
        }
    }else {
        app.dialog.alert('Favor de seleccionar el tipo de seguimiento.', 'Aviso');
    }
    }

}

function gVentas(){
    var IdCedulaV1       = localStorage.getItem("IdCedulaV");
    var IdProyecto       = localStorage.getItem("IdProyecto");
    var imagenC          = $("#imagenC").val();
    var geolocation      = $("#geolocation").val();
    var fecha            = new Date();
    var fFinal           = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
    var IdUsu            = localStorage.getItem("IdUsuario");
    var actividades      = $("#actividades").val();
    var sep              = actividades.split('/');
    var esta             = "1";
    var Potencial        = $("#Potencial").val();
    var SegmentoProyecto = $("#SegmentoProyecto").val();
    //Validar si hay una cedula solo dejarlo pasar
    if(IdCedulaV1 > 0){

        localStorage.setItem("IdProyecto", IdProyecto);
        localStorage.setItem("IdCedulaV", IdCedulaV1);
        app.views.main.router.navigate({name: 'seguimientov'}); //Colocar la pagina que realizaste
    } else {
         if(imagenC == ''){
        app.dialog.alert('La fotograf&iacute;a es un campo requerido.', 'Aviso');
    } else {

        if(sep[0] == 0){
            app.dialog.alert('Favor de seleccionar un proyecto.', 'Aviso');
        } else {
            if(sep[0] == 'NUEVO'){
                    var NomP = sep[1];

                    databaseHandler.db.transaction(
                    function(tx1){
                        tx1.executeSql(
                            "INSERT INTO Proyectos (FechaCreacion, NombreProyecto, IdUsuario, Estatus, Potencial, SegmentoProyecto) VALUES (?,?,?,?,?,?)",
                            [fFinal,NomP,IdUsu,esta,Potencial,SegmentoProyecto],
                            function(tx, results){
                                var length = results.rows.length;
                                //Extraer el ultimo
                                    databaseHandler.db.transaction(
                                        function(tx1){
                                            tx1.executeSql(
                                                "Select MAX(IdProyecto) as Id from Proyectos",
                                                [],
                                                function(tx, results){
                                                    var length = results.rows.length;
                                                    var item = results.rows.item(0);
                                                    localStorage.setItem("IdProyecto", item.Id);
                                                    envio = 0;
                                                    databaseHandler.db.transaction(
                                                        function(tx1){
                                                            tx1.executeSql(
                                                                "INSERT INTO VisitasVentas (IdProyecto, FechaVisita, Imagen, Geolocalizacion, envio, IdUsuario) VALUES (?,?,?,?,?,?)",
                                                                [item.Id,fFinal,imagenC,geolocation,envio, IdUsu],
                                                                function(tx, results){

                                                                   //Extraer el ultimo id de la visita
                                                                    databaseHandler.db.transaction(
                                                                        function(tx1){
                                                                            tx1.executeSql(
                                                                                "Select MAX(IdCedulaV) as Id from VisitasVentas",
                                                                                [],
                                                                                function(tx, results){
                                                                                    var length = results.rows.length;
                                                                                    var item3 = results.rows.item(0);
                                                                                    localStorage.setItem("IdCedulaV", item3.Id);

                                                                                    $('.preloader').remove();
                                                                                    $('.infinite-scroll-preloader').remove();

                                                                                    app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                                                    app.views.main.router.navigate({name: 'seguimientov'}); //Colocar la pagina que realizaste
                                                                                },
                                                                                function(tx, error){
                                                                                    console.log("Error al consultar: " + error.message);
                                                                                }
                                                                            );
                                                                            console.log("Consulta correcta");
                                                                        },
                                                                        function(error){},
                                                                        function(){}
                                                                    );
                                                                   //Fin de extraer el ultimo id de la visita



                                                                },
                                                                function(tx, error){
                                                                    console.log("Error al consultar: " + error.message);
                                                                }
                                                            );
                                                            console.log("Consulta correcta");
                                                        },
                                                        function(error){},
                                                        function(){}
                                                    );
                                                },
                                                function(tx, error){
                                                    console.log("Error al consultar: " + error.message);
                                                }
                                            );
                                            console.log("Consulta correcta");
                                        },
                                        function(error){},
                                        function(){}
                                    );
                                //Fin de extraer el ultimo

                            },
                            function(tx, error){
                                console.log("Error al consultar: " + error.message);
                            }
                        );
                        console.log("Consulta correcta");
                    },
                    function(error){},
                    function(){}
                );
            } else {
                var IdProyecto = sep[0];
                envio = 0;
                localStorage.setItem("IdProyecto", IdProyecto);
                databaseHandler.db.transaction(
                    function(tx1){
                        tx1.executeSql(
                            "INSERT INTO VisitasVentas (IdProyecto, FechaVisita, Imagen, Geolocalizacion, envio, IdUsuario) VALUES (?,?,?,?,?,?)",
                            [IdProyecto,fFinal,imagenC,geolocation, envio, IdUsu],
                            function(tx, results){
                                databaseHandler.db.transaction(
                                    function(tx1){
                                        tx1.executeSql(
                                            "Select MAX(IdCedulaV) as Id from VisitasVentas",
                                            [],
                                            function(tx, results){
                                                var length = results.rows.length;
                                                var item3 = results.rows.item(0);
                                                localStorage.setItem("IdCedulaV", item3.Id);

                                                $('.preloader').remove();
                                                $('.infinite-scroll-preloader').remove();
                                                app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                                app.views.main.router.navigate({name: 'seguimientov'}); //Colocar la pagina que realizaste
                                            },
                                            function(tx, error){
                                                console.log("Error al consultar: " + error.message);
                                            }
                                        );
                                        console.log("Consulta correcta");
                                    },
                                    function(error){},
                                    function(){}
                                );
                            },
                            function(tx, error){
                                console.log("Error al consultar: " + error.message);
                            }
                        );
                        console.log("Consulta correcta");
                    },
                    function(error){},
                    function(){}
                );
            }
        }
    }
    }
    //FIN de validar

}


function gProyecto(){
    app.preloader.show();
    var NomP      = $("#NomNvoP").val();
    var Potencial = $("#Potencial").val();
    var Segmento  = $("#Segmento").val();
    select = document.getElementById("actividades");
    if(NomP != '' && Potencial !='' && Segmento != ''){
        option = document.createElement("option");
        option.value = "NUEVO"+"/"+NomP;
        option.text = unescape(NomP);
        select.appendChild(option);

        app.dialog.alert('El proyecto se agrego con exito a tu listado.', 'Aviso');
        app.preloader.hide();
    } else {
        app.dialog.alert('Favor de llenar todos los campos.', 'Aviso');
        app.preloader.hide();
    }
}

function EliminarVentas(){
    var IdUsuario = localStorage.getItem("IdUsuario");
    var res ='';
    var fecha = new Date();
    var fecha_ingreso = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();

    FFinalF= editar_fecha(fecha_ingreso, "-9", "d","-");
    // alert("eliminar registros");

        //ELIMINAR REGISTROS DE VENTAS
         databaseHandler.db.transaction(
            function(tx5){

                tx5.executeSql(
                    "SELECT * FROM VisitasVentas  WHERE envio = 3 AND FechaVisita < ? ",
                    [FFinalF],
                    function(tx5, results){

                        var length = results.rows.length;
                        for(var i = 0; i< length; i++){
                            var item2 = results.rows.item(i);
                            var IdCEliminar1 = item2.IdCedulaSeg;
                            databaseHandler.db.transaction(
                                function(tx4){
                                    tx4.executeSql(
                                        "DELETE FROM VisitasVentas WHERE IdCedulaV = ?",
                                        [IdCEliminar1],
                                        function(tx4, results){
                                        },
                                        function(tx4, error){
                                            console.log("Error al guardar registro: " + error.message);
                                        }
                                    );
                                },
                                function(error){},
                                function(){}
                            );

                            databaseHandler.db.transaction(
                                function(tx4){
                                    tx4.executeSql(
                                        "DELETE FROM Prospectos WHERE IdCedulaV = ?",
                                        [IdCEliminar1],
                                        function(tx4, results){
                                        },
                                        function(tx4, error){
                                            console.log("Error al guardar registro: " + error.message);
                                        }
                                    );
                                },
                                function(error){},
                                function(){}
                            );
                        }
                    },
                    function(tx5, error){
                        console.log("Error al guardar registro: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );

        //FIN DE ELIMINAR REGISTROS DE VENTAS
}


function guardarProspecto(){
    var IdProyecto     = localStorage.getItem("IdProyecto");
    var IdCedulaV      = localStorage.getItem("IdCedulaV");
    var NombreRecibe   = $("#NombreRecibe").val();
    var PuestoRecibe   = $("#PuestoRecibe").val();
    var Telefono       = $("#Telefono").val();
    var Correo         = $("#Correo").val();
    var Actividades    = $("#Actividades").val();
    var Segmento       = $("#Segmento").val();
    var Potencial      = $("#Potencial").val();
    var FotoProspecto  = $("#imagenC").val();
    var FirmaProspecto = $("#signate").val();
    var fecha          = new Date();
    var fFinal = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();

    var le = 0;
    le = Actividades.length;
    var opciones ='';

    if(NombreRecibe != ''){
        if(PuestoRecibe != ''){
                if(le != 0){
                    for(var i=0; i<= le-1; i++){
                        var t = Actividades[i];
                        if(t == 1){ TipoActividad = ",Censo"; }
                        if(t == 2){ TipoActividad = ",Contacto"; }
                        if(t == 3){ TipoActividad = ",Presentaci\u00f3n del producto"; }
                        if(t == 4){ TipoActividad = ",LIP"; }
                        if(t == 5){ TipoActividad = ",AD (Analisis - Diagnostico)"; }
                        if(t == 6){ TipoActividad = ",Prueba"; }
                        if(t == 7){ TipoActividad = ",Presentaci\u00f3n de la propuesta"; }
                        if(t == 8){ TipoActividad = ",Negociaci\u00f3n"; }
                        if(t == 9){ TipoActividad = ",Convenio"; }
                        if(t == 10){ TipoActividad = ",Cierre"; }
                        if(t == 11){ TipoActividad = ",Presentaci\u00f3n del asesor a cliente nuevo"; }
                        if(t == 12){ TipoActividad = ",Acompañamiento con gerente"; }
                        opciones = opciones + " "+ TipoActividad;
                        //ActividadesNum = ActividadesNum +" "+
                    }

                    databaseHandler.db.transaction(
                        function(tx){
                            tx.executeSql(
                                "INSERT INTO Prospectos(IdProyecto,IdCedulaV,NombreRecibe,PuestoRecibe,Telefono,Correo,Actividades,FotoProspecto,FirmaProspecto, ActividadesNum) VALUES(?,?,?,?,?,?,?,?,?,?);",
                                [IdProyecto,IdCedulaV,NombreRecibe,PuestoRecibe,Telefono,Correo,opciones,FotoProspecto,FirmaProspecto,Actividades],
                                function(tx, results){
                                    $("#NombreRecibe").val('');
                                     $("#PuestoRecibe").val('');
                                     $("#Telefono").val('');
                                     $("#Correo").val('');
                                     $("#FirmaProspecto").val('');
                                     $("#FotoProspecto").val('');
                                     $("#imagenC").val('');
                                     $("#signate").val('');

                                     $("#NombreRecibe").css("background-color", "#ffffff");
                                     $("#PuestoRecibe").css("background-color", "#ffffff");
                                     $("#Telefono").css("background-color", "#ffffff");
                                     $("#Correo").css("background-color", "#ffffff");

                                    databaseHandler.db.transaction(
                                        function(tx){
                                            tx.executeSql(
                                                "Select MAX(id_Prospectos) as id from Prospectos",
                                                [],
                                                function(tx, results){
                                                    var lengthSU = results.rows.length;
                                                    for(var i = 0; i< lengthSU; i++){
                                                        var item2 = results.rows.item(i);

                                                    }
                                                    databaseHandler.db.transaction(
                                                            function(tx7){
                                                                tx7.executeSql(
                                                                    "SELECT * FROM Prospectos WHERE id_Prospectos = ?",
                                                                    [item2.id],
                                                                    function(tx7, results){
                                                                        var item3 = results.rows.item(0);
                                                                        $("#tablaProspectos tbody").append("<tr id='fila"+ item3.IdProspectos +"'><td><a href='#' onclick='eliminarFila("+ item3.IdProspectos +", 7);' style='border: none; outline:none;'><img src='img/borrar.png' width='30px' /></td><td text-align: center;><img src='" + item3.FotoProspecto + "' width='60px' /></td><td text-align: center;><img src='" + item3.FirmaProspecto + "' width='60px' /></td><td text-align: center;>"+item3.NombreRecibe+"</td><td text-align: center;>"+ item3.PuestoRecibe + "</td><td text-align: center;>" + item3.Telefono + "</td><td text-align: center;>" + item2.Correo + "</td><td text-align: center;>"+ item3.Actividades+"</td></tr>");
                                                                        databaseHandler.db.transaction(
                                                                            function(tx7){
                                                                                tx7.executeSql(
                                                                                    "UPDATE VisitasVentas SET FechaCierre = ?, envio = 1 WHERE IdCedulaV = ?",
                                                                                    [fFinal,IdCedulaV],
                                                                                    function(tx7, results){
                                                                                        app.dialog.alert('Datos insertados correctamente.', 'Aviso!');
																						//llevarVenta();
                                                                                        window.location.href = "./menu.html";
                                                                                        app.preloader.hide();
                                                                                    },
                                                                                    function(tx, error){
                                                                                        console.log("Error al guardar los datos en prospecto1: " + error.message);
                                                                                        app.preloader.hide();
                                                                                    }
                                                                                );
                                                                            }
                                                                        );

                                                                    },
                                                                    function(tx, error){
                                                                        console.log("Error al guardar los datos en prospecto1: " + error.message);
                                                                        app.preloader.hide();
                                                                    }
                                                                );
                                                            }
                                                        );


                                                },
                                                function(tx, error){
                                                    console.log("Error al guardar los datos en prospecto: " + error.message);
                                                    app.preloader.hide();
                                                }
                                            );
                                        },
                                        function(error){},
                                        function(){}
                                    );
                                },
                                function(tx, error){
                                    console.log("Error al guardar los datos en prospecto: " + error.message);
                                    app.preloader.hide();
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                }else{
                    app.dialog.alert('El campo: Actividades. Es requerido.', 'Alerta!');
                    app.preloader.hide();
                }
        }else{
            app.dialog.alert('El campo: Puesto de la persona que atiende. Es requerido.', 'Alerta!');
            app.preloader.hide();
        }
    }else{
        app.dialog.alert('El campo: Persona que atiende. Es requerido.', 'Alerta!');
        app.preloader.hide();
    }

}


function regresarRecorrido(){
            app.views.main.router.back('/recorrido/', {force: true, ignoreCache: true, reload: true});

        }
function regresarRecorridoSEG(){
    app.views.main.router.back('/recorridoseg/', {force: true, ignoreCache: true, reload: true});

}

function horizontal(){
    screen.orientation.lock('landscape');
}


function actup (){
            var datos='0';
            databaseHandler.db.transaction(
            function(tx5){
                tx5.executeSql(
                    "Select * from Proyectos",
                    [],
                    function(tx5, results){
                        var length = results.rows.length;

                        for(var d = 0; d<length; d++){
                            var item2 = results.rows.item(d);

                            datos = datos+","+item2.NombreProyecto;
                        }
                        $("#datosPro").val(datos);

                    },
                    function(tx5, error){
                        app.dialog.alert('Error al actualizar los proyectos', 'Alerta!');
                        console.log("Error al guardar registro: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
            );

            var IdUsuario = localStorage.getItem("IdUsuario");

            app.request.get('http://www.appbennetts.com.mx/VIC/ProcesosVIC7/actualizarProyecto.php', {Iced: IdUsuario }, function (data) {
            var content = JSON.parse(data);
            var x=0;
            var datosp =0;
                for(var i=0; i < content.length; i++){
                    var name = content[i].Nombre;
                    datosp = datosp+","+name;
                }
                $("#datos3").val(datosp);
            });



 }

  function updateCollection (veggies, veggie) {
            var IdUsuario = localStorage.getItem("IdUsuario");
            var esta =1;
            var fecha = new Date();
            var fFinal = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                if (veggies.indexOf(veggie) === -1) {
                    //veggies.push(veggie);

                    //console.log('La nueva colección de vegetales es: ' + veggie);
                    databaseHandler.db.transaction(
                        function(tx5){
                            tx5.executeSql(
                                "INSERT INTO Proyectos (NombreProyecto, FechaCreacion, IdUsuario, Estatus) VALUES (?,?,?,?)",
                                [veggie,fFinal,IdUsuario, esta],
                                function(tx5, results){

                                },
                                function(tx5, error){

                                    console.log("Error al guardar registro: " + error.message);
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                }
                 if (veggies.indexOf(veggie) > -1) {
                   // console.log(veggie + ' ya existe en la colección de verduras.');

                }
            }

function valores(){
    actup ();
    app.dialog.alert('Puedes seguir utilizando la aplicacion.. los proyectos se estan actualizando', 'Alerta!');
    var  datosProyectos = $("#datosPro").val();
    setTimeout(function(){
     var  datosProyectos = $("#datosPro").val();
     var  datosProm = $("#datos3").val();
     var edatop = datosProyectos.split(",");
     var edatoprom = datosProm.split(",");

        var veggies = datosProyectos; //['patata', 'tomate', 'chiles', 'pimientoverde'];
        for(var h=0; h<edatoprom.length; h++){
            updateCollection(veggies, edatoprom[h]);
        }

        //window.location.href = "http://serviciosbennetts.com//VIC/admonproyectos.html";
         app.dialog.alert('Los proyectos se actualizaron', 'Alerta!');
         setTimeout(function(){
            location.reload(true);
         }, 3000);

       }, 2000);

       actup();

}


function EliminarProyecto (idproyecto){

    var IdUsuario = localStorage.getItem("IdUsuario");

    databaseHandler.db.transaction(
        function(tx5){
            tx5.executeSql(
                "Select * from VisitasVentas WHERE IdProyecto =  ? AND envio != 3",
                [idproyecto],
                function(tx5, results){
                   var length = results.rows.length;
                   if(length > 0){
                     app.dialog.alert('No se puede eliminar el proyecto ya que aun existen cedulas pendientes de envio', 'Alerta!');
                   } else {
                    app.dialog.alert('El proyecto se esta eliminando', 'Alerta!');
                    databaseHandler.db.transaction(
                        function(tx7){
                            tx7.executeSql(
                                "Select NombreProyecto FROM Proyectos WHERE IdProyecto = ?",
                                [idproyecto],
                                function(tx7, results){
                                    var item2 = results.rows.item(0);
                                    var NomP = item2.NombreProyecto;

                                    databaseHandler.db.transaction(
                                        function(tx7){
                                            tx7.executeSql(
                                                "DELETE FROM Prospectos WHERE IdProyecto = ?",
                                                [idproyecto],
                                                function(tx7, results){

                                                }
                                            );
                                        }
                                    );
                                    databaseHandler.db.transaction(
                                        function(tx7){
                                            tx7.executeSql(
                                                "DELETE FROM VisitaVentas WHERE IdProyecto = ?",
                                                [idproyecto],
                                                function(tx7, results){

                                                }
                                            );
                                        }
                                    );
                                    databaseHandler.db.transaction(
                                        function(tx7){
                                            tx7.executeSql(
                                                "DELETE FROM Proyectos WHERE IdProyecto = ?",
                                                [idproyecto],
                                                function(tx7, results){

                                                }
                                            );
                                        }
                                    );
                                 $.ajax({
                                    type: "POST",
                                    async : true,
                                    url: "http://www.appbennetts.com/VIC/ProcesosVIC7/EliminarProyecto.php",
                                    dataType: 'html',
                                    data: {'IdUsuario':IdUsuario, 'NombreProyecto':NomP},
                                    success: function(respuesta){
                                        app.dialog.alert('El proyecto se elimino correctamente', 'Alerta!');
                                    }
                                });
                                }
                            );
                        }
                    );


                    $("#proy" + idproyecto).remove();
                   }
                },
                function(tx5, error){
                    //alert("Error al actualizar los proyectos");
                    console.log("Error al guardar registro: " + error.message);
                }
            );
        },
    function(error){},
    function(){}
    );
}


function Results(){
    $( "#Resultados" ) .show( "fast");
    $( "#LimSani" )    .hide( "fast");
    $( "#ManAli" )     .hide( "fast");
    $( "#higPerso" )   .hide( "fast");
    $( "#ContTemp" )   .hide( "fast");
    $( "#ContPlag" )   .hide( "fast");
    var valCheckuno = document.getElementById("uno").checked;
  //  alert(valCheckuno);
    var valCheckdos = document.getElementById("dos").checked;
  //  alert(valCheckdos);
    if(valCheckuno == true){var n1 = 10;}
    if(valCheckdos == true){ var n2 = 10;}

    var suma = parseInt(n1) + parseInt(n2);
   // alert("La suma es: "+suma);
    $("#res").html("<span>La suma es: "+suma+"</span");
}

function agregar(){
    var iproyecto = localStorage.getItem("IdProyecto");

    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "SELECT NumeroMinuta FROM Minutas WHERE idProyecto = ? ORDER BY NumeroMinuta DESC LIMIT 1",
                [iproyecto],
                function(tx, results){
                    var len = results.rows.length;
                    if(len == ''){
                    var suma = 0;
                        $("#tablaMinuta tbody").append("<tr><td class='numeric-cell' style='text-align: center;'><input type='text' disabled='true' name='NumeroMinuta0' id='NumeroMinuta0' value='"+suma+"'></td><td class='numeric-cell' style='text-align: center;'><input class='spanBlanco' type='text' id='Tema0' name='Tema0' placeholder='Tema:' onchange='gMinuta("+suma+");' /></td><td class='numeric-cell' style='text-align: center;'><input class='spanBlanco' type='text' id='Compromiso0' name='Compromiso0' placeholder='Compromiso:' onchange='gMinuta("+suma+");' /></td><td class='numeric-cell' style='text-align: center;'><span style='color: #D3D3D3; text-align: rigth;'>Fecha: </span><input class='spanBlanco' type='date' id='Fecha0' name='Fecha0' onchange='gMinuta("+suma+");' /></td></tr>");
                        //alert("opc 1");
                    }else{
                        var item2 = results.rows.item(0);
                        var valor = item2.NumeroMinuta;
                       // alert(valor);
                        var sumador = 1;
                        var suma = parseInt(valor) + parseInt(sumador);
                        $("#tablaMinuta tbody").append("<tr><td class='numeric-cell' style='text-align: center;'><input type='text' disabled='true' name='NumeroMinuta"+suma+"' id='NumeroMinuta"+suma+"' value='"+suma+"'></td><td class='numeric-cell' style='text-align: center;'><input class='spanBlanco' type='text' id='Tema"+suma+"' name='Tema"+suma+"' placeholder='Tema:' onchange='gMinuta("+suma+");' /></td><td class='numeric-cell' style='text-align: center;'><input class='spanBlanco' type='text' id='Compromiso"+suma+"' name='Compromiso"+suma+"' placeholder='Compromiso:' onchange='gMinuta("+suma+");' /></td><td class='numeric-cell' style='text-align: center;'><span style='color: #D3D3D3; text-align: rigth;'>Fecha: </span><input class='spanBlanco' type='date' id='Fecha"+suma+"' name='Fecha"+suma+"' onchange='gMinuta("+suma+");' /></td></tr>");
                        //alert("opc 2");
                    }

                },
                function(tx, error){
                    console.log("Error al consultar minuta: " + error.message);
                    app.preloader.hide();
                }
            );
        },
        function(error){},
        function(){}
    );
}

/*aqui*/
function gMinuta(suma){
    var NumeroMinuta = $("#NumeroMinuta"+suma).val();
    var icedula = localStorage.getItem("IdCedulaV");
    var iproyecto = localStorage.getItem("IdProyecto");
    var Tema = $("#Tema"+NumeroMinuta).val();
    var Compromiso = $("#Compromiso"+NumeroMinuta).val();
    var FechaMinuta = $("#Fecha"+NumeroMinuta).val();
    var datomas = suma;
    var sumar = 1;
    var unoMas = parseInt(datomas) + parseInt(sumar);
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql(
                "select * from Minutas WHERE IdProyecto = ?",
                [iproyecto],
                function(tx1, results){
                    var valor = results.rows.length;
                    if(valor > 0){
                        var valor = results.rows.length;
                        var item1 = results.rows.item(0);
                        var proye = item1.IdProyecto;
                        //var ICV = item1.IdCedulaV;
                        //----------------------------------------
                        databaseHandler.db.transaction(
                            function(tx){
                                tx.executeSql(
                                    "SELECT NumeroMinuta FROM Minutas WHERE idProyecto = ? ORDER BY NumeroMinuta DESC LIMIT 1",
                                    [iproyecto],
                                    function(tx, results){
                                        var valor = results.rows.length;
                                        var item2 = results.rows.item(0);
                                        var nm = item2.NumeroMinuta;

                                        //----------------------------------------
                                        if(nm == suma){
                                            databaseHandler.db.transaction(
                                            function(tx1){
                                                tx1.executeSql(
                                                    "UPDATE Minutas SET Tema = ?,Compromiso = ?,FechaMinuta = ? WHERE IdProyecto = ? AND NumeroMinuta = ? ",
                                                    [Tema,Compromiso,FechaMinuta,iproyecto,NumeroMinuta],
                                                    function(tx1, results){
                                                        //app.dialog.alert('Actualizo registro', 'Alerta!');
                                                    }
                                                )},
                                                function(error){},
                                                function(){}
                                            );
                                        }else{
                                            databaseHandler.db.transaction(
                                                function(tx1){
                                                    tx1.executeSql(
                                                        "INSERT INTO Minutas (IdCedulaV,IdProyecto,Tema,Compromiso,FechaMinuta,NumeroMinuta) VALUES (?,?,?,?,?,?)",
                                                        [icedula,proye,Tema,Compromiso,FechaMinuta,datomas],
                                                        function(tx1, results){
                                                            //app.dialog.alert('Inserto Nuevo mismo poryecto', 'Alerta!');
                                                        }
                                                )},
                                                function(error){},
                                                function(){}
                                            );
                                        }
                                    }
                            )},
                            function(error){},
                            function(){}
                        );

                    }else{
                        databaseHandler.db.transaction(
                            function(tx1){
                                tx1.executeSql(
                                    "INSERT INTO Minutas (IdCedulaV,IdProyecto,Tema,Compromiso,FechaMinuta,NumeroMinuta) VALUES (?,?,?,?,?,?)",
                                    [icedula,iproyecto,Tema,Compromiso,FechaMinuta,NumeroMinuta],
                                    function(tx1, results){
                                        //app.dialog.alert('Inserto Nuevo', 'Alerta!');
                                    }
                            )},
                            function(error){},
                            function(){}
                        );
                    }

                }
        )},
        function(error){},
        function(){}
    );
}

function ConsultarMinuta(IdProyecto){
    app.views.main.router.navigate({ name: 'minutas' , params: {IdProyecto: IdProyecto}});
}

function limpiar(){
    $("#NombreRecibe").val("");
    $("#PuestoRecibe").val("");
    $("#Telefono").val("");
    $("#Correo").val("");
    $("#NombreRecibe").css("background-color", "#ffffff");
    $("#PuestoRecibe").css("background-color", "#ffffff");
    $("#Telefono").css("background-color", "#ffffff");
    $("#Correo").css("background-color", "#ffffff");

  }


function gCuestionario(cont){
    var IdCedula = localStorage.getItem("IdCedula");
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("SELECT * FROM Cuestionarios WHERE IdCedula = ?",
            [IdCedula],
            function(tx1, results){
                var valor = results.rows.length;
                if(valor > 0){
                    app.dialog.alert('Se modifico correctamente el cuestionario', 'Aviso!');
                    var checks = "";
                    $('.block input[type=checkbox]').each(function(){
                        checks += $(this).attr("id")+',';
                    });
                    var IdCedula = localStorage.getItem("IdCedula");
                    var IdCte = localStorage.getItem("IdCte");
                    var separados = checks.split(',');
                    for (var i = 0; i < separados.length; i++) {
                        var IdPregunta   = document.getElementById("IdPregunta"+separados[i]).innerHTML;
                        var Texto   = document.getElementById("T"+separados[i]).value;
                        var CB = document.getElementById(separados[i]).checked;
                        Modificar2(CB,Texto,IdCedula,IdPregunta,IdCte);
                    }

                }else{
                    app.dialog.alert('Se registro correctamente el cuestionario', 'Aviso!');
                    var checks = "";
                    $('.block input[type=checkbox]').each(function(){
                        checks += $(this).attr("id")+',';
                    });
                    var IdCuestionario   = document.getElementById("IdCuestionario").innerHTML;
                    var NombreCuestionario   = document.getElementById("NameCuestionario").innerHTML;
                    var Division = localStorage.getItem("Division");
                    var IdCte = localStorage.getItem("IdCte");
                    var IdCedula = localStorage.getItem("IdCedula");

                    var separados = checks.split(',');
                    for (var i = 0; i < separados.length; i++) {
                        var IdPregunta   = document.getElementById("IdPregunta"+separados[i]).innerHTML;
                        var NivelRiesgo   = document.getElementById("NivelRiesgo"+separados[i]).innerHTML;
                        var Texto   = document.getElementById("T"+separados[i]).value;
                        var CB = document.getElementById(separados[i]).checked;
                        var Evidencia = "Photo";
                        //alert(IdCte+","+icedula+","+IdCuestionario+","+Division+","+NombreCuestionario+","+IdPregunta+","+NivelRiesgo+","+Texto + ","+ Check);
                        //alert(IdPregunta+","+Check+","+Texto+","+NivelRiesgo+","+IdCuestionario+","+Division+","+Evidencia);
                        Insert2(IdCedula,IdCte,IdPregunta,CB,Texto,NivelRiesgo,IdCuestionario,Division,Evidencia);
                    }
                }
             }
        )},
    );
}


function gCuestionarioF(cont){
    app.dialog.confirm('Estas seguro de querer salir y guardar?','Aviso!',
        function(){
            //alert("Ok");
            var IdCedula = localStorage.getItem("IdCedula");
            databaseHandler.db.transaction(
                function(tx1){
                    tx1.executeSql("SELECT * FROM Cuestionarios WHERE IdCedula = ?",
                    [IdCedula],
                    function(tx1, results){
                        var valor = results.rows.length;
                        if(valor > 0){
                            var checks = "";
                            $('.block input[type=checkbox]').each(function(){
                                checks += $(this).attr("id")+',';
                            });
                            var IdCedula = localStorage.getItem("IdCedula");
                            var IdCte = localStorage.getItem("IdCte");
                            var separados = checks.split(',');
                            for (var i = 0; i < separados.length; i++) {
                                var IdPregunta   = document.getElementById("IdPregunta"+separados[i]).innerHTML;
                                var Texto   = document.getElementById("T"+separados[i]).value;
                                var CB = document.getElementById(separados[i]).checked;
                                Modificar2(CB,Texto,IdCedula,IdPregunta,IdCte);
                            }

                        }else{
                            var checks = "";
                            $('.block input[type=checkbox]').each(function(){
                                checks += $(this).attr("id")+',';
                            });
                            var IdCuestionario   = document.getElementById("IdCuestionario").innerHTML;
                            var NombreCuestionario   = document.getElementById("NameCuestionario").innerHTML;
                            var Division = localStorage.getItem("Division");
                            var IdCte = localStorage.getItem("IdCte");
                            var IdCedula = localStorage.getItem("IdCedula");

                            var separados = checks.split(',');
                            for (var i = 0; i < separados.length; i++) {
                                var IdPregunta   = document.getElementById("IdPregunta"+separados[i]).innerHTML;
                                var NivelRiesgo   = document.getElementById("NivelRiesgo"+separados[i]).innerHTML;
                                var Texto   = document.getElementById("T"+separados[i]).value;
                                var CB = document.getElementById(separados[i]).checked;
                                var Evidencia = "Photo";
                                //alert(IdCte+","+icedula+","+IdCuestionario+","+Division+","+NombreCuestionario+","+IdPregunta+","+NivelRiesgo+","+Texto + ","+ Check);
                                //alert(IdPregunta+","+Check+","+Texto+","+NivelRiesgo+","+IdCuestionario+","+Division+","+Evidencia);
                                Insert2(IdCedula,IdCte,IdPregunta,CB,Texto,NivelRiesgo,IdCuestionario,Division,Evidencia);
                            }
                        }
                     }
                )},
            );
        },
        function(){
            //alert("Cancel");
        }
    );

}

function Insert2(IdCedula,IdCte,IdPregunta,CB,Texto,NivelRiesgo,IdCuestionario,Division,Evidencia){
    var IdCedula       = IdCedula;
    var IdCte          = IdCte;
    var IdPregunta     = IdPregunta;
    var CB             = CB;
    var Texto          = Texto;
    var NivelRiesgo    = NivelRiesgo;
    var IdCuestionario = IdCuestionario;
    var Division       = Division;
    var Evidencia      = Evidencia;

    //alert(IdCedula+","+IdCte+","+IdPregunta+","+CB+","+Texto+","+NivelRiesgo+","+IdCuestionario+","+Division+","+Evidencia);
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("INSERT INTO Cuestionarios (IdCedula,IdCte,IdPregunta,Checkbox,Texto,NivelRiesgo,IdCuestionario,Division,Evidencia) VALUES (?,?,?,?,?,?,?,?,?)",
                [IdCedula,IdCte,IdPregunta,CB,Texto,NivelRiesgo,IdCuestionario,Division,Evidencia],
                function(tx1, results){
                    //app.dialog.alert('Inserto Nuevo', 'Alerta!');
                    regresarRecorrido();

                }
        )},
        function(error){
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar cuestionario.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );
}

function Modificar2(CB,Texto,IdCedula,IdPregunta,IdCte){
    var IdCedula       = IdCedula;
    var CB             = CB;
    var Texto          = Texto;
    var IdPregunta     = IdPregunta;
    var IdCte          = IdCte;
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("UPDATE Cuestionarios SET Checkbox = ?, Texto = ? WHERE IdCedula = ? AND IdPregunta = ? AND IdCte = ?",
                [CB,Texto,IdCedula,IdPregunta,IdCte],
                function(tx1, results){
                    //app.dialog.alert('Inserto Nuevo', 'Alerta!');
                    regresarRecorrido();
                }
        )},
        function(error){
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al modificar el cuestionario.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );
}




function gAuditoria(){
    var IdCedulaA   = localStorage.getItem("IdCedulaA");
    var IdUsuario   = localStorage.getItem("IdUsuario");
    var Division    = localStorage.getItem("Division");
    var geolocation = $("#geolocation").val();
    var IdCte       = $('#cte').val();
    var Cliente     = $('#Nomcte').val();
    var fecha       = new Date();
    var fFinal      = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();

    if (IdCedulaA > 0 ) {
        localStorage.setItem("IdCedulaA", IdCedulaA);
        app.views.main.router.navigate({name: 'auditoria'});
    }else{
        if (IdCte == "") {
            app.dialog.alert("Favor de seleccionar un cliente","Aviso!")
        }else{
            envio = 0;
            databaseHandler.db.transaction(
                function(tx1){
                    tx1.executeSql(
                        "INSERT INTO RegistroAuditorias (FechaCreacion, IdUsuario, IdCte, Cliente, Division, Geolocalizacion, envio) VALUES (?,?,?,?,?,?,?)",
                        [fFinal,IdUsuario,IdCte,Cliente,Division,geolocation,envio],
                        function(tx, results){

                           //Extraer el ultimo id de la visita
                            databaseHandler.db.transaction(
                                function(tx1){
                                    tx1.executeSql(
                                        "Select MAX(IdCedulaA) as Id from RegistroAuditorias",
                                        [],
                                        function(tx, results){
                                            var length = results.rows.length;
                                            var item3 = results.rows.item(0);
                                            localStorage.setItem("IdCedulaA", item3.Id);
                                            //
                                                var IdCedulaA = item3.Id;
                                                var IdAuditoria = 1;
                                                   //Insertar la auditoria
                                                   app.request.get(cordova.file.externalRootDirectory + '/jsons/PreguntasSegmento.json', function (data1) {
                                                        var content2 = JSON.parse(data1);
                                                        var cont2 = 1;
                                                        var tot = content2.length;

                                                            //console.log(content1[w].IdSegmentoAuditoria);
                                                            for (var j =0; j < content2.length; j++) {
                                                                var IdSegmento = content2[j].IdSegmento;
                                                                var IdPregunta = content2[j].IdPreguntaSegmentoAuditoria;
                                                                var CB = 'false';
                                                                var Valor = '0';
                                                                var Texto = '';
                                                                var Foto = '';
                                                                //alert(content2[j].IdSegmento + " " +content2[j].IdPreguntaSegmentoAuditoria);
                                                               InsertAuditoria(IdCedulaA,IdAuditoria,IdSegmento,IdPregunta,CB,Valor,Texto,Foto);
                                                            }


                                                    });
                                                   //Fin de insertar la auditoria
                                            //
                                            $('.preloader').remove();
                                            $('.infinite-scroll-preloader').remove();

                                            app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
                                            app.views.main.router.navigate({name: 'auditoria'}); //Colocar la pagina que realizaste
                                        },
                                        function(tx, error){
                                            console.log("Error al consultar: " + error.message);
                                        }
                                    );
                                    console.log("Consulta correcta");
                                },
                                function(error){},
                                function(){}
                            );
                           //Fin de extraer el ultimo id de la visita


                        },
                        function(tx, error){
                            console.log("Error al consultar: " + error.message);
                        }
                    );
                    console.log("Consulta correcta");
                });


        }
    }

}


function gAuditoriaResult(cont){

    var IdCedulaA    = localStorage.getItem("IdCedulaA");
    var cont  = cont;
    //alert(IdCedulaA)
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("SELECT * FROM ResultAuditorias where IdCedulaA = ? AND IdSegmento = ?",
                [IdCedulaA, cont],
                function(tx, results){
                    var valorNP = results.rows.length;
                    if(valorNP > 0){
                        var item2 = results.rows.item(0);
                        var Pini = item2.IdPregunta;
                        var rest =1;
                        var PFinal = parseInt(Pini) + (parseInt(valorNP) - parseInt(rest));
                        app.dialog.alert('Se registro correctamente el segmento', 'Aviso!');
                        document.getElementById("imgEstat"+cont).src = "img/circuloVerde.png";
                        var IdAuditoria = document.getElementById("IdAuditoria").innerHTML;
                        var Division    = localStorage.getItem("Division");
                        var checks = "";

                        for(var p=Pini;p<=PFinal; p++){
                            checks += p+',';

                            var IdSegmento = document.getElementById("Segmento"+ p).innerHTML;
                            var CB         = document.getElementById(p).checked;
                            var Foto       = document.getElementById("smallImage"+ p).src;
                            if(Foto == "file:///android_asset/www/menu.html"){
                                Foto = "";
                            }
                            if(CB == false && Foto == ""){
                                  app.dialog.alert("Favor de tomar la foto de la pregunta: "+p +" ya que es requerida.", 'Aviso!');
                              }else{
                                var IdPregunta = document.getElementById("IdPregunta"+p).innerHTML;
                                var Texto      = document.getElementById("T"+p).value;
                                var Valor = 0;
                                if(CB == true){
                                    Valor = 1;
                                }else{
                                    Valor = 0;
                                }
                                //alert(IdCedulaA +" , " +IdSegmento +" , "+IdAuditoria+" , " +IdPregunta + " , "+ CB + " , "+ Valor +" , "+ Texto + " , "+ Foto);
                                 ModificarAuditoria(CB,Valor,Texto,Foto,IdCedulaA,IdPregunta);
                            }
                        }
                    }else{
                        var item2 = results.rows.item(0);
                        var Pini = item2.IdPregunta;
                        var rest =1;
                        var PFinal = parseInt(Pini) + (parseInt(valorNP) - parseInt(rest));
                        app.dialog.alert('Se registro correctamente el segmento', 'Aviso!');
                        document.getElementById("imgEstat"+cont).src = "img/circuloVerde.png";
                        var IdAuditoria = document.getElementById("IdAuditoria").innerHTML;
                        var Division    = localStorage.getItem("Division");
                        var checks = "";

                        for(var p=Pini;p<=PFinal; p++){
                            checks += p+',';

                            var IdSegmento = document.getElementById("Segmento"+ p).innerHTML;
                            var CB         = document.getElementById(p).checked;
                            var Foto       = document.getElementById("smallImage"+ p).src;
                            if(Foto == "file:///android_asset/www/menu.html"){
                                Foto = "";
                            }
                            if(CB == false && Foto == ""){
                                  app.dialog.alert("Favor de tomar la foto de la pregunta: "+p +" ya que es requerida.", 'Aviso!');
                              }else{
                                var IdPregunta = document.getElementById("IdPregunta"+p).innerHTML;
                                var Texto      = document.getElementById("T"+p).value;
                                var Valor = 0;
                                if(CB == true){
                                    Valor = 1;
                                }else{
                                    Valor = 0;
                                }
                                //alert(IdCedulaA +" , " +IdSegmento +" , "+IdAuditoria+" , " +IdPregunta + " , "+ CB + " , "+ Valor +" , "+ Texto + " , "+ Foto);
                                InsertAuditoria(IdCedulaA,IdAuditoria,IdSegmento,IdPregunta,CB,Valor,Texto,Foto);
                            }
                        }
                    } // fin de else


                }
        )},
        function(error){
            console.log("add client error: " + error.message);
          //  app.dialog.alert('Error al insertar auditoria.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );
   ///////////////
   /* databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("SELECT * FROM ResultAuditorias WHERE IdCedulaA = ? AND IdSegmento = ?",
            [IdCedulaA, cont],
            function(tx1, results){
                var valor = results.rows.length;
                if(valor > 0){
                    app.dialog.alert('Se registro correctamente el segmento', 'Aviso!');
                    document.getElementById("imgEstat"+cont).src = "img/circuloVerde.png";
                    var IdAuditoria = document.getElementById("IdAuditoria").innerHTML;
                    var Division    = localStorage.getItem("Division");
                    var checks = "";
                    $('.block input[type=checkbox]').each(function(){
                        checks += $(this).attr("id")+',';
                    });
                    var separados = checks.split(',');
                        for (var i = 0; i < separados.length-1; i++) {
                            var IdSegmento = document.getElementById("Segmento"+ separados[i]).innerHTML;
                            var CB         = document.getElementById(separados[i]).checked;
                            var Foto       = document.getElementById("smallImage"+ separados[i]).src;
                            if(Foto == "file:///android_asset/www/menu.html"){
                                Foto = "";
                            }
                              if(CB == false && Foto == ""){
                                  app.dialog.alert("Favor de tomar la foto de la pregunta: "+separados[i] +" ya que es requerida.", 'Aviso!');
                              }else{
                                var IdPregunta = document.getElementById("IdPregunta"+separados[i]).innerHTML;
                                var Texto      = document.getElementById("T"+separados[i]).value;
                                var Valor = 0;
                                if(CB == true){
                                    Valor = 1;
                                }else{
                                    Valor = 0;
                                }
                                //alert(IdCedulaA +" , " +IdSegmento +" , "+IdAuditoria+" , " +IdPregunta + " , "+ CB + " , "+ Valor +" , "+ Texto + " , "+ Foto);
                                 ModificarAuditoria(CB,Valor,Texto,Foto,IdCedulaA,IdPregunta);
                            }
                        }
                }else{
                    app.dialog.alert('Se registro correctamente el segmento', 'Aviso!');
                    document.getElementById("imgEstat"+cont).src = "img/circuloNaranja.png";
                    var IdAuditoria = document.getElementById("IdAuditoria").innerHTML;
                    var Division    = localStorage.getItem("Division");
                    var checks = "";
                    $('.block input[type=checkbox]').each(function(){
                        checks += $(this).attr("id")+',';
                    });
                    var separados = checks.split(',');
                    for (var i = 0; i < separados.length-1; i++) {
                        var IdSegmento = document.getElementById("Segmento"+ separados[i]).innerHTML;
                        var CB         = document.getElementById(separados[i]).checked;
                        var Foto       = document.getElementById("smallImage"+ separados[i]).src;
                        if(Foto == "file:///android_asset/www/menu.html"){
                            Foto = "";
                        }
                          if(CB == false && Foto == ""){
                              app.dialog.alert("Favor de tomar la foto de la pregunta: "+separados[i] +" ya que es requerida.", 'Aviso!');
                          }else{
                            var IdPregunta = document.getElementById("IdPregunta"+separados[i]).innerHTML;
                            var Texto      = document.getElementById("T"+separados[i]).value;
                            var Valor = 0;
                            if(CB == true){
                                Valor = 1;
                            }else{
                                Valor = 0;
                            }
                            //alert(IdCedulaA +" , " +IdSegmento +" , "+IdAuditoria+" , " +IdPregunta + " , "+ CB + " , "+ Valor +" , "+ Texto + " , "+ Foto);
                            InsertAuditoria(IdCedulaA,IdAuditoria,IdSegmento,IdPregunta,CB,Valor,Texto,Foto);

                        }
                    }

                }
            })
        }
    );   */
}

function InsertAuditoria(IdCedulaA,IdAuditoria,IdSegmento,IdPregunta,CB,Valor,Texto,Foto){
    var IdCedulaA   = IdCedulaA;
    var IdAuditoria = IdAuditoria;
    var IdSegmento  = IdSegmento;
    var IdPregunta  = IdPregunta;
    var CB          = CB;
    var Valor       = Valor;
    var Texto       = Texto;
    var Foto        = Foto;

    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("INSERT INTO ResultAuditorias (IdCedulaA, IdAuditoria, IdSegmento, IdPregunta, CB, Valor, Comentario, Foto) VALUES (?,?,?,?,?,?,?,?)",
                [IdCedulaA,IdAuditoria,IdSegmento,IdPregunta,CB,Valor,Texto,Foto],
                function(tx1, results){
                    //app.dialog.alert('Inserto Nuevo', 'Alerta!');
                    //app.views.main.router.navigate({name: 'menu'});
                }
        )},
        function(error){
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar auditoria.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );
}





function ModificarAuditoria(CB,Valor,Texto,Foto,IdCedulaA,IdPregunta){
    var Foto   = Foto;
    var CB     = CB;
    var Texto  = Texto;
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("UPDATE ResultAuditorias SET CB = ?, Valor = ?, Comentario = ?, Foto = ? WHERE IdCedulaA = ? AND IdPregunta = ?",
                [CB,Valor,Texto,Foto,IdCedulaA,IdPregunta],
                function(tx1, results){
                    //app.dialog.alert('Inserto Nuevo', 'Alerta!');
                }
        )},
        function(error){
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al modificar la auditoria.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );
}


function ResultadosAudi(){
    app.dialog.confirm('Estas seguro de terminar?','Aviso!', function(){
        app.views.main.router.navigate({name: 'resultadosAuditoria'});
    });
}

function CierreAuditoria(){
    var IdCedulaA    = localStorage.getItem("IdCedulaA");
    var fecha       = new Date();
    var fFinal      = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
    var NombreCierre = $("#NombreCierre").val();
    var ComentarioCierre = $("#ComentarioCierre").val();
    var signate = $("#signate").val();

    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("UPDATE RegistroAuditorias SET FechaCierre = ?, NombreCierre = ?, ComentarioCierre = ?, FirmaCierre = ?, envio = 1 WHERE IdCedulaA = ?",
                [fFinal,NombreCierre,ComentarioCierre,signate,IdCedulaA],
                function(tx1, results){
                    app.dialog.alert('Auditoria terminada satisfactoriamente', 'Alerta!');
                    //app.views.main.router.navigate({name: 'menu'});
                    regresar();
                }
        )},
        function(error){
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al cerrar la auditoria.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );
}


function llevarAuditoria(IdCte, IdCedulaA){
    app.dialog.alert(" Puede seguir usando la aplicacion","Enviando.");
    databaseHandler.db.transaction(
        function(tx7){
            tx7.executeSql(
                "UPDATE RegistroAuditorias SET envio = 2 WHERE IdCedulaA = ?",
                [IdCedulaA],
                function(tx7, results){

                }
            );
        }
    );
    var datosRegistroA = new Array();
    var datosAuditoria = new Array();
    var dra = 0;
    var da  = 0;


    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "SELECT * FROM RegistroAuditorias WHERE IdCedulaA = ? ;",
                [IdCedulaA],
                function(tx, results){
                    var length = results.rows.length;

                    for(var i = 0; i< length; i++){
                        var item4 = results.rows.item(i);
                         datosRegistroA[dra] = {'Valor':dra,'FechaCreacion': item4.FechaCreacion,'IdUsuario': item4.IdUsuario,'IdCte':item4.IdCte,'Cliente':item4.Cliente,'Division':item4.Division,'Geolocalizacion':item4.Geolocalizacion,'envio':item4.envio,'FechaCierre':item4.FechaCierre,'NombreCierre':item4.NombreCierre,'ComentarioCierre':item4.ComentarioCierre,'FirmaCierre':item4.FirmaCierre};
                         dra++;
                   }
                   databaseHandler.db.transaction(
                        function(tx){
                            tx.executeSql(
                                "SELECT * FROM ResultAuditorias WHERE IdCedulaA = ?;",
                                [IdCedulaA],
                                function(tx, results){
                                    var length = results.rows.length;

                                    for(var i = 0; i< length; i++){
                                        var item5 = results.rows.item(i);
                                         datosAuditoria[da] = {'Valor':da,'IdCedulaA': item5.IdCedulaA,'IdAuditoria': item5.IdAuditoria,'IdSegmento':item5.IdSegmento,'IdPregunta':item5.IdPregunta,'CB':item5.CB,'Valor':item5.Valor,'Foto':item5.Foto,'Comentario':item5.Comentario};
                                         da++;
                                    }
                                    $.ajax({
                                        type: "POST",
                                        async : true,
                                        url: "http://www.appbennetts.com/VIC/ProcesosVIC7/GuardarAuditorias.php",
                                        dataType: 'html',
                                        data: {'arrayRegistroA': JSON.stringify(datosRegistroA),'arrayAuditoria': JSON.stringify(datosAuditoria)},
                                        success: function(respuesta){
                                            var respu1 = respuesta.split("._.");
                                            var dat1 = respu1[0];
                                            var dat2 = respu1[1];

                                            if(dat1 == "CEDULA"){
                                              if(dat2 > 0){
                                                databaseHandler.db.transaction(
                                                    function(tx7){
                                                        tx7.executeSql(
                                                            "UPDATE RegistroAuditorias SET envio = 3 WHERE IdCedulaA = ?",
                                                            [IdCedulaA],
                                                            function(tx7, results){


                                                            }
                                                        );
                                                    }
                                                );
                                              }
                                            }
                                        }
                                    });
                                },
                                function(tx, error){
                                console.log("add client error: " + error.message);
                                app.dialog.alert('Error al enviar..', 'Error');
                                app.preloader.hide();
                            }
                        );
                    },
                    function(error){},
                    function(){}
                    );
                 },
                function(tx, error){
                console.log("add client error: " + error.message);
                app.dialog.alert('Error al enviar..', 'Error');
                app.preloader.hide();
            }
        );
    },
    function(error){},
    function(){}
    );
}



function editar_fecha(fecha, intervalo, dma, separador) {
    var separador = separador || "-";
    var arrayFecha = fecha.split(separador);
    var dia = arrayFecha[2];
    var mes = arrayFecha[1];
    var anio = arrayFecha[0];

    var fechaInicial = new Date(anio, mes - 1, dia);
    var fechaFinal = fechaInicial;
    if(dma=="m" || dma=="M"){
      fechaFinal.setMonth(fechaInicial.getMonth()+parseInt(intervalo));
    }else if(dma=="y" || dma=="Y"){
      fechaFinal.setFullYear(fechaInicial.getFullYear()+parseInt(intervalo));
    }else if(dma=="d" || dma=="D"){
      fechaFinal.setDate(fechaInicial.getDate()+parseInt(intervalo));
    }else{
       return fecha;
    }
    dia = fechaFinal.getDate();
    mes = fechaFinal.getMonth() + 1;
    anio = fechaFinal.getFullYear();

    dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
    mes = (mes.toString().length == 1) ? mes.toString() : mes;

    return anio + "-" + mes + "-" + dia;
}

function ConsultarAudi(IdCedulaA,IdSegmento, NomSeg){
    var IdCedulaA   = IdCedulaA;
    var IdSegmento  = IdSegmento;
    var NomSeg = NomSeg;
    alert(IdCedulaA);
    alert(IdSegmento);
    alert(NomSeg);
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("select count(*) as tot from ResultAuditorias WHERE IdCedulaA = ? AND IdSegmento = ? AND Valor = 0 AND Foto = ''",
                [IdCedulaA,IdSegmento],
                function(tx1, results){
                    var item4 = results.rows.item(0);
                    alert(item4.tot);
                      $("#AUDITO").append("<ul><li class='accordion-item'><a href='#' class='item-link item-content'><div class='item-media'><img src='img/circuloNaranja.png' width='15px' height='15px' id ='imgEstat"+IdSegmento+"' /></div><div class='item-inner'><div class='item-title'><span id = 'IdSegmento"+IdSegmento+"'>"+IdSegmento+"</span>.- <span id='NameSegmento"+IdSegmento+"'>"+NomSeg+"</span></div></div></a><div><div class='accordion-item-content'><div id='Block"+IdSegmento+"' class='block'></div><br><center><button id='ButtonC"+IdSegmento+"' onclick='gAuditoriaResult("+IdSegmento+");' class='col button button-online button-round button-raised' style='width: 50%'>LISTO</button></center><br></div><br></div></li></ul>");
                    //app.dialog.alert('Inserto Nuevo', 'Alerta!');
                    //app.views.main.router.navigate({name: 'menu'});
                }
        )},
        function(error){
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar auditoria.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );
   /*

   databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("INSERT INTO ResultAuditorias (IdCedulaA, IdAuditoria, IdSegmento, IdPregunta, CB, Valor, Comentario, Foto) VALUES (?,?,?,?,?,?,?,?)",
                [IdCedulaA,IdAuditoria,IdSegmento,IdPregunta,CB,Valor,Texto,Foto],
                function(tx1, results){
                    //app.dialog.alert('Inserto Nuevo', 'Alerta!');
                    //app.views.main.router.navigate({name: 'menu'});
                }
        )},
        function(error){
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar auditoria.', 'Error');
            app.preloader.hide();
        },
        function(){}
    );*/
}

//---------------------------------------------------------------------------Metodos comentados

/*
function llevarTodoSeg(cte, ced){
    var datosce = new Array();
    var datosseg = new Array();

    var ce = 0;
    var s = 0;
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "SELECT * FROM CedulaSeg INNER JOIN Clientes ON CedulaSeg.IdCte = Clientes.IdCte WHERE CedulaSeg.IdCedulaSeg = ?",
                [ced],
                function(tx, results){
                    var length = results.rows.length;
                    for(var i = 0; i< length; i++){
                        var item1 = results.rows.item(i);
                         datosce[ce] = {'Valor':ce,'IdUsuario':item1.IdUsuario,'IdCte':item1.IdCte,'FechaCaptura':item1.FechaCaptura,'Imagen':item1.Imagen,'geolocation': item1.geolocation,'NomComercial': item1.NomComercial,'NomContacto': item1.NomContacto,'Telefono': item1.Telefono,'Email': item1.Email,'Cliente':item1.Cliente,'TipoT':'1', 'FechaCierre': item1.FechaCierre};

                         ce++;
                   }
                   databaseHandler.db.transaction(
                        function(tx){
                            tx.executeSql(
                                "SELECT * FROM Seguimiento WHERE IdCedula = ?",
                                [ced],
                                function(tx, results){
                                    var length = results.rows.length;
                                    for(var i = 0; i< length; i++){
                                        var item3 = results.rows.item(i);
                                         datosseg[s] = {'Valor':s, 'IdCedula': item3.IdCed, 'IdTipoSeguimiento': item3.IdTipoSeguimiento, 'NumTipoSeg':item3.NumTipoSeg,'Otro': item3.Otro,'FotoS':item3.FotoS,'FirmaS':item3.FirmaS,'NombreFirma': item3.NombreFirma,'TipoT': '2'};

                                         s++;
                                   }
                                    $.ajax({
                                        type: "POST",
                                        async : true,
                                        url: "http://serviciosbennetts.com//VIC/guardarCedSegNUEVO.php",
                                        dataType: 'html',
                                        data: {'arrayce': JSON.stringify(datosce),'arrayseg': JSON.stringify(datosseg)},
                                        success: function(respuesta){
                                            //UPDATE
                                            //Cambiar el estatus
                                       // setTimeout(function(){
                                             databaseHandler.db.transaction(
                                            function(tx7){
                                                tx7.executeSql(
                                                    "UPDATE CedulaSeg SET envio = 3 WHERE IdCedulaSeg = ?",
                                                    [ced],
                                                    function(tx7, results){

                                                    }
                                                );
                                            }
                                        );
                                  //  }, 3000);
                                    //Fin de camiar el estatus

                                        }
                                    });

                                    },
                                function(tx, error){
                                    console.log("add client error: " + error.message);
                                    app.dialog.alert('Error al enviar..', 'Error');
                                    app.preloader.hide();
                                }
                            );
                        },
                        function(error){},
                        function(){}
                    );
                },
                function(tx, error){
                    console.log("add client error: " + error.message);
                    app.dialog.alert('Error al enviar..', 'Error');
                    app.preloader.hide();
                }
            );
        },
        function(error){},
        function(){}
    );
}*/


/*function llevarVentaTotal(IdProyecto, IdCedulaV){
    var datospros = new Array();
    var datosproy = new Array();
    var datosven = new Array();
    var datosminu = new Array();
    var pros = 0;
    var proy = 0;
    var ven = 0;
    var minu = 0;
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "SELECT * FROM Prospectos WHERE IdProyecto = ? AND IdCedulaV = ? ;",
                [IdProyecto,IdCedulaV],
                function(tx, results){
                    app.dialog.alert('Enviando. Puede continuar usando la aplicaci\u00f3n.', 'Aviso');
                    var length = results.rows.length;

                    for(var i = 0; i< length; i++){
                        var item4 = results.rows.item(i);
                         datospros[pros] = {'Valor':pros,'IdProyecto': item4.IdProyecto,'IdCedulaV': item4.IdCedulaV,'NombreRecibe':item4.NombreRecibe,'PuestoRecibe':item4.PuestoRecibe,'Telefono':item4.Telefono,'Correo':item4.Correo,'Actividades':item4.Actividades,'FirmaProspecto':item4.FirmaProspecto,'FotoProspecto':item4.FotoProspecto, 'ActividadesNum': item4.ActividadesNum};
                         pros++;
                   }
                   databaseHandler.db.transaction(
                        function(tx){
                            tx.executeSql(
                                "SELECT * FROM Proyectos WHERE IdProyecto = ?;",
                                [IdProyecto],
                                function(tx, results){
                                    var length = results.rows.length;

                                    for(var i = 0; i< length; i++){
                                        var item5 = results.rows.item(i);
                                         datosproy[proy] = {'Valor':proy,'IdProyecto': item5.IdProyecto,'FechaCreacion': item5.FechaCreacion,'NombreProyecto':item5.NombreProyecto,'IdUsuario':item5.IdUsuario,'Estatus':item5.Estatus,'Potencial':item5.Potencial,'SegmentoProyecto':item5.SegmentoProyecto};
                                         proy++;
                                   }
                                   databaseHandler.db.transaction(
                                        function(tx){
                                            tx.executeSql(
                                                "SELECT * FROM VisitasVentas WHERE IdCedulaV = ? AND IdProyecto = ?;",
                                                [IdCedulaV, IdProyecto],
                                                function(tx, results){
                                                    var length = results.rows.length;

                                                    for(var i = 0; i< length; i++){
                                                        var item5 = results.rows.item(i);
                                                         datosven[ven] = {'Valor':ven,'IdCedulaV':item5.IdCedulaV,'IdProyecto': item5.IdProyecto,'FechaVisita': item5.FechaVisita,'Imagen':item5.Imagen,'Geolocalizacion':item5.Geolocalizacion,'envio':item5.envio,'IdUsuario':item5.IdUsuario,'FechaCierre':item5.FechaCierre};
                                                         ven++;
                                                   }
                                                   databaseHandler.db.transaction(
                                                        function(tx){
                                                            tx.executeSql(
                                                                "SELECT * FROM Minutas WHERE IdCedulaV = ? AND IdProyecto = ?;",
                                                                [IdCedulaV, IdProyecto],
                                                                function(tx, results){
                                                                    var length = results.rows.length;

                                                                    for(var i = 0; i< length; i++){
                                                                        var item6 = results.rows.item(i);
                                                                         datosminu[minu] = {'Valor':minu,'IdCedulaV':item6.IdCedulaV,'IdProyecto': item6.IdProyecto,'Tema': item6.Tema,'Compromiso':item6.Compromiso,'FechaMinuta':item6.FechaMinuta,'NumeroMinuta':item6.NumeroMinuta};
                                                                         minu++;
                                                                   }
                                                                     $.ajax({
                                                                        type: "POST",
                                                                        async : true,
                                                                        url: "http://serviciosbennetts.com//VIC/guardarVentasMinu1R.php",
                                                                        dataType: 'html',
                                                                        data: {'arrayprospecto': JSON.stringify(datospros),'arrayproyectos': JSON.stringify(datosproy),'arrayventas': JSON.stringify(datosven),'arrayminutas': JSON.stringify(datosminu)},
                                                                        success: function(respuesta){
                                                                           //Cambiar el estatus
                                                                               // setTimeout(function(){
                                                                                    databaseHandler.db.transaction(
                                                                                        function(tx7){
                                                                                            tx7.executeSql(
                                                                                                "UPDATE VisitasVentas SET envio = 3 WHERE IdCedulaV = ?",
                                                                                                [IdCedulaV],
                                                                                                function(tx7, results){

                                                                                                }
                                                                                            );
                                                                                        }
                                                                                    );
                                                                            //}, 3000);
                                                                            //Fin de camiar el estatus
                                                                        }
                                                                    });
                                                                    },
                                                                function(tx, error){
                                                                console.log("add client error: " + error.message);
                                                                app.dialog.alert('Error al enviar..', 'Error');
                                                                app.preloader.hide();
                                                            }
                                                        );
                                                    },
                                                    function(error){},
                                                    function(){}
                                                    );


                                                },
                                                function(tx, error){
                                                console.log("add client error: " + error.message);
                                                app.dialog.alert('Error al enviar..', 'Error');
                                                app.preloader.hide();
                                            }
                                        );
                                    },
                                    function(error){},
                                    function(){}
                                    );
                                },
                                function(tx, error){
                                console.log("add client error: " + error.message);
                                app.dialog.alert('Error al enviar..', 'Error');
                                app.preloader.hide();
                            }
                        );
                    },
                    function(error){},
                    function(){}
                    );
                 },
                function(tx, error){
                console.log("add client error: " + error.message);
                app.dialog.alert('Error al enviar..', 'Error');
                app.preloader.hide();
            }
        );
    },
    function(error){},
    function(){}
    );
}
*/


/*function llevarTodo(idcte, idcedula){
    var coche = new Array();
    var datosce = new Array();
    var datos = new Array();
    var datos1 = new Array();
    var datosen = new Array();
    var datosal = new Array();
    var datospe = new Array();
    var datospn = new Array();
    var datosci = new Array();
    var datosop = new Array();

    var ce = 0;
    var c = 0;
    var F = 0;
    var en =0;
    var al=0;
    var pe=0;
    var pn=0;
    var ci= 0;
    var op= 0;
    databaseHandler.db.transaction(
    function(tx){
        tx.executeSql(
            "SELECT * FROM Cedula INNER JOIN Clientes ON Cedula.IdCte = Clientes.IdCte WHERE Cedula.IdCedula = ?",
            [idcedula],
            function(tx, results){
                //alert("Entro a Enviar en automatico el AR");
                var length = results.rows.length;
                for(var i = 0; i< length; i++){
                    var item1 = results.rows.item(i);
                     datosce[ce] = {'Valor':ce,'IdCedula':item1.IdCed,'IdUsuario':item1.IdUsuario,'IdCte':item1.IdCte,'FechaCaptura':item1.FechaCaptura,'Imagen':item1.Imagen,'geolocation': item1.geolocation,'NomComercial': item1.NomComercial,'NomContacto': item1.NomContacto,'Telefono': item1.Telefono,'Email': item1.Email,'Cliente':item1.Cliente,'TipoT':'1'};

                     ce++;
               }

                databaseHandler.db.transaction(
                    function(tx2){
                        tx2.executeSql(
                            "SELECT * FROM ced_equipos WHERE IdCedula = ?",
                            [idcedula],
                            function(tx2, results){
                               var form_dataE = new FormData();
                               var length = results.rows.length;
                               var vEqu = 0;
                                for(var i = 0; i< length; i++){
                                    var item3 = results.rows.item(i);
                                    datos[c] = {'Valor':c, 'IdCedula': item3.IdCed, 'IdPrd': item3.IdPrd, 'Cantidad':item3.Cantidad,'Ubicacion': item3.Ubicacion,'ImgPrd':item3.ImgPrd,'Comentario':item3.Comentario,'Tickets':item3.Tickets,'FechaRegistro':item3.FechaRegistro,'checkBox':item3.checkBox,'TipoT': '2'};
                                    c++;
                                    vEqu++;
                                }

                                databaseHandler.db.transaction(
                                    function(tx){
                                        tx.executeSql(
                                            "SELECT * FROM imagen WHERE IdCedula = ?",
                                            [idcedula],
                                            function(tx, results){
                                                var length = results.rows.length;

                                                for(var i = 0; i< length; i++){
                                                    var item4 = results.rows.item(i);
                                                     //datos1[F] = {'Valor':F,'Ubicacion':item3.Ubicacion, 'Cantidad': item3.Cantidad, 'img': item3.IdCedula, 'TipoT': '2'};
                                                     datos1[F] = {'Valor':F,'IdCedula': item4.IdCed,'IdTipoImagen': item4.IdTipoImagen,'Cantidad': item4.Cantidad,'Ubicacion': item4.Ubicacion,'Comentario': item4.Comentario,'FotoImagen': item4.FotoImagen,'checkBox': item4.checkBox,'TipoT': '3'};

                                                     F++;
                                               }
                                               databaseHandler.db.transaction(
                                                        function(tx){
                                                            tx.executeSql(
                                                                "SELECT * FROM entrenamiento WHERE IdCedula = ?",
                                                                [idcedula],
                                                                function(tx, results){
                                                                    var length = results.rows.length;

                                                                    for(var i = 0; i< length; i++){
                                                                        var item4 = results.rows.item(i);
                                                                         datosen[en] = {'Valor':en,'IdCedula': item4.IdCed,'PersonaCapacitada': item4.PersonaCapacitada,'TemaCapacitacion': item4.TemaCapacitacion,'Comentario': item4.Comentario,'ImagenFirma': item4.IdCed,'Puesto': item4.Puesto,'TipoT': '4'};

                                                                         en++;
                                                                   }
                                                                   databaseHandler.db.transaction(
                                                                        function(tx){
                                                                            tx.executeSql(
                                                                                "SELECT * FROM tomaInventario WHERE IdCedula = ?",
                                                                                [idcedula],
                                                                                function(tx, results){
                                                                                    var length = results.rows.length;

                                                                                    for(var i = 0; i< length; i++){
                                                                                        var item4 = results.rows.item(i);
                                                                                         datosal[al] = {'Valor':al,'IdCedula': item4.IdCed,'ImgAlmacen': item4.ImgAlmacen,'Observaciones': item4.Observaciones,'TipoT': '5'};

                                                                                         al++;
                                                                                   }
                                                                                   databaseHandler.db.transaction(
                                                                                        function(tx){
                                                                                            tx.executeSql(
                                                                                                "SELECT * FROM pedido WHERE IdCedula = ?",
                                                                                                [idcedula],
                                                                                                function(tx, results){
                                                                                                    var length = results.rows.length;

                                                                                                    for(var i = 0; i< length; i++){
                                                                                                        var item4 = results.rows.item(i);
                                                                                                         datospe[pe] = {'Valor':pe,'IdCedula': item4.IdCed,'IdCte':item4.IdCte,'IdPrd': item4.IdPrd,'Descripcion':item4.Descripcion,'Inventario': item4.Inventario,'CanSolicitada':item4.CanSolicitada,'Identificador':item4.Identificador,'Observaciones':item4.Observaciones,'Comentario': item4.Comentario,'TipoT': '6'};

                                                                                                         pe++;
                                                                                                   }
                                                                                                   databaseHandler.db.transaction(
                                                                                                        function(tx){
                                                                                                            tx.executeSql(
                                                                                                                "SELECT * FROM prodnvos WHERE IdCedula = ?",
                                                                                                                [idcedula],
                                                                                                                function(tx, results){
                                                                                                                    var length = results.rows.length;

                                                                                                                    for(var i = 0; i< length; i++){
                                                                                                                        var item4 = results.rows.item(i);
                                                                                                                         datospn[pn] = {'Valor':pn,'IdCedula': item4.IdCed,'IdPrd': item4.IdPrd,'Uso':item4.Uso,'Productos': item4.Producto,'Descripcion':item4.Descripcion,'Alta':item4.Alta,'Media':item4.Media,'Baja':item4.Baja,'UsoDirecto':item4.UsoDirecto,'TipoT': '7'};

                                                                                                                         pn++;
                                                                                                                   }

                                                                                                                   databaseHandler.db.transaction(
                                                                                                                        function(tx){
                                                                                                                            tx.executeSql(
                                                                                                                                "SELECT * FROM cierre WHERE IdCedula = ?",
                                                                                                                                [idcedula],
                                                                                                                                function(tx, results){
                                                                                                                                    var length = results.rows.length;

                                                                                                                                    for(var i = 0; i< length; i++){
                                                                                                                                        var item4 = results.rows.item(i);
                                                                                                                                         datosci[ci] = {'Valor':ci,'IdCedula': item4.IdCed,'eval': item4.eval,'cfirma':item4.cfirma,'geolocalizacion': item4.geolocalizacion,'Solestado':item4.Solestado,'coment':item4.coment,'fcierre':item4.fcierre,'envio':item4.envio,'TipoT': '8', 'FechaCierre': item4.FechaCierre, 'NombreFirma': item4.NombreFirma};

                                                                                                                                         ci++;
                                                                                                                                   }
                                                                                                                                   databaseHandler.db.transaction(
                                                                                                                                        function(tx){
                                                                                                                                            tx.executeSql(
                                                                                                                                                "SELECT * FROM ObservacionesPedido WHERE IdCedula = ?",
                                                                                                                                                [idcedula],
                                                                                                                                                function(tx, results){
                                                                                                                                                    var length = results.rows.length;

                                                                                                                                                    for(var i = 0; i< length; i++){
                                                                                                                                                        var item4 = results.rows.item(i);
                                                                                                                                                         datosop[op] = {'Valor':op,'IdCedula': item4.IdCed,'Observaciones':item4.Observaciones,'TipoT': '9'};

                                                                                                                                                         op++;
                                                                                                                                                   }


                                                                                                                                                            $.ajax({
                                                                                                                                                                type: "POST",
                                                                                                                                                                async : true,
                                                                                                                                                                url: "http://serviciosbennetts.com//VIC/GraffitiRos.php",
                                                                                                                                                                dataType: 'html',
                                                                                                                                                                data: {'arrayce': JSON.stringify(datosce),'array': JSON.stringify(datos), 'array1': JSON.stringify(datos1),'arrayen': JSON.stringify(datosen),'arrayal': JSON.stringify(datosal),'arraype': JSON.stringify(datospe),'arraypn': JSON.stringify(datospn),'arrayci': JSON.stringify(datosci),'arrayop': JSON.stringify(datosop)},
                                                                                                                                                                success: function(respuesta){
                                                                                                                                                                    //alert("Cambiar estatus");
                                                                                                                                                                   //setTimeout(function(){
                                                                                                                                                                        databaseHandler.db.transaction(
                                                                                                                                                                            function(tx7){
                                                                                                                                                                                tx7.executeSql(
                                                                                                                                                                                    "UPDATE cierre SET envio = 3 WHERE IdCedula = ?",
                                                                                                                                                                                    [idcedula],
                                                                                                                                                                                    function(tx7, results){

                                                                                                                                                                                    }
                                                                                                                                                                                );
                                                                                                                                                                            }
                                                                                                                                                                        );
                                                                                                                                                                   // }, 3000);

                                                                                                                                                                }
                                                                                                                                                            });


                                                                                                                                                         },


                                                                                                                                                function(tx, error){
                                                                                                                                                console.log("add client error: " + error.message);
                                                                                                                                                app.dialog.alert('Error al enviar..', 'Error');
                                                                                                                                                app.preloader.hide();
                                                                                                                                            }
                                                                                                                                        );
                                                                                                                                    },
                                                                                                                                    function(error){},
                                                                                                                                    function(){}
                                                                                                                                        );

                                                                                                                                    },
                                                                                                                                function(tx, error){
                                                                                                                                console.log("add client error: " + error.message);
                                                                                                                                app.dialog.alert('Error al enviar..', 'Error');
                                                                                                                                app.preloader.hide();
                                                                                                                            }
                                                                                                                        );
                                                                                                                    },
                                                                                                                    function(error){},
                                                                                                                    function(){}
                                                                                                                        );
                                                                                                                    },
                                                                                                            function(tx, error){
                                                                                                                console.log("add client error: " + error.message);
                                                                                                                app.dialog.alert('Error al enviar..', 'Error');
                                                                                                                app.preloader.hide();
                                                                                                            }
                                                                                                        );
                                                                                                    },
                                                                                                    function(error){},
                                                                                                    function(){}
                                                                                                        );
                                                                                                    },
                                                                                                    function(tx, error){
                                                                                                        console.log("add client error: " + error.message);
                                                                                                        app.dialog.alert('Error al enviar..', 'Error');
                                                                                                        app.preloader.hide();
                                                                                                    }
                                                                                                );
                                                                                            },
                                                                                            function(error){},
                                                                                            function(){}
                                                                                                );
                                                                                    },
                                                                                    function(tx, error){
                                                                                        console.log("add client error: " + error.message);
                                                                                        app.dialog.alert('Error al enviar..', 'Error');
                                                                                        app.preloader.hide();
                                                                                    }
                                                                                );
                                                                            },
                                                                            function(error){},
                                                                            function(){}
                                                                            );
                                                                     },
                                                            function(tx, error){
                                                                console.log("add client error: " + error.message);
                                                                app.dialog.alert('Error al enviar..', 'Error');
                                                                app.preloader.hide();
                                                            }
                                                        );
                                                    },
                                                    function(error){},
                                                    function(){}
                                                    );

                                            },
                                            function(tx, error){
                                                console.log("add client error: " + error.message);
                                                app.dialog.alert('Error al enviar..', 'Error');
                                                app.preloader.hide();
                                            }
                                        );
                                    },
                                    function(error){},
                                    function(){}
                                    );

                                //alert(coche["Ubicacion"]);

                            },
                                function(tx, error){
                                    console.log("add client error: " + error.message);
                                    app.dialog.alert('Error al enviar..', 'Error');
                                    app.preloader.hide();
                                }
                            );
                        },
                        function(error){},
                        function(){}
                        );
            },
            function(tx, error){
                console.log("add client error: " + error.message);
                app.dialog.alert('Error al enviar..', 'Error');
                app.preloader.hide();
            }
        );
    },
    function(error){},
    function(){}
    );
}*/




/*function Reportepdf(IdCed){
  //  window.location.href = "http://serviciosbennetts.com//VIC/CrearPDF.php?IdCed="+IdCed;
    $.ajax({
        type: "GET",
        url: "http://serviciosbennetts.com//VIC/CrearPDF_F.php",
        dataType: 'html',
        data: {'IdCed':IdCed} ,
        success: function(respuesta){

        }
    });
}
function ReportepdfSeg(IdCed){
  //  window.location.href = "http://serviciosbennetts.com//VIC/CrearPDF.php?IdCed="+IdCed;
    $.ajax({
        type: "GET",
        url: "http://serviciosbennetts.com//VIC/CrearPDFSeg.php",
        dataType: 'html',
        data: {'IdCed':IdCed} ,
        success: function(respuesta){

        }
    });
}*/

//Hacer que funcione para Visualizar el PDF
/*function openPrompt(IdCed){
    app.dialog.prompt('Ingresa tu correo:','Aviso!', function (correo) {
        app.dialog.confirm('Esta seguro que el correo es " ' + correo + ' "?','Confirmaci\u00f3n',function () {
            app.dialog.alert('Correo enviado a: ' + correo,'Listo!');
            $.ajax({
                type: "GET",
                url: "http://serviciosbennetts.com//VIC/EnviarPDF.php",
                dataType: 'html',
                data: {'IdCed':IdCed,'correo':correo} ,
                success: function(respuesta){

                }
            });
        });
    });
}*/

/*LO COMENTE 12072019 function EnviarReportepdf(IdCed){
  app.dialog.alert('Se envio el PDF.', 'Aviso');
    $.ajax({
        type: "GET",
        url: "http://serviciosbennetts.com//VIC/CrearPDF.php",
        dataType: 'html',
        data: {'IdCed':IdCed} ,
        success: function(respuesta){



        }
    });
}*/
