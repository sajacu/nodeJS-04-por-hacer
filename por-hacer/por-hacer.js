const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = async() => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFileSync(`db/data.json`, data);
};

const cargarDB = async() => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (e) {
        listadoPorHacer = [];
    }
    //console.log(listadoPorHacer);
};

const crear = async(descripcion) => {
    await cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    await guardarDB();

    return porHacer;
};

const listar = async() => {
    await cargarDB();
    return listadoPorHacer;
};

const actualizar = async(descripcion, completado = true) => {
    await cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        await guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = async(descripcion) => {
    await cargarDB();

    // FORMA 1 DE BORRAR ELEMENTO DE ARRAY
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer.splice(index, 1); // borra un elemento del array en la posicion index
        await guardarDB();
        return true;
    } else {
        return false;
    }

    // FORMA 2 DE BORRAR ELEMENTO DE ARRAY
    // let nuevoListado = listadoPorHacer.filter(tarea => { // filtra todos los elementos menos el elemento a borrar
    //     return tarea.descripcion !== descripcion;
    // });
    // // let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion); // otra opc mas corta
    // if (listadoPorHacer.length == nuevoListado.length) {
    //     return false;
    // } else {
    //     listadoPorHacer = nuevoListado;
    //     await guardarDB();
    //     return true;
    // }
};

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}