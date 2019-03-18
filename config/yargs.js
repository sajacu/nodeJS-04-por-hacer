const descripcion = {
    demand: true,
    alias: 'd',
    description: 'Descripcion de la tarea por hacer.'
};

const completado = {
    default: true,
    alias: 'c',
    description: 'Estado de la tarea: true/false.'
};

const yargv = require('yargs')
    .command('crear', 'Crear tarea por hacer.', {
        descripcion
    })
    .command('actualizar', 'Actualizar estado de tara por hacer.', {
        descripcion,
        completado
    })
    .command('borrar', 'Borrar tarea por hacer.', {
        descripcion
    })
    .help()
    .argv;

// module.exports.yargv = yargv; 
module.exports = {
    yargv
};