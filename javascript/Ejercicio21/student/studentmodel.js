import { students, saveOnLocSto } from "../data.js";
import { addRow, updateRow, populateTable } from "./studentview.js";

/**
 * Agrega un nuevo estudiante a la tabla y al array.
 * 
 * @returns {void}
 */
export const add = (stuName, stuEmail, stuPhone, stuNote) => {
    // Id de nuevo estudiante.
    const newId = students.length === 0 ? 1 : students[students.length - 1].id + 1;

    // Agrega el nuevo estudiante al arreglo.
    const student = { id: newId, name: stuName, note: stuNote, email: stuEmail, phone: stuPhone };
    students.push(student);

    addRow(student);
    saveOnLocSto();
};

/**
 * Borra a un estudiante de la tabla y del array.
 * 
 * @param {int} id - Id del estudiante a eliminar.
 * @returns {void}
 */
export const deleteStd = (id) => {
    // Obtiene el indice del estudiante en el array y lo elimina.
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        students.splice(index, 1);
    }

    saveOnLocSto();
};

/**
 * Actualiza la información de un estudiante.
 * 
 * @returns {void}
 */
export const update = (id, newName, newNote) => {
    // Traemos la informacion del estudiante a editar.
    const student = students.find(student => student.id === id);

    // Guardamos la nueva información.
    student.name = newName;
    student.note = newNote;

    updateRow(student);
    saveOnLocSto();
};

export const search = str => {
    const fields = ['name', 'email'];
    const result = students.filter(student => fields.some(field => student[field].toLowerCase().includes(str.toLowerCase())));
    populateTable(result);
}
