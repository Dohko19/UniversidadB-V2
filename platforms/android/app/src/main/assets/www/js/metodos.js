
//id_usuario
var IdUsuario = localStorage.getItem("id");
    $("#IdUsuario").val(IdUsuario);
    //Borrar variable de sesión
function logaout(){
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("last_name");
    window.localStorage.removeItem("active");
    window.localStorage.removeItem("avatar");
    window.localStorage.removeItem("role_id");
    window.localStorage.removeItem("last_login");
    window.localStorage.removeItem("status_course");
    window.localStorage.removeItem("role_name");
    window.localStorage.removeItem("role_displayName");
    window.localStorage.removeItem("id_role");
    window.localStorage.removeItem("first_login");
    window.localStorage.removeItem("idCuestionario");
    window.location.href = "index.html";
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
                        //alert(IdEliminar);
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

function regresarRecorrido(){
            app.views.main.router.back('/recorrido/', {force: true, ignoreCache: true, reload: true});

        }
function regresarRecorridoSEG(){
    app.views.main.router.back('/recorridoseg/', {force: true, ignoreCache: true, reload: true});

}

function horizontal(){
    screen.orientation.lock('landscape');
}

function ConsultarMinuta(IdProyecto){
    app.views.main.router.navigate({ name: 'minutas' , params: {IdProyecto: IdProyecto}});
}
//Universidad bennnettttsstl
function learn(id)
{
    var networkState = navigator.connection.type;

    if (networkState !== Connection.NONE) {

    var user_id = localStorage.getItem("id");
    app.request.promise.post('http://serviciosbennetts.com/universidadBennetts/courses/update.php', {user_id: user_id, lesson_id: id})
        .then(function (res) {
            var toastTop = app.toast.create({
                text: 'La leccion fue maracada como completada ' ,
                position: 'top',
                closeTimeout: 1500,
            });
            toastTop.open();
            var inp = $("#complete"+id);
            inp.attr("disabled", !inp.prop('disabled'));
            $("#questionaire").show();
            $("#nota").hide();
            // document.getElementById("showQuests").style.display = "block";
        })
        .catch(function (err) {

            Swal.fire(
                'Upps!',
                'Ocurrio un error intentando marcar esta leccion para completada, intenta de nuevo mas tarde',
                'error'
            );

            // var inp = $("#complete"+id);
            // inp.attr("disabled", inp.prop('disabled'));
            console.log(err.xhr);
            console.log(err.status);
            console.log(err.message);
        });
    }
    else {

        app.views.main.router.navigate( {name: 'inicio' } );
    }
}


//-----------------------------------------------------------
function registerQuest(lesson_id, course_id){

    var now = new Date();
    var idCuestionario = localStorage.getItem('idCuestionario');

    var user_id = localStorage.getItem("id");
    var idCurso = course_id;
    var fecha = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    var fechaF = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();

    const date = new Date();
    const dayOff = offDays(date, 0);
    databaseHandler.db.transaction(
        function (tx1) {
                tx1.executeSql("SELECT lesson_id, idCuestionario, dateF, status, dateF FROM register WHERE lesson_id = ? AND dateF = ?",
                [lesson_id, dayOff],
                function (tx, resultsA){
                    var length = resultsA.rows.length;
                    var item3;
                    var dateF;
                    var status, course_id;
                    for(var i = 0; i< length; i++) {
                         item3 = resultsA.rows.item(i).lesson_id;
                         dateF = resultsA.rows.item(i).dateF;
                        status = resultsA.rows.item(i).status;
                        course_id = resultsA.rows.item(i).course_id;

                    }
                    if (status == 1 || status == 2 && dateF == dayOff)
                    {
                        $("#Questions").hide();
                        $("#primary-title").hide();
                        $("#note").hide();
                        $("#enviarCuestionario").hide();
                        // $("#success").append('<div style="background-color: forestgreen; color: #FFFFFF;" ><p style="color: #FFFFFF;"> En hora buena.Haz completado este cuestionario, vuelve el dia de mañana para repetirlo</p></div>');
                        if(courseid >= 78 && courseid <= 99){

                            Swal.fire('Enhorabuena!', '¡Haz completado este cuestionario, vuelve el dia de mañana para repetirlo', 'success');
                            app.views.main.router.navigate( { name: 'TecnicasLimpieza' , params: {id: 2} } );
                        }else{
                            Swal.fire('Enhorabuena!', '¡Haz completado este cuestionario, vuelve el dia de mañana para repetirlo', 'success');
                            app.views.main.router.navigate( { name: 'Induccion' , params: {id: 1} } );
                        }
                        //
                    }
                    else {
                        // alert('nope' + dateF + dayOff);
                        // alert(status);
                    }

                    if (length > 0 && lesson_id === item3 && dateF === dayOff) {
                        tx1.executeSql("UPDATE register SET updated_at = ? WHERE lesson_id = ?",
                            [fecha, lesson_id],
                            function (tx1, results) {
                                databaseHandler.db.transaction(
                                    function (tx) {
                                        tx.executeSql("SELECT MAX(idCuestionario) as Id, status FROM register",
                                            [],
                                            function (tx, results) {

                                                var length = results.rows.length;
                                                var item = results.rows.item(0);
                                                // alert(item.Id)
                                                localStorage.setItem("idCuestionario", item.Id);
                                                var idC = localStorage.getItem("idCuestionario");
                                            databaseHandler.db.transaction(
                                                function (tx1) {
                                                //answer_id == lesson ID
                                                tx1.executeSql("SELECT question_id, answer, answer_id, user_id, idCuestionario FROM answer_user WHERE idCuestionario = ? AND user_id = ? AND dateF = ?",
                                                    [idC, user_id, dayOff],
                                                    function (tx1, resultsQ) {

                                                        var questionId,ans,ansId;
                                                        var length = resultsQ.rows.length;
                                                        for (var i = 0; i < length; i++)
                                                        {
                                                            questionId = resultsQ.rows.item(i).question_id;
                                                            ans = resultsQ.rows.item(i).answer;
                                                            ansId = resultsQ.rows.item(i).answer_id;
                                                            console.log(i);
                                                            console.log("questionID: " +questionId);
                                                            // alert("id cuestion" + questionId);
                                                            // var questnum =  $("#"+questionId).attr('data-ansId');
                                                            // alert("id data n" + questnum);
                                                            console.log("ansId: " +ansId);
                                                            // console.log("questnum:" + questnum);
                                                            $("#"+ansId).attr('disabled', true);

                                                            $('input[name=pregunta'+questionId+']').attr("disabled",true);


                                                                 // $('input[data-ansId='+questnum+']').attr("checked", true);
                                                            var check = $('input[data-ansId='+ansId+']').attr("checked", true);
                                                            if(check)
                                                            {
                                                                $("#sendQuest").attr('disabled', false);
                                                            }
                                                            if(ans == 1)
                                                            {
                                                                $('#label'+ansId).css("background-color", "#2eff2b47");
                                                            }
                                                            else{
                                                                $('#label'+ansId).css("background-color", "#ff757540");

                                                            }
                                                        }
                                                    }
                                                )
                                                },
                                                function (error) {
                                                    console.log("add client error: " + error.message);
                                                    app.dialog.alert('Error al insertar registro. in data request for input check', 'Error');
                                                    app.preloader.hide();
                                                });
                                            });
                                    });
                            }
                        )
                    }
                    else {
                        tx1.executeSql("INSERT INTO register(idUser, status, lesson_id, course_id,  created_at, dateF ) VALUES (?,?,?,?,?,?)",
                            [user_id, 0, lesson_id, idCurso, fecha, fechaF],
                            function (tx1, results) {
                                databaseHandler.db.transaction(
                                    function (tx) {
                                        tx.executeSql("SELECT MAX(idCuestionario) as Id FROM register",
                                            [],
                                            function (tx, results) {
                                                var length = results.rows.length;
                                                var item = results.rows.item(0);
                                                // alert("insert new"+item.Id)
                                                localStorage.setItem("idCuestionario", item.Id);
                                                localStorage.getItem("idCuestionario");
                                            })
                                    },function (error) {
                                        console.log("add client error: " + error.message);
                                        app.dialog.alert('Error al insertar registro. new idcuest', 'Error');
                                        app.preloader.hide();
                                });
                            }
                        )
                    }
                })
        },
        function (error) {
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar registro. ccc2', 'Error');
            app.preloader.hide();
        }
    );
}

function saveQuest(el, ansId)
{
    console.log(el);
    console.log(el.value);
    console.log(el.id);
    console.log(el.name);
    console.log(ansId);

    var fecha = new Date();
    var user_id = localStorage.getItem("id");
    var idCuestionario = localStorage.getItem("idCuestionario");
    var question_id = el.id;
    var answer = el.value;
    var answerId = ansId;
    var created_at = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
    var dateFNow = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();
    var date = new Date();
    var dateY = offDays(date, 0);

    databaseHandler.db.transaction(
        function (tx1) {
            tx1.executeSql("SELECT question_id, user_id, dateF, answer FROM answer_user WHERE question_id = ? AND user_id = ?",
                [question_id, user_id],
                function (tx, resultsA) {
                    var length = resultsA.rows.length;
                    var dateF, questionId, userId;
                    for(var w = 0; w< length; w++) {
                        questionId = resultsA.rows.item(w).question_id
                        dateF = resultsA.rows.item(w).dateF
                        userId = resultsA.rows.item(w).user_id
                    }

                    if (length > 0 && questionId == question_id && userId === user_id && dateF === dateY)
                    {
                        tx1.executeSql("UPDATE answer_user SET answer_id = ?, answer = ?, updated_at = ? WHERE question_id = ?",
                            [answerId, answer, created_at, question_id],
                        function (tx1, resultsB){
                            if(answer == 1)
                            {
                                $('#label'+answerId).css("background-color", "#2eff2b47");
                            }
                            else{
                                $('#label'+answerId).css("background-color", "#ff757540");

                            }

                            $('input[name=pregunta'+question_id+']').attr("disabled",true);
                        })
                    }
                    else {
                        tx1.executeSql("INSERT INTO answer_user(idCuestionario, answer, question_id, user_id, answer_id, created_at, dateF ) VALUES (?,?,?,?,?,?,?)",
                            [idCuestionario, answer, question_id, user_id, answerId, created_at, dateFNow],
                            function (tx1, results) {
                            if(answer == 1)
                            {
                                $('#label'+answerId).css("background-color", "#2eff2b47");
                            }
                            else{
                                $('#label'+answerId).css("background-color", "#ff757540");

                            }
                                $('input[name=pregunta'+question_id+']').attr("disabled",true);
                            }
                        )
                    }
                var ql = $('input[name=pregunta'+question_id+']').length;
                    if (ql > 1){
                        $("#sendQuest").attr('disabled', false);
                    }

                })

        },
        function (error) {
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar registro.', 'Error');
            app.preloader.hide();
        },
        function () {
        }
    );
}



function removeFirstLogin(id) {
    var id = localStorage.getItem("id");

    app.request.promise.post('http://serviciosbennetts.com/universidadBennetts/firstLogin.php', {id: id})
        .then(function (res) {
            console.log("loginUpdate");
        })
        .catch(function (err) {
            console.log(err.xhr);
            console.log(err.status);
            console.log(err.message);
        });
}

function offDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() - days)
    const ppy = copy.getFullYear()+"-"+(copy.getMonth()+1)+"-"+copy.getDate();
    // return copy
    return ppy
}


// function validarRespuestas(course_id,catId){
//     var idCuestionario = localStorage.getItem('idCuestionario');
//     databaseHandler.db.transaction(
//         function (tx4) {
//             tx4.executeSql("SELECT * FROM answer_user WHERE idCuestionario = ? ",
//                 [idCuestionario],
//                 function (tx4, results) {
//
//                     var lengthNEW = results.rows.length;
//                     if(lengthNEW > 0 ){
//                         EnviarCuestionario(course_id, catId);
//                     }else{
//                         alert("Favor de seleccionar al menos una respuesta");
//                     }
//                 }
//             )},
//         function (tx4, error) {
//             console.log("Error no contiene respuestas: " + error.message);
//         }
//     );
// }

function EnviarCuestionario(course_id, catId){
    let categoryId = catId;
    var idCuestionario = localStorage.getItem('idCuestionario');
    var answersArray = [];
    var a = 0;
    var courseID = course_id;
    const dateNow = new Date();
    const now = offDays(dateNow, 0);
    var networkState = navigator.connection.type;

    if (networkState !== Connection.NONE) {
        Swal.fire({
            title: '¿Estas seguro de enviar el cuestionario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Enviar`,
            denyButtonText: `No enviar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $("#Questions").hide();
                $("#primary-title").hide();
                $("#enviarCuestionario").hide();

                $("#success").append('<div style="background-color: green;"><p style="color: #FFFFFF;"> En hora buena.Haz completado este cuestionario, vuelve el dia de mañana para repetirlo</p></div>');
                databaseHandler.db.transaction(
                    function (tx1) {
                        tx1.executeSql("UPDATE register SET status = 1 WHERE idCuestionario = ?",
                            [idCuestionario],
                            function (tx, resultsAZ) {
                                databaseHandler.db.transaction(
                                    function (tx1) {
                                        tx1.executeSql("SELECT * FROM answer_user as r WHERE idCuestionario = ?",
                                            [idCuestionario],
                                            function (tx, resultsA) {
                                                var length = resultsA.rows.length;

                                                for (var i = 0; i < length; i++) {
                                                    var item4 = resultsA.rows.item(i);
                                                    answersArray[a] = {
                                                        'valor:': a,
                                                        'question_id': item4.question_id,
                                                        'user_id': item4.user_id,
                                                        'answer': item4.answer,
                                                        'answer_id': item4.answer_id,
                                                        'created_at': item4.created_at,
                                                        'updated_at': item4.updated_at,
                                                        'dateF': item4.dateF
                                                    };
                                                    a++;
                                                }
                                                // console.log(JSON.stringify(answersArray));

                                                $.ajax({
                                                    type: "POST",
                                                    async: true,
                                                    url: "http://serviciosbennetts.com/universidadBennetts/questionaires/store.php",
                                                    data: {'arrayAQ': JSON.stringify(answersArray)},
                                                    success: function (respuesta) {
                                                        console.log(respuesta);
                                                        var respu1 = respuesta.split("._.");
                                                        var dat1 = respu1[0];
                                                        var dat2 = respu1[1];
                                                        var dat3 = respu1[2];

                                                        if (dat1 == "REPORTE") { //El texto que se ocncateno
                                                            if (dat2 > 0) { // Ultimo Id Insrtado o consultado

                                                                if (dat3) {

                                                                    databaseHandler.db.transaction(
                                                                        function (tx7) {
                                                                            tx7.executeSql("UPDATE register SET status = 2 WHERE idCuestionario = ?",
                                                                                [idCuestionario],
                                                                                function (tx7, results) {
                                                                                    databaseHandler.db.transaction(
                                                                                        function (tx1) {
                                                                                            // PERFECTO AMIGO ESTE MISMO ESTATTUS VA A SER ESTE MIRA
                                                                                            tx1.executeSql("UPDATE register SET status = 2 WHERE idCuestionario = ?",
                                                                                                [idCuestionario],
                                                                                                function (tx, resultsA) {
                                                                                                    learn(courseID);
                                                                                                    let timerInterval
                                                                                                    Swal.fire({
                                                                                                        title: 'Aviso:!',
                                                                                                        html: 'Guardando <b></b>',
                                                                                                        timer: 100,
                                                                                                        timerProgressBar: true,
                                                                                                        willOpen: () => {
                                                                                                            Swal.showLoading()
                                                                                                            timerInterval = setInterval(() => {
                                                                                                                const content = Swal.getContent()
                                                                                                                if (content) {
                                                                                                                    const b = content.querySelector('b')
                                                                                                                    if (b) {
                                                                                                                        b.textContent = Swal.getTimerLeft()
                                                                                                                    }
                                                                                                                }
                                                                                                            }, 100)
                                                                                                        },
                                                                                                        willClose: () => {
                                                                                                            clearInterval(timerInterval)
                                                                                                        }
                                                                                                    }).then((result) => {
                                                                                                        if (result.dismiss === Swal.DismissReason.timer) {
                                                                                                            databaseHandler.db.transaction(
                                                                                                                function (tx1) {
                                                                                                                    tx1.executeSql("INSERT INTO courses_finish (course_id, dateF, finish) VALUES (?,?,?)",
                                                                                                                        [courseID, now, 1],
                                                                                                                        function (tx, resultsA) {
                                                                                                                            if (course_id >= 78 && course_id <= 99) {
                                                                                                                                app.views.main.router.navigate({
                                                                                                                                    name: 'TecnicasLimpieza',
                                                                                                                                    params: {id: 2}
                                                                                                                                });
                                                                                                                            } else {
                                                                                                                                app.views.main.router.navigate({
                                                                                                                                    name: 'Induccion',
                                                                                                                                    params: {id: 1}
                                                                                                                                });
                                                                                                                            }

                                                                                                                            // var length = resultsA.rows.length;
                                                                                                                            // var dateF, course_id, finish;
                                                                                                                            // for(var w = 0; w< length; w++) {
                                                                                                                            //     course_id = resultsA.rows.item(w).course_id
                                                                                                                            //     dateF = resultsA.rows.item(w).dateF
                                                                                                                            //     finish = resultsA.rows.item(w).finish
                                                                                                                            // }
                                                                                                                            // Swal.fire('Guardado!', '', 'success');
                                                                                                                            //
                                                                                                                            // if(course_id >= 78 && course_id <= 99)
                                                                                                                            // {
                                                                                                                            //     app.views.main.router.navigate( { name: 'TecnicasLimpieza' , params: {id: 2} } );
                                                                                                                            // }else{
                                                                                                                            //     app.views.main.router.navigate( { name: 'Induccion' , params: {id: 1} } );
                                                                                                                            // }

                                                                                                                        })
                                                                                                                },
                                                                                                                function (error) {
                                                                                                                    console.log("add client error: " + error.message);
                                                                                                                    app.dialog.alert('Error al insertar registro.', 'Error');
                                                                                                                    app.preloader.hide();
                                                                                                                    Swal.fire('Guardado!', 'Puedes seguir usando la aplicacion.', 'warning')

                                                                                                                },
                                                                                                                function () {
                                                                                                                });
                                                                                                        }
                                                                                                    }) //END SWAL FIRE
                                                                                                        .catch((err) => {
                                                                                                            Swal.fire('Algo salio mal :(', err, 'error')
                                                                                                        })

                                                                                                })

                                                                                        },
                                                                                        function (error) {
                                                                                            console.log("add client error: " + error.message);
                                                                                            app.dialog.alert('Error al insertar registro.', 'Error');
                                                                                            app.preloader.hide();
                                                                                        },
                                                                                        function () {
                                                                                        });
                                                                                }
                                                                            )
                                                                        } //awebo xd puebamelo
                                                                        //XD
                                                                    );
                                                                } else {
                                                                    Swal.fire('Error al guardar!', 'Intenalo mas tarde 2', 'error')
                                                                }
                                                            } else {
                                                                Swal.fire('Error al guardar!', 'Intenalo mas tarde 3', 'error')
                                                            }
                                                        } else {
                                                            Swal.fire('Error al guardar!', 'Intenalo mas tarde4', 'error')
                                                        }
                                                    },
                                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                        $("#preguntas").hide();
                                                        $("#success").append('<p>Haz completado este cuestionario, vuelve el dia de mañana para repetirlo</p>');
                                                        databaseHandler.db.transaction(
                                                            function (tx1) {
                                                                tx1.executeSql("INSERT INTO courses_finish (course_id, dateF, finish) VALUES (?,?,?)",
                                                                    [courseID, now, 1],
                                                                    function (tx, resultsA) {
                                                                        var length = resultsA.rows.length;
                                                                        var dateF, course_id, finish;
                                                                        for (var w = 0; w < length; w++) {
                                                                            course_id = resultsA.rows.item(w).course_id
                                                                            dateF = resultsA.rows.item(w).dateF
                                                                            finish = resultsA.rows.item(w).finish
                                                                        }
                                                                        Swal.fire('Warning!', 'Tenemos problemas para enviar tu encuesta, nosotros lo haremos por ti mas tarde o cuando tengas una conexion a internet estable', 'warning');

                                                                        if (course_id >= 78 && course_id <= 99) {
                                                                            app.views.main.router.navigate({
                                                                                name: 'TecnicasLimpieza',
                                                                                params: {id: 2}
                                                                            });
                                                                        } else {
                                                                            app.views.main.router.navigate({
                                                                                name: 'Induccion',
                                                                                params: {id: 1}
                                                                            });
                                                                        }

                                                                    })
                                                            },
                                                            function (error) {
                                                                console.log("add client error: " + error.message);
                                                                app.dialog.alert('Error al insertar registro.', 'Error');
                                                                app.preloader.hide();
                                                                Swal.fire('Guardado!', 'Puedes seguir usando la aplicacion.', 'warning')

                                                            },
                                                            function () {
                                                            });
                                                        // Swal.fire('Enhorabuena!', 'Haz completado este cuestionario, vuelve el dia de mañana para repetirlo', 'success')

                                                    }
                                                })
                                            })

                                    },
                                    function (error) {
                                        console.log("add client error: " + error.message);
                                        app.dialog.alert('Error al insertar registro.', 'Error');
                                        app.preloader.hide();

                                    }
                                )

                            })

                    },
                    function (error) {
                        console.log("add client error: " + error.message);
                        app.dialog.alert('Error al insertar registro.', 'Error');
                        app.preloader.hide();
                    },
                    function () {
                    }
                );

            } else if (result.isDenied) {
                Swal.fire('Los cambios no se guardaron', '', 'info')
            }
        })
    }
    else {
        Swal.fire('Error', 'Necesitas una conexion a internet para enviar el cuestionario, tus respuestas estan a salvo', 'error')
        app.views.main.router.navigate( {name: 'inicio' } );
    }
}

function goBackxtwo()
{
    history.go(-2);
    navigator.app.backHistory();
}

function EvniarCuestionarioBack() {
    let userId = localStorage.getItem('id');
    databaseHandler.db.transaction(
        function (tx4) {                                    //regisstro            //seguimeinto                                         //Cierre
            tx4.executeSql("SELECT r.course_id as courseid, r.status, r.idUser, r.idCuestionario AS cuestionarioId, au.user_id, au.idCuestionario FROM register as r LEFT OUTER JOIN answer_user as au on cuestionarioId = au.idCuestionario WHERE user_id = ? AND r.status = 1 GROUP BY cuestionarioId",
                [userId],
                function (tx4, results) {
                    var length = results.rows.length;

                    for (var i = 0; i < length; i++) {
                        var item2 = results.rows.item(i);
                        // databaseHandler.db.transaction(
                        //     function (tx7) {
                        //         tx7.executeSql("UPDATE register SET status = 2 WHERE idCuestionario = ?", [item2.cuestionarioId],
                        //             function (tx7, results) {
                        //                 //alert("LISTO");
                        //             }
                        //         );
                        //     }
                        // );
                        storeQuestions(item2.cuestionarioId, item2.courseid);
                    }
                },
                function (tx4, error) {
                    console.log("Error al guardar registro: " + error.message);
                }
            );
        },
        function (error) {
        },
        function () {
        }
    );
}

function storeQuestions(questionId, courseID){
    let cuestionarioId = questionId;
    var answersArray = [];
    var a = 0;

    const dateNow = new Date();
    const now = offDays(dateNow, 0);

    databaseHandler.db.transaction(
        function (tx1) {
            tx1.executeSql("SELECT * FROM answer_user as r WHERE idCuestionario = ?",
                [cuestionarioId],
                function (tx, resultsA) {
                    var length = resultsA.rows.length;

                    for(var i = 0; i< length; i++) {
                        var item4 = resultsA.rows.item(i);
                        answersArray[a] = {'valor:': a, 'question_id': item4.question_id, 'user_id': item4.user_id, 'answer': item4.answer, 'answer_id': item4.answer_id, 'created_at': item4.created_at, 'updated_at': item4.updated_at, 'dateF': item4.dateF};
                        a++;
                    }
                    // console.log(JSON.stringify(answersArray));

                    $.ajax({
                        type: "POST",
                        async: true,
                        url: "http://serviciosbennetts.com/universidadBennetts/questionaires/store.php",
                        data: { 'arrayAQ': JSON.stringify(answersArray) },
                        success: function(respuesta) {
                            console.log(respuesta);
                            var respu1 = respuesta.split("._.");
                            var dat1 = respu1[0];
                            var dat2 = respu1[1];
                            var dat3 = respu1[2];

                            if(dat1 == "REPORTE"){
                                if(dat2 > 0){
                                    if(dat3){
                                        databaseHandler.db.transaction(
                                            function(tx7){
                                                tx7.executeSql("UPDATE register SET status = 2 WHERE idCuestionario = ?",
                                                    [cuestionarioId],
                                                    function(tx7, results){
                                                        databaseHandler.db.transaction(
                                                            function (tx1) {
                                                                tx1.executeSql("UPDATE register SET status = 2 WHERE idCuestionario = ?",
                                                                    [cuestionarioId],
                                                                    function (tx, resultsA) {
                                                                        tx.executeSql("INSERT INTO courses_finish (course_id, dateF, finish) VALUES (?,?,?)",
                                                                            [courseID, now, 1],
                                                                            function (tx, resultsA) {
                                                                                var length = resultsA.rows.length;
                                                                                var dateF, course_id, finish;
                                                                                for(var w = 0; w< length; w++) {
                                                                                    course_id = resultsA.rows.item(w).course_id
                                                                                    dateF = resultsA.rows.item(w).dateF
                                                                                    finish = resultsA.rows.item(w).finish
                                                                                }
                                                                            })
                                                                    })

                                                            },
                                                            function (error) {
                                                                console.log("add client error: " + error.message);
                                                                app.dialog.alert('Error al insertar registro.', 'Error');
                                                                app.preloader.hide();
                                                            },
                                                            function () {
                                                            });
                                                    }
                                                )} //awebo xd puebamelo
                                            //XD
                                        );
                                    }else { Swal.fire('Error al guardar!', 'Intenalo mas tarde 2', 'error') }
                                }else { Swal.fire('Error al guardar!', 'Intenalo mas tarde 3', 'error') }
                            }else { Swal.fire('Error al guardar!', 'Intenalo mas tarde4', 'error') }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            databaseHandler.db.transaction(
                                function (tx1) {
                                    tx1.executeSql("INSERT INTO courses_finish (course_id, dateF, finish) VALUES (?,?,?)",
                                        [courseID, now, 1],
                                        function (tx, resultsA) {
                                            var length = resultsA.rows.length;
                                            var dateF, course_id, finish;
                                            for(var w = 0; w< length; w++) {
                                                course_id = resultsA.rows.item(w).course_id
                                                dateF = resultsA.rows.item(w).dateF
                                                finish = resultsA.rows.item(w).finish
                                            }

                                            var msg = app.toast.create({
                                                text: 'Tenemos problemas para enviar tu encuesta, nosotros lo haremos por ti mas tarde o cuando tengas una conexion a internet estable',
                                                closeButton: true,
                                                closeButtonText: 'Cerrar',
                                                closeButtonColor: 'red',
                                            });
                                            msg.open();

                                        })
                                },
                                function (error) {
                                    console.log("add client error: " + error.message);
                                    app.dialog.alert('Error al insertar registro.', 'Error');
                                    app.preloader.hide();

                                },
                                function () {
                                });
                            // Swal.fire('Enhorabuena!', 'Haz completado este cuestionario, vuelve el dia de mañana para repetirlo', 'success')

                        }
                    })
                })

        },
        function (error) {
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar registro. ccc', 'Error');
            app.preloader.hide();

        }
    )
}

function updateStatusCourse()
{
    if (localStorage.getItem('status_course') == 1 ) {
            $("#downloadCertificate").show();
            return;
    }
    let user_id = localStorage.getItem('id');
    localStorage.removeItem('status_course');
    localStorage.setItem('status_course', 1);
    const date = new Date();
    const dateWhenFinish = offDays(date, 0);

    app.request.promise.post('http://serviciosbennetts.com/universidadBennetts/updateStatusCourse.php', {id: user_id, dateWhenFinish: dateWhenFinish})
        .then(function (res) {
            Swal.fire('Felicidades!', 'Haz completado satisfactoriamente todos los cursos, en el menu principal veras un boton para obtener tu certificado', 'success');
            $("#downloadCertificate").show();
            $("#finalQuestions").hide();

        })
        .catch(function (err) {
            console.log(err.xhr);
            console.log(err.status);
            console.log(err.message);
        });

}

function getCertificate()
{
    var id = localStorage.getItem('id');
    var statusCourse = localStorage.getItem('status_course');
    if (statusCourse == 1)
    {
        window.open("http://serviciosbennetts.com/universidadBennetts/certificate.php?id="+ id, '_system');
    }else{
        swal.fire('Atencion', 'termina todos tu cursos para obtener tu certificado', 'info');
    }
}

function checkIfCoursesComplete(course_id){

    const date = new Date();
    const dayOff = offDays(date, 0);
    databaseHandler.db.transaction(
        function (tx1) {
            tx1.executeSql("SELECT course_id, dateF, finish FROM courses_finish WHERE course_id = ?", //
                [course_id],
                function (tx, resultsA){
                    var length = resultsA.rows.length;
                    var id_curso, status, finiDate;
                    if (length > 0){
                        for(var i = 0; i< length; i++) {
                            id_curso = resultsA.rows.item(i).course_id;
                            status = resultsA.rows.item(i).finish;
                            finiDate = resultsA.rows.item(i).dateF;
                        }
                        if ( status == 1 && finiDate == dayOff){
                            $("#linkToC"+id_curso).hide();
                            $("#terminadoCourse"+id_curso).show();
                            $("#watchVidio"+id_curso).show();
                        }
                        else{
                            $("#linkToC"+course_id).show();
                            $("#terminadoCourse"+course_id).hide();
                            $("#watchVidio"+course_id).hide();

                        }
                    }
                    else {
                        $("#linkToC"+course_id).show();
                        $("#terminadoCourse"+course_id).hide();
                        $("#watchVidio"+course_id).hide();

                    }
                })

        },
        function (error) {
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar registro.  in checkIfCoursesComplete', 'Error');
            app.preloader.hide();
        }
    );
}

function checkAR(course_id){
    const date = new Date();
    const dayOff = offDays(date, 0);
    databaseHandler.db.transaction(
        function(tx1){
            tx1.executeSql("SELECT * FROM courses_finish WHERE course_id = ? AND dateF = ?",
                [course_id, dayOff],
                function(tx1, response){
                var longitud = response.rows.length;

                    if (longitud > 0){
                        tx1.executeSql("SELECT register.*, au.* FROM register INNER JOIN answer_user AS au ON register.idCuestionario = au.idCuestionario WHERE register.course_id = ? AND register.dateF = ?",
                            [course_id, dayOff],
                            function (tx1, res) {
                                var long = res.rows.length;
                                var answers = [];
                                var repetidos = {};
                                if (long > 0) {
                                    for (var z = 0; z < long; z++) {
                                        var item = res.rows.item(z);
                                        var id_curso = item.course_id
                                        var total = answers.push(item.answer);
                                    }
                                    if (total > 0){
                                        // console.log(sum);
                                        // console.log(sum[0]); // respuestas con 0 fallidas
                                        // console.log(sum[1]); // Respuesta con 1 acertadas
                                        if(total == 3 || total == 4){

                                            var sum = answers.reduce((contador, valor) => {
                                                contador[valor] = (contador[valor] || 0) + 1;
                                                return contador;
                                            },{});

                                            var avg = (sum[1] * 100)/ answers.length;

                                            if (avg >= 65){
                                                $("#Aprobado"+course_id).show();
                                                $("#NoAprobado"+course_id).hide();
                                            }else{
                                                $("#Aprobado"+course_id).hide();
                                                $("#NoAprobado"+course_id).show();
                                            }
                                        }else if(total == 5){
                                            var sum = answers.reduce((contador, valor) => {
                                                contador[valor] = (contador[valor] || 0) + 1;
                                                return contador;
                                            },{});

                                            var avg = (sum[1] * 100)/ answers.length;
                                            if (avg >= 60){
                                                $("#Aprobado"+course_id).show();
                                                $("#NoAprobado"+course_id).hide();
                                            }else{
                                                $("#Aprobado"+course_id).hide();
                                                $("#NoAprobado"+course_id).show();
                                            }
                                        }else{
                                            var sum = answers.reduce((contador, valor) => {
                                                contador[valor] = (contador[valor] || 0) + 1;
                                                return contador;
                                            },{});

                                            var avg = (sum[1] * 100)/ answers.length;
                                            if (avg >= 65){
                                                $("#Aprobado"+course_id).show();
                                                $("#NoAprobado"+course_id).hide();
                                            }else{
                                                $("#Aprobado"+course_id).hide();
                                                $("#NoAprobado"+course_id).show();
                                            }
                                        }
                                    }
                                    else{
                                        $("#Aprobado"+course_id).hide();
                                        $("#NoAprobado"+course_id).hide();
                                    }
                                }else{
                                    $("#Aprobado"+course_id).hide();
                                    $("#NoAprobado"+course_id).hide();
                                }
                            })

                    }else{
                        $("#Aprobado"+course_id).hide();
                        $("#NoAprobado"+course_id).hide();
                    }
                }
            );
        },
        function (error) {
            console.log("add client error: " + error.message);
            app.dialog.alert('Error el verficar datos A R', 'Error');
            app.preloader.hide();
        }
    )
}
function checkEvaluacionFinal()
{
    var user_id = localStorage.getItem('id');
    var evalFinal = localStorage.getItem("EvaluacionFinal")
    const date = new Date();
    const dateNow = offDays(date, 0);
    databaseHandler.db.transaction(
        function (tx1) {
            tx1.executeSql("SELECT * FROM register_final WHERE user_id = ?",
                [user_id],
                function (tx, res) {
                    var length = res.rows.length;
                    var userId, banderaL, fecha;
                    for (var i = 0; i < length; i++)
                    {
                        userId = res.rows.item(i).user_id;
                        banderaL = res.rows.item(i).bandera;
                        fecha = res.rows.item(i).fecha;
                    }
                    if (length > 0 && banderaL == 1){
                        tx1.executeSql("UPDATE register_final SET fecha = ? WHERE idFinal = ?",
                            [dateNow, evalFinal],
                            function(tx, res2){
                                tx1.executeSql("SELECT * FROM answer_question_final WHERE user_id = ? AND status = ? AND bandera = ?",
                                    [user_id, 1, banderaL],
                                    function (tx, resultsA) {
                                        var length = resultsA.rows.length;
                                        var fecha, userId, statuses, ansFId;
                                        for (var w = 0; w < length; w++) {
                                            userId = resultsA.rows.item(w).user_id;
                                            fecha = resultsA.rows.item(w).fecha;
                                            ansFId = resultsA.rows.item(w).ansFinalId;
                                            statuses = resultsA.rows.item(w).status;
                                            if(statuses == 1){
                                                 $('input[name=respuesta'+ansFId+']').prop('checked', true);

                                            }
                                        }
                                        $("#try").empty();
                                        $("#try").append('<p>Intento '+banderaL+'/3</p>');
                                    }
                                );
                            },
                            function(error){
                            console.log("error en insert "+error.message)
                            }
                        );
                    }
                    else if(length > 0 && banderaL == 2){
                        tx1.executeSql("UPDATE register_final SET fecha2 = ? WHERE idFinal = ?",
                            [dateNow, evalFinal],
                            function(tx, res2){
                                tx1.executeSql("SELECT * FROM answer_question_final WHERE user_id = ? AND status = ? AND bandera = ?",
                                    [user_id, 1, banderaL],
                                    function (tx, resultsA) {
                                        var length = resultsA.rows.length;
                                        var fecha, userId, status, ansFId;
                                        for (var w = 0; w < length; w++) {
                                            userId = resultsA.rows.item(w).user_id;
                                            fecha = resultsA.rows.item(w).fecha;
                                            ansFId = resultsA.rows.item(w).ansFinalId;
                                            status = resultsA.rows.item(w).status;
                                            if(status == 1){
                                                $('input[name=respuesta' + ansFId + ']').attr('checked', true);
                                                $("#try").empty();
                                                $("#try").append('<p>Intento '+banderaL+'/3</p>');
                                            }
                                        }
                                    }
                                );
                            },
                            function(error){
                                console.log("error en insert "+error.message)
                            }
                        );
                    }
                    else if(length > 0 && banderaL == 3){
                        tx1.executeSql("UPDATE register_final SET fecha3 = ? WHERE idFinal = ?",
                            [dateNow, evalFinal],
                            function(tx, res2){
                                tx1.executeSql("SELECT * FROM answer_question_final WHERE user_id = ? AND status = ? AND bandera = ?",
                                    [user_id, 1, banderaL],
                                    function (tx, resultsA) {
                                        var length = resultsA.rows.length;
                                        var fecha, userId, status, ansFId;
                                        for (var w = 0; w < length; w++) {
                                            userId = resultsA.rows.item(w).user_id;
                                            fecha = resultsA.rows.item(w).fecha;
                                            ansFId = resultsA.rows.item(w).ansFinalId;
                                            status = resultsA.rows.item(w).status;
                                            if(status == 1){
                                                $('input[name=respuesta' + ansFId + ']').attr('checked', true);
                                                $("#try").empty();
                                                $("#try").append('<p>Intento '+banderaL+'/3</p>');
                                            }
                                        }
                                    }
                                );
                            },
                            function(error){
                                console.log("error en insert "+error.message)
                            }
                        );
                    }
                    else if(length > 0 && banderaL > 3)
                    {
                        $("#finalQuestion").hide();
                        Swal.fire('Atencion', 'Haz excedido el numero maximo de intentos, no es posible realizar esta evaluacion', 'warning');
                        regresar();
                    }
                    else{
                        tx1.executeSql("INSERT INTO register_final (user_id,bandera, status, fecha) VALUES (?,?,?,?) ",
                            [user_id, 1, 1, dateNow],
                            function(tx, res1){
                                $("#try").append("<b class='text-info'>Intento 1/3</b>");
                                databaseHandler.db.transaction(
                                    function (tx) {
                                        tx.executeSql("SELECT MAX(idFinal) as Id FROM register_final",
                                            [],
                                            function (tx, results) {
                                                var length = results.rows.length;
                                                var item = results.rows.item(0);
                                                // alert("insert new"+item.Id)
                                                localStorage.setItem("EvaluacionFinal", item.Id);
                                                var evalFinal = localStorage.getItem("EvaluacionFinal");
                                            })
                                    },function (error) {
                                        console.log("add client error: " + error.message);
                                        app.dialog.alert('Error al insertar registro. new idcuest', 'Error');
                                        app.preloader.hide();
                                    });
                            },
                            function(error){
                                console.log("Error en Update: "+error.message)
                            }
                        )
                    }

                },
                function (err) {
                    console.log(err.message);
                }
            );
        });
    //         tx1.executeSql("SELECT * FROM answer_question_final WHERE user_id = ?",
    //             [respuestaId, user_id],
    //             function (tx, resultsA) {
    //                 var length = resultsA.rows.length;
    //                 var fecha,userId, bandera;
    //                 for(var w = 0; w< length; w++) {
    //                     userId = resultsA.rows.item(w).user_id;
    //                     userId = resultsA.rows.item(w).user_id;
    //                     fecha = resultsA.rows.item(w).fecha;
    //                     bandera = resultsA.rows.item(w).bandera;
    //                     if (bandera = 1){
    //                         $('input[name=respuesta'+ansswerId+']').attr('checked', true);
    //                         $("#try").append('<b style="color: red;">Intento 1/3</b>')
    //
    //
    //                     }
    //                     else if(bandera = 2){
    //                         $('input[name=respuesta'+ansswerId+']').attr('checked', true);
    //                         $("#try").append('<b style="color: red;">Intento 2/3</b>')
    //
    //
    //                     }
    //                     else if(bandera = 3){
    //                         $('input[name=respuesta'+ansswerId+']').attr('checked', true);
    //                         $("#try").append('<b style="color: red;">Intento 3/3</b>')
    //
    //                     }
    //                     else{
    //                         $("#finalQuestion").hide();
    //                         Swal.fire('Aviso', 'Haz completado esta evaluacion final 3 veces, por desgracia no haz pasado el curso de Operador de Limpieza', 'warning');
    //                         regresar();
    //                     }
    //
    //
    //                 }
    //     },
    //     function (error) {
    //         console.log("add client error: " + error.message);
    //         app.dialog.alert('Error al insertar registro.', 'Error');
    //         app.preloader.hide();
    //     }
    // );
}

async function loadFinalEval(){
    await checkEvaluacionFinal();
}

function EvaluacionFinal(respuesta_fkID, el,idRespuesta){
    var user_id = localStorage.getItem('id');
    var evalFinal = localStorage.getItem('EvaluacionFinal');
    var resAnswerFinal = el.value;
    var preguntaID = respuesta_fkID;
    var respuestaId = idRespuesta;
    var resName = el.name;
    var date = new Date();
    var dateNow = offDays(date, 0);
    var fecha = offDays(date, 0);

        if($('input[name='+resName+']').prop('checked')){
            databaseHandler.db.transaction(

                function (tx1) {
                    tx1.executeSql("SELECT * FROM answer_question_final WHERE ansFinalId = ? AND user_id = ?",
                        [respuestaId, user_id],
                        function (tx, resultsA) {
                            var length = resultsA.rows.length;
                            var fecha, questionId, userId,answerId;
                            for(var w = 0; w< length; w++) {
                                answerId = resultsA.rows.item(w).ansFinalId;
                                questionId = resultsA.rows.item(w).questFinalId;
                                userId = resultsA.rows.item(w).user_id;
                                fecha = resultsA.rows.item(w).fecha;
                            }

                            if (length > 0 && questionId == preguntaID && userId === user_id && fecha === dateNow)
                            {

                            }
                            else {
                                tx1.executeSql("SELECT * FROM register_final WHERE idFinal = ?",
                                    [evalFinal],
                                    function(tx, resOne){
                                        var long = resOne.rows.length;
                                        var item = resOne.rows.item(0);
                                        var evalId = item.idFinal;
                                        var bandera = item.bandera;
                                        if (long > 0){
                                            tx1.executeSql("INSERT INTO answer_question_final(ansFinalId, questFinalId, user_id, response, fecha, status, bandera ) VALUES (?,?,?,?,?,?,?)",
                                                [respuestaId, preguntaID, user_id, resAnswerFinal, dateNow, 1,bandera],
                                                function (tx1, results) {

                                                }
                                            )
                                        }
                                    }
                                );
                            }
                        })

                },
                function (error) {
                    console.log("add client error: " + error.message);
                    app.dialog.alert('Error al insertar registro.', 'Error');
                    app.preloader.hide();
                },
                function () {
                }
            );
        } else {
            databaseHandler.db.transaction(
                function (tx1) {
                    tx1.executeSql("DELETE FROM answer_question_final WHERE ansFinalId = ? AND user_id = ?",
                        [respuestaId, user_id],
                        function (tx1, results) {

                        }
                    )
                }
            );
        }
    // });

    // app.request.get(cordova.file.externalRootDirectory + '/jsons/eval_final_preguntas.json', function (data) {
    //     con
    //     const preguntas = JSON.parse(data);
    //     if (preguntas.length !== 0) {
    //         for (var w = 0; w < preguntas.length; w++) { //preguntas
    //             $("#content").append('<div class="card">' +
    //                 '<div class="card-content card-content-padding">' +
    //                 preguntas[w].pregunta +
    //                 '</div>'+
    //                 '</div>')
    //         }
    //     }
    //     else {
    //         Swal.fire('Atencion!', 'No hay disponible una evaluacion final, vuelve mas tarde', 'error');
    //     }
    // });

}

function enviarEvaluacionFinal(){

    var answersFinalArray = [];
    var a = 0;
    var date = new Date();
    var dateNow = offDays(date, 0);
    var user_id = localStorage.getItem('id');
    Swal.fire({
        title: '¿Estas seguro de enviar la evaluacion?',
        text: "Una vez enviado no sera posible modificarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si envialo!'
    }).then((result) => {
        if (result.isConfirmed) {

            databaseHandler.db.transaction(
                function (tx1) {
                    tx1.executeSql("SELECT * FROM answer_question_final",
                        [],
                        function (tx, resultsF) {
                            var length = resultsF.rows.length;

                            for(var i = 0; i< length; i++) {
                                var item4 = resultsF.rows.item(i);
                                answersFinalArray[a] = {'ansFinalId': item4.ansFinalId, 'questFinalId': item4.questFinalId, 'user_id': item4.user_id, 'response': item4.response, 'fecha': item4.fecha, 'bandera': item4.bandera};
                                  a++;
                            }
                            // console.log(JSON.stringify(answersArray));

                            $.ajax({
                                type: "POST",
                                async: true,
                                url: "http://serviciosbennetts.com/universidadBennetts/storeFinalEvaluation.php",
                                data: { 'arrayF': JSON.stringify(answersFinalArray) },
                                success: function(respuesta) {
                                    console.log(respuesta)
                                    var respu1 = respuesta.split("._.");
                                    var dat1 = respu1[0];
                                    var dat2 = respu1[1];
                                    var dat3 = respu1[2];
                                    if (dat1 == "REPORTE") {
                                        if (dat2 > 0 ){
                                            if  (dat3){

                                        databaseHandler.db.transaction(
                                            function (tx1) {
                                                tx1.executeSql("UPDATE answer_question_final SET status = ?, bandera = ? WHERE fecha = ? AND user_id = ?",
                                                    [2,2,dateNow,user_id],
                                                    function (tx, resultsA) {
                                                        let timerInterval
                                                        Swal.fire({
                                                            title: 'Aviso:!',
                                                            html: 'Guardando <b></b>',
                                                            timer: 2000,
                                                            timerProgressBar: true,
                                                            willOpen: () => {
                                                                Swal.showLoading()
                                                                timerInterval = setInterval(() => {
                                                                    const content = Swal.getContent()
                                                                    if (content) {
                                                                        const b = content.querySelector('b')
                                                                        if (b) {
                                                                            b.textContent = Swal.getTimerLeft()
                                                                        }
                                                                    }
                                                                }, 100)
                                                            },
                                                            willClose: () => {
                                                                clearInterval(timerInterval)
                                                            }
                                                        }).then((result) => {
                                                            /* Read more about handling dismissals below */
                                                            if (result.dismiss === Swal.DismissReason.timer) {

                                                                databaseHandler.db.transaction(
                                                                    function (tx2) {
                                                                    tx2.executeSql("UPDATE register_final SET status = ?, bandera = ? WHERE fecha = ? AND user_id = ?",
                                                                    [2, 2, dateNow, user_id],
                                                                    function(tx,resultsB){
                                                                        tx2.executeSql("DELETE FROM answer_question_final WHERE user_id = ? AND bandera = ?",
                                                                            [user_id, 2],
                                                                            function(txx, resutlsZ){
                                                                                Swal.fire(
                                                                                    'Enviado!',
                                                                                    'La evaluacion fue enviada.',
                                                                                    'success'
                                                                                );
                                                                            });
                                                                    // updateStatusCourse();

                                                                    regresar();
                                                                    })
                                                                })
                                                            }
                                                        }) //END SWAL FIRE
                                                            .catch((err) => {
                                                                alert(err);
                                                            })

                                                    })

                                            },
                                            function (error) {
                                                console.log("add client error: " + error.message);
                                                app.dialog.alert('Error al insertar registro.', 'Error');
                                                app.preloader.hide();
                                                Swal.fire('Guardado!', 'Puedes seguir usando la aplicacion.', 'warning')

                                            });
                                            }else {Swal.fire('Error al Guardar3!', dat3, 'warning')}
                                        }else {Swal.fire('Error al Guardar2!', dat2, 'warning')}
                                    }else {Swal.fire('Error al Guardar1!', dat1, 'warning')}

                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log(XMLHttpRequest);
                                    console.log(textStatus);
                                    console.log(errorThrown);

                                }
                            })
                        })

                },
                function (error) {
                    console.log("add client error: " + error.message);
                    app.dialog.alert('Error al insertar registro.', 'Error');
                    app.preloader.hide();

                }
            )

        }
    })
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function backIndexCourses(id)
{
    app.views.main.router.navigate({ name: 'cursos_index' , params: {id: categoryId}});
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}


function Verificar(idCourse, catId){
        // Handle the online event
        var networkState = navigator.connection.type;

        if (networkState !== Connection.NONE) {
            app.views.main.router.navigate( {name: 'cursos', params: {id: idCourse, catid: catId} } );

        }
        else {
            app.dialog.alert("Error","Necesitas una conexion a internet");
        }

}

function Verificar2(idCourse, catId){
    // Handle the online event
    var networkState = navigator.connection.type;

    if (networkState !== Connection.NONE) {
        app.views.main.router.navigate( {name: 'watchVideo', params: {id: idCourse, catid: catId} } );

    }
    else {
        app.dialog.alert("Error","Necesitas una conexion a internet");
    }

}

function backHome(){
    app.views.main.router.navigate( {name: 'inicio' } );
}

function watchlesson(){
    // Create dynamic Popup
    var dynamicPopup = app.popup.create({
        content: '<div class="popup">'+
            '<div class="block">'+
            '<p>Popup created dynamically.</p>'+
            '<p><a href="#" class="link popup-close">Close me</a></p>'+
            '</div>'+
            '</div>',
        // Events
        on: {
            open: function (popup) {
                console.log('Popup open');
            },
            opened: function (popup) {
                console.log('Popup opened');
            },
        }
    });
}