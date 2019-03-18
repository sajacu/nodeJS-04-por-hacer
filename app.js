const yargv = require('./config/yargs').yargv;
const color = require('colors');
const porHacer = require('./por-hacer/por-hacer');

// console.log(yargv);

let main = async() => {
    try {
        let command = yargv._[0];
        switch (command) {
            case 'crear':
                console.log('Crear tarea por hacer.');
                let tarea = await porHacer.crear(yargv.descripcion);
                console.log(tarea);
                break;
            case 'listar':
                console.log('Listar todas las tareas por hacer.');
                let tareas = await porHacer.listar();
                for (let tarea of tareas) {
                    console.log('############### TAREA ##############'.green);
                    console.log(tarea.descripcion);
                    console.log('Estado: ' + tarea.completado);
                    console.log('#############################'.green);
                }
                break;
            case 'actualizar':
                console.log('Actualizar estado de tarea por hacer.');
                let res1 = await porHacer.actualizar(yargv.descripcion, yargv.completado);
                console.log('Resultado de operacion: ' + res1);
                break;
            case 'borrar':
                console.log('Borrar tarea del listado de tareas.');
                let res2 = await porHacer.borrar(yargv.descripcion);
                console.log('Resultado de operacion: ' + res2);
                break;
            default:
                console.log('Comando no reconocido');
        };
    } catch (e) {
        console.log(e);
        return -1;
    }
    return 0;
};

main().then(retcode => {
    console.log(`Main finished with retcode: ${retcode}`);
}).catch(e => {
    console.log(`Main error: ${e}`);
});