var routes = [

  {
    path: '/about/',
    url:  './pages/about.html',
    name: 'about',
  },
  {
    path: '/',
    url:  './index.html',
    name: 'home',
    options: {
      transition: 'f7-circle',
    },
  },
  {
    path: '/',
    url:  './menu.html',
    name: 'inicio',
    options: {
      transition: 'f7-circle',
    },
  },
  // page
  {
    name: 'cursos_index',
    path: '/cursos/index/:id',
    componentUrl: './pages/cursos/index.html',
    options: {
      transition: 'f7-circle',
    },
  },
  { // ruta no usada
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
    path: '/questions/show/:id/:course_id/:catId/:name',
    componentUrl: './pages/questions/show.html',
  },
  // Pages EVALUACION
  {
    name: 'cursos',
    path: '/cursos/show/:id/',
    componentUrl: './pages/cursos/show.html',
  },
  // Pages EVALUACION FINAL
  {
    name: 'evaluacion_final',
    path: '/cursos/evaluaciones/',
    componentUrl: './pages/evaluacionFinal.html',
  },
  {
    name: 'TecnicasLimpieza',
    path: '/TecnicasLimpieza/:id',
    componentUrl: './pages/TecnicasLimpieza.html',
  },
  {
    name: 'Induccion',
    path: '/Induccion/:id',
    componentUrl: './pages/Induccion.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
