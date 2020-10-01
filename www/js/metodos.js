
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


//-----------------------------------------------------------
function registerQuest(lesson_id, course_id){

    var now = new Date();
    // var idCuestionario = localStorage.getItem('idCuestionario');

    var user_id = localStorage.getItem("id");
    var fecha = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    var fechaF = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();

    const date = new Date();
    const dayOff = offDays(date, 0);
    databaseHandler.db.transaction(
        function (tx1) {
            tx1.executeSql("SELECT lesson_id, idCuestionario, dateF, status, dateF FROM register WHERE lesson_id = ? AND dateF = ?",
                [lesson_id, dayOff],
                function (tx, resultsA){
                console.log(tx);
                console.log(resultsA);
                    var length = resultsA.rows.length;
                    var item3;
                    var dateF;
                    var status;
                    for(var i = 0; i< length; i++) {
                         item3 = resultsA.rows.item(i).lesson_id;
                         dateF = resultsA.rows.item(i).dateF;
                        status = resultsA.rows.item(i).status;
                        console.log(status);
                    }
                    if (status == 1 || status == 2 && dateF == dayOff)
                    {
                        $("#Questions").hide();
                        $("#primary-title").hide();
                        $("#note").hide();
                        $("#enviarCuestionario").hide();
                        // $("#success").append('<div style="background-color: forestgreen; color: #FFFFFF;" ><p style="color: #FFFFFF;"> En hora buena.Haz completado este cuestionario, vuelve el dia de mañana para repetirlo</p></div>');
                        Swal.fire('Enhorabuena!', '¡Haz completado este cuestionario, vuelve el dia de mañana para repetirlo', 'success');
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
                                                console.log(results.rows);
                                                var item = results.rows.item(0);
                                                // alert(item.Id)
                                                localStorage.setItem("idCuestionario", item.Id);
                                                // var IdRegistro = localStorage.getItem("IdRegistro");
                                            });
                                    });
                            }
                        )
                    }
                    else {
                        tx1.executeSql("INSERT INTO register(idUser, status, lesson_id, course_id,  created_at, dateF ) VALUES (?,?,?,?,?,?)",
                            [user_id, 0, lesson_id, course_id, fecha, fechaF],
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
                                                var idCuestionario = localStorage.getItem("idCuestionario");

                                            })
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
        },
        function () {
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
                            // alert("Update");
                        })
                    }
                    else {
                        tx1.executeSql("INSERT INTO answer_user(idCuestionario, answer, question_id, user_id, answer_id, created_at, dateF ) VALUES (?,?,?,?,?,?,?)",
                            [idCuestionario, answer, question_id, user_id, answerId, created_at, dateFNow],
                            function (tx1, results) {
                                // databaseHandler.db.transaction(
                                //     function (tx) {
                                //         tx.executeSql("SELECT MAX(question_id) as Id FROM anwser_user",
                                //             [],
                                //             function (txB, resultsB) {
                                //                 var length = resultsB.rows.length;
                                //                 var item = resultsB.rows.item(0);
                                //                 // alert("guardado"+item.Id)
                                //                 // localStorage.setItem("IdRegistro", item.Id);
                                //                 // var IdRegistro = localStorage.getItem("IdRegistro");
                                //
                                //             })
                                //     });
                            }
                        )
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

function EnviarCuestionario(course_id){
    var idCuestionario = localStorage.getItem('idCuestionario');
    var answersArray = [];
    var a = 0;
    var courseID = course_id;

    const dateNow = new Date();
    const now = offDays(dateNow, 0);
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
                        function (tx, resultsA) {
                        //do Something
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

            databaseHandler.db.transaction(
                function (tx1) {
                    tx1.executeSql("SELECT * FROM answer_user as r WHERE idCuestionario = ?",
                        [idCuestionario],
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
                                    if (respuesta == 1) {

                                        databaseHandler.db.transaction(
                                            function (tx1) {
                                                tx1.executeSql("UPDATE register SET status = 2 WHERE idCuestionario = ?",
                                                    [idCuestionario],
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
                                                                // $("#Questions").hide();
                                                                // $("#enviarCuestionario").hide();
                                                                // $("#success").append('<p>Haz completado este cuestionario, vuelve el dia de mañana para repetirlo</p>');
                                                                Swal.fire('Guardado!', '', 'success');
                                                                databaseHandler.db.transaction(
                                                                    function (tx1) {
                                                                        tx1.executeSql("INSERT INTO courses_finish (course_id, dateF, finish) VALUES (?,?,?)",
                                                                            [courseID, now, 1],
                                                                            function (tx, resultsA) {
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
                                                            alert(err);
                                                        })

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
                                    } else {
                                        Swal.fire('Guardado!', '', 'warning')
                                    }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    $("#preguntas").hide();
                                    $("#success").append('<p>Haz completado este cuestionario, vuelve el dia de mañana para repetirlo</p>');
                                    Swal.fire('Enhorabuena!', 'Haz completado este cuestionario, vuelve el dia de mañana para repetirlo', 'success')

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
        else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info')
        }
    })
}

function EvniarCuestionarioBack() {
    let userId = localStorage.getItem('id');
    databaseHandler.db.transaction(
        function (tx4) {                                    //regisstro            //seguimeinto                                         //Cierre
            tx4.executeSql("SELECT r.status, r.idUser, r.idCuestionario AS cuestionarioId, au.user_id, au.idCuestionario FROM register as r LEFT OUTER JOIN answer_user as au on cuestionarioId = au.idCuestionario WHERE user_id = ? AND r.status = 1 GROUP BY cuestionarioId",
                [userId], //Verifica  que haya un registro que haya un seguimiento y un cierre
                //tu haras lo mismo verifica que haya un registro de ese cuestionario
                //que haya preguntas ocntestadas de ese cuestionario
                //y que haya un cierre ;)
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
                        storeQuestions(item2.cuestionarioId);
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

function storeQuestions(questionId){
    let cuestionarioId = questionId;
    var answersArray = [];
    var a = 0;

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
                            if (respuesta == 1) {
                                databaseHandler.db.transaction(
                                    function (tx1) {
                                        tx1.executeSql("UPDATE register SET status = 2 WHERE idCuestionario = ?",
                                            [cuestionarioId],
                                            function (tx, resultsA) {
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
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $("#preguntas").hide();
                            Swal.fire('Enhorabuena!', 'Ya respondiste este cuestionario, regresa mañana para voler a intentarlo', 'info');

                            // $("#success").append('<p>Haz completado este cuestionario, vuelve el dia de mañana para repetirlo</p>');
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

// function drawProgressBar() {
//
//     // const axios = require('axios').default;
//
//     var id = localStorage.getItem("id");
//         axios.get('https://serviciosbennetts.com/universidadBennetts/getProgressBar.php?id='+id)
//             .then(res => {
//                 console.log(res);
//                 $("#values").append('<div class="gauge gauge-init"' +
//                             '    data-type="semicircle"' +
//                             '    data-value="'+res.data/100+ '"' +
//                             '    data-value-text="' + res.data + '%"' +
//                             '    data-value-text-color="#0CC25E"' +
//                             '    data-label-font-weight="100"' +
//                             '    data-label-font-size="20"' +
//                             '    data-size="150"' +
//                             '    data-border-color="#0CC25E"' +
//                             '    ></div>');
//
//                 if (res == 100) {
//                         $("#getCertificado").show();
//                     } else {
//                         $("#getCertificado").hide();
//
//                     }
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//         // app.request.promise.get('https://serviciosbennetts.com/universidadBennetts/getProgressBar.php', {id: id})
//         //     .then(function (res) {
//         //
//         //
//         //         $("#values").append('<div class="gauge gauge-init"' +
//         //             '    data-type="semicircle"' +
//         //             '    data-value="'+res/100+ '"' +
//         //             '    data-value-text="' + res + '%"' +
//         //             '    data-value-text-color="#0CC25E"' +
//         //             '    data-label-font-weight="100"' +
//         //             '    data-label-font-size="20"' +
//         //             '    data-size="150"' +
//         //             '    data-border-color="#0CC25E"' +
//         //             '    ></div>');
//         //
//         //
//         //         if (res == 100) {
//         //             $("#getCertificado").show();
//         //         } else {
//         //             $("#getCertificado").hide();
//         //
//         //         }
//         //     })
//         //     .catch(function (err) {
//         //         console.log(err.xhr);
//         //         console.log(err.status);
//         //         console.log(err.message);
//         //     });
//
//
// }



function updateStatusCourse()
{
    if (localStorage.getItem('status_course') == 1 ) {
            $("#downloadCertificate").show();
            return;
    }
    let user_id = localStorage.getItem('id');
    localStorage.removeItem('status_course');
    localStorage.setItem('status_course', 1)
    const date = new Date();
    const dateWhenFinish = offDays(date, 0);

    app.request.promise.post('http://serviciosbennetts.com/universidadBennetts/updateStatusCourse.php', {id: user_id, dateWhenFinish: dateWhenFinish})
        .then(function (res) {
            Swal.fire('Felicidades!', 'Haz completado satisfactoriamente todos los cursos, en el menu principal veras un boton para obtener tu certificado', 'success');
            $("#downloadCertificate").show();
            $("#getCertificado").hide();

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

async function CheckCourses()
{

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
                        if ( status == 1 ){
                            $("#linkToC"+id_curso).hide();
                            $("#terminadoCourse"+id_curso).show();
                        }
                        else{
                            // $("#linkToC"+course_id).show();
                            // $("#terminadoCourse"+course_id).hide();
                        }
                    }
                    else {
                        // $("#linkToC"+course_id).show();
                        $("#terminadoCourse"+course_id).hide();
                    }

                })
            let timerInterval

        },
        function (error) {
            console.log("add client error: " + error.message);
            app.dialog.alert('Error al insertar registro.  in checkIfCoursesComplete', 'Error');
            app.preloader.hide();
        },
        function () {
        }
    );
}

//--------------------------------------------------------------------
// for(var i = 0; i< length; i++) {
//     var item3 = results.rows.item(i);
// }
//-------------------------------------------------------------------
//Extraer el ultimo
// databaseHandler.db.transaction(
//     function(tx1){
//         tx1.executeSql(
//             "Select MAX(IdProyecto) as Id from Proyectos",
//             [],
//             function(tx, results){
//                 var length = results.rows.length;
//                 var item = results.rows.item(0);
//                 localStorage.setItem("IdProyecto", item.Id);
//                 envio = 0;
//                 databaseHandler.db.transaction(
//                     function(tx1){
//                         tx1.executeSql(
//                             "INSERT INTO VisitasVentas (IdProyecto, FechaVisita, Imagen, Geolocalizacion, envio, IdUsuario) VALUES (?,?,?,?,?,?)",
//                             [item.Id,fFinal,imagenC,geolocation,envio, IdUsu],
//                             function(tx, results){
//
//                                 //Extraer el ultimo id de la visita
//                                 databaseHandler.db.transaction(
//                                     function(tx1){
//                                         tx1.executeSql(
//                                             "Select MAX(IdCedulaV) as Id from VisitasVentas",
//                                             [],
//                                             function(tx, results){
//                                                 var length = results.rows.length;
//                                                 var item3 = results.rows.item(0);
//                                                 localStorage.setItem("IdCedulaV", item3.Id);
//
//                                                 $('.preloader').remove();
//                                                 $('.infinite-scroll-preloader').remove();
//
//                                                 app.dialog.alert('El registro se guardo correctamente.', 'Aviso');
//                                                 app.views.main.router.navigate({name: 'seguimientov'}); //Colocar la pagina que realizaste
//                                             },
//                                             function(tx, error){
//                                                 console.log("Error al consultar: " + error.message);
//                                             }
//                                         );
//                                         console.log("Consulta correcta");
//                                     },
//                                     function(error){},
//                                     function(){}
//                                 );
//                                 //Fin de extraer el ultimo id de la visita
//
//
//
//                             },
//                             function(tx, error){
//                                 console.log("Error al consultar: " + error.message);
//                             }
//                         );
//                         console.log("Consulta correcta");
//                     },
//                     function(error){},
//                     function(){}
//                 );
//             },
//             function(tx, error){
//                 console.log("Error al consultar: " + error.message);
//             }
//         );
//         console.log("Consulta correcta");
//     },
//     function(error){},
//     function(){}
// );
//Fin de extraer el ultimo
