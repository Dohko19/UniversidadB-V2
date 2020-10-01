var routes = [

  // Index page
  // {
  //   path: '/',
  //   url:  './index.html',
  //   name: 'home',
  // },
  // About page
  {
    path: '/about/',
    url:  './pages/about.html',
    name: 'about',
  },
    // Pages VIC

  {
    name: 'recorrido',
    path: '/recorrido/',
    componentUrl: './pages/recorrido.html',
  },
  {
    name: 'recorridoseg',
    path: '/recorridoseg/',
    url: './pages/recorridoseg.html',
  },
  {
    name: 'seguimientov',
    path: '/seguimientov/',
    url: './pages/recorridoven.html',
  },
  {
    name: 'equipos',
    path: '/equipos/',
    componentUrl: './pages/equipos.html',
  },
  {
    name: 'productos',
    path: '/productos/',
    url:  './pages/productos.html',
  },
  {
    name: 'tabs-animated',
    path: '/tabs-animated/',
    url:  './pages/tabs-animated.html',
  },
   {
    name: 'cierre',
    path: '/cierre/',
    componentUrl:  './pages/cierre.html',
  },
  {
    name: 'cierreseg',
    path: '/cierreseg/',
    componentUrl:  './pages/cierreseg.html',
  },
  {
    name: 'imagen',
    path: '/imagen/',
    componentUrl:  './pages/imagen.html',
  },
  {
    name: 'entrenamiento',
    path: '/entrenamiento/',
    componentUrl: './pages/entrenamiento.html',
  },
  {
    name:'inventario',
    path: '/inventario/',
    componentUrl: './pages/invent.html',
  },
  {
    name: 'prod',
    path: '/prod/',
    componentUrl:  './pages/prod1.html',
  },
  {
    name: 'newprod',
    path: '/newprod/',
    componentUrl:  './pages/newprod.html',
  },
  {
    name: 'pdfs',
    path: '/pdfs/',
    componentUrl:  './pages/pdfs.html',
  },
  {
    name: 'visualizar',
    path: '/visualizar/:IdCte /:IdCed',
    componentUrl:  './pages/visualizar.html',
  },
  {
    name: 'visualizara',
    path: '/visualizara/:Division /:IdCed',
    componentUrl:  './pages/visualizara.html',
  },
  {
    name: 'visualizars',
    path: '/visualizars/:IdCte /:IdCed',
    componentUrl:  './pages/visualizars.html',
  },
  {
    name: 'visualizarv',
    path: '/visualizarv/:IdCte /:IdCed',
    componentUrl:  './pages/visualizarv.html',
  },
  {
    name: 'fcierre',
    path: '/fcierre/',
    Url: './pages/fcierre.html',
  },
  {
    name: 'continuarc',
    path: '/continuarc/',
    componentUrl: './pages/continuar_ced.html',
  },
  {
    name: 'bandeja',
    path: '/bandeja/',
    componentUrl: './pages/bandejaSalida.html',
  },
  {
    name: 'consultaventas',
    path: '/consultaventas/',
    componentUrl: './pages/consultaventas.html',
  },
  {
    name: 'construccion',
    path: '/construccion/',
    componentUrl: './pages/construccion.html',
  },
  {
    name: 'consultatickets',
    path: '/consultatickets/',
    componentUrl: './pages/consultatickets.html',
  },
  {
    name: 'cuestionarios',
    path: '/cuestionarios/',
    componentUrl: './pages/cuestionarios.html',
  },
  {
    name: 'auditoria',
    path: '/auditoria/',
    componentUrl: './pages/auditoria.html',
  },
  {
    name: 'tablerocalificaciones',
    path: '/tablerocalificaciones/',
    componentUrl: './pages/tablerocalificaciones.html',
  },
  {
    name: 'yallegue',
    path: '/yallegue/',
    componentUrl: './pages/yallegue.html',
  },
  {
    name: 'yallegueAuditoria',
    path: '/yallegueAuditoria/',
    componentUrl: './pages/yallegueAuditoria.html',
  },
  {
    name: 'excel',
    path: '/excel/',
    componentUrl: './pages/excel.html',
  },
  {
    name: 'minutas',
    path: '/minutas/:IdProyecto /:IdProyecto',
    componentUrl: './pages/minutas.html',
  },
  {
    name: 'prospectos',
    path: '/prospectos/',
    componentUrl: './pages/prospectos.html',
  },
  {
    name: 'yalleguev',
    path: '/yalleguev/',
    componentUrl: './pages/yalleguev.html',
  },
  {
    name: 'resultadosAuditoria',
    path: '/resultadosAuditoria/',
    componentUrl: './pages/resultadosAuditoria.html',
  },
  {
    name: 'datosgenerales',
    path: '/datosgenerales/',
    componentUrl: './pages/datosgenerales.html',
  },
  {
    name: 'seguimientoc',
    path: '/seguimientoc/',
    componentUrl: './pages/nvoseguimiento.html',
  },
  {
    name: 'tablaventa',
    path: '/tablaventa/',
    componentUrl:  './pages/tablaventa.html',
  },
  {
    name: 'admonproyectos',
    path: '/admonproyectos/',
    componentUrl:  './pages/admonproyectos.html',
  },
  // Components
  {
    path: '/accordion/',
    url: './pages/examples/accordion.html',
  },
  {
    path: '/action-sheet/',
    componentUrl: './pages/action-sheet.html',
  },
  {
    path: '/appbar/',
    componentUrl: './pages/appbar.html',
  },
  {
    path: '/autocomplete/',
    componentUrl: './pages/autocomplete.html',
  },
  {
    path: '/badge/',
    componentUrl: './pages/badge.html',
  },
  {
    path: '/buttons/',
    url: './pages/buttons.html',
  },
  {
    path: '/calendar/',
    componentUrl: './pages/calendar.html',
  },
  {
    path: '/calendar-page/',
    componentUrl: './pages/calendar-page.html',
  },
  {
    path: '/cards/',
    url: './pages/cards.html',
  },
  {
    path: '/cards-expandable/',
    url: './pages/cards-expandable.html',
  },
  {
    path: '/checkbox/',
    componentUrl: './pages/checkbox.html',
  },
  {
    path: '/chips/',
    componentUrl: './pages/chips.html',
  },
  {
    path: '/color-picker/',
    componentUrl: './pages/color-picker.html',
  },
  {
    path: '/contacts-list/',
    url: './pages/contacts-list.html',
  },
  {
    path: '/content-block/',
    url: './pages/content-block.html',
  },
  {
    path: '/data-table/',
    componentUrl: './pages/data-table.html',
  },
  {
    path: '/dialog/',
    componentUrl: './pages/dialog.html',
  },
  {
    path: '/elevation/',
    url: './pages/elevation.html',
  },
  {
    path: '/fab/',
    url: './pages/fab.html',
  },
  {
    path: '/fab-morph/',
    url: './pages/fab-morph.html',
  },
  {
    path: '/form-storage/',
    url: './pages/form-storage.html',
  },
  {
    path: '/gauge/',
    componentUrl: './pages/gauge.html',
  },
  {
    path: '/grid/',
    url: './pages/grid.html',
  },
  {
    path: '/icons/',
    componentUrl: './pages/icons.html',
  },
  {
    path: '/infinite-scroll/',
    componentUrl: './pages/infinite-scroll.html',
  },
  {
    path: '/inputs/',
    url: './pages/inputs.html',
  },
  {
    path: '/lazy-load/',
    url: './pages/lazy-load.html',
  },
  {
    path: '/list/',
    url: './pages/list.html',
  },
  {
    path: '/list-index/',
    componentUrl: './pages/list-index.html',
  },
  {
    path: '/login-screen/',
    componentUrl: './pages/login-screen.html',
  },
  {
    path: '/login-screen-page/',
    componentUrl: './pages/login-screen-page.html',
  },
  {
    path: '/menu/',
    componentUrl: './pages/menu.html',
  },
  {
    path: '/messages/',
    componentUrl: './pages/messages.html',
  },
  {
    path: '/navbar/',
    url: './pages/navbar.html',
  },
  {
    path: '/navbar-hide-scroll/',
    url: './pages/navbar-hide-scroll.html',
  },
  {
    path: '/notifications/',
    componentUrl: './pages/notifications.html',
  },
  {
    path: '/panel/',
    url: './pages/panel.html',
  },
  {
    path: '/photo-browser/',
    componentUrl: './pages/photo-browser.html',
  },
  {
    path: '/picker/',
    componentUrl: './pages/picker.html',
  },
  {
    path: '/popup/',
    componentUrl: './pages/popup.html',
  },
  {
    path: '/popover/',
    url: './pages/popover.html',
  },
  {
    path: '/preloader/',
    componentUrl: './pages/preloader.html',
  },
  {
    path: '/progressbar/',
    componentUrl: './pages/progressbar.html',
  },
  {
    path: '/pull-to-refresh/',
    componentUrl: './pages/pull-to-refresh.html',
  },
  {
    path: '/radio/',
    url: './pages/radio.html',
  },
  {
    path: '/range/',
    componentUrl: './pages/range.html',
  },
  {
    path: '/searchbar/',
    url: './pages/searchbar.html',
  },
  {
    path: '/searchbar-expandable/',
    url: './pages/searchbar-expandable.html',
  },
  {
    path: '/sheet-modal/',
    componentUrl: './pages/sheet-modal.html',
  },
  {
    path: '/skeleton/',
    componentUrl: './pages/skeleton.html',
  },
  {
    path: '/smart-select/',
    url: './pages/smart-select.html',
  },
  {
    path: '/sortable/',
    url: './pages/sortable.html',
  },
  {
    path: '/statusbar/',
    componentUrl: './pages/statusbar.html',
  },
  {
    path: '/stepper/',
    componentUrl: './pages/stepper.html',
  },
  {
    path: '/subnavbar/',
    url: './pages/subnavbar.html',
  },
  {
    path: '/subnavbar-title/',
    url: './pages/subnavbar-title.html',
  },
  {
    path: '/swipeout/',
    componentUrl: './pages/swipeout.html',
  },
  {
    path: '/tabs/',
    url: './pages/tabs.html',
  },
  {
    path: '/tabs-static/',
    url: './pages/tabs-static.html',
  },
  {
    path: '/tabs-animated/',
    url: './pages/tabs-animated.html',
  },
  {
    path: '/tabs-swipeable/',
    url: './pages/tabs-swipeable.html',
  },
  {
    path: '/toast/',
    componentUrl: './pages/toast.html',
  },
  {
    path: '/toggle/',
    url: './pages/toggle.html',
  },
  {
    path: '/tooltip/',
    componentUrl: './pages/tooltip.html',
  },
  {
    path: '/treeview/',
    componentUrl: './pages/treeview.html',
  },
  {
    path: '/timeline/',
    url: './pages/timeline.html',
  },
  {
    path: '/timeline-vertical/',
    url: './pages/timeline-vertical.html',
  },
  {
    path: '/timeline-horizontal/',
    url: './pages/timeline-horizontal.html',
  },
  {
    path: '/timeline-horizontal-calendar/',
    url: './pages/timeline-horizontal-calendar.html',
  },
  {
    path: '/virtual-list/',
    componentUrl: './pages/virtual-list.html',
  },
  {
    path: '/virtual-list-vdom/',
    componentUrl: './pages/virtual-list-vdom.html',
  },
  {
    path: '/vi/',
    componentUrl: './pages/vi.html',
  },

  // Color Themes
  {
    path: '/color-themes/',
    componentUrl: './pages/color-themes.html',
  },

  // Page Loaders
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
    // additional context
    options: {
      context: {
        foo: 'bar',
      },
    },
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
    // additional context
    options: {
      context: {
        foo: 'bar',
      },
    },
  },
  {
    path: '/master-detail/',
    url: './pages/master-detail-master.html',
    master: true,
    detailRoutes: [
      {
        path: '/master-detail/:id/',
        templateUrl: './pages/master-detail-detail.html',
      },
    ]
  },
  {
    path: '/',
    url:  './index.html',
    name: 'home',
    options: {
      transition: 'f7-circle',
    },
  },
  // page
  {
    name: 'cursos_operador',
    path: '/cursos/operador',
    componentUrl: './pages/cursos/operador_limpieza.html',
    options: {
      transition: 'f7-circle',
    },
  },
  {
    name: 'cursos_induccion',
    path: '/cursos/induccion/',
    componentUrl: './pages/cursos/induccion.html',
    options: {
      transition: 'f7-circle',
    },
  },
  {
    name: 'operador',
    path: '/cursos/operador/',
    componentUrl: './pages/cursos/operador.html',
    options: {
      transition: 'f7-circle',
    },
  },
  {
    name: 'question_lessons',
    path: '/questions/show/:id/:course_id/:name',
    componentUrl: './pages/questions/show.html',
  },
  // Pages EVALUACION
  {
    name: 'cursos/',
    path: '/cursos/show/:id',
    componentUrl: './pages/cursos/show.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
