import { populateLocalStorage, students } from "./data.js";
import { hideModal, openModalUpdateStudent, overlayModal, stuUpdateNameInput, stuUpdateNoteInput } from "./ui.js";

import { add, deleteStd, update, search } from "./student/studentmodel.js";
import { deleteRow, populateTable, stuTableBody } from "./student/studentview.js";

// Botón para agregar estudiante.
const addStudentBtn = document.getElementById('addStudent');

// Modal.
const modalContent = document.getElementById('modalContent');
const updateStudentBtn = document.getElementById('updateStudent');
const cancelBtn = document.getElementById('cancelBtn');

// Cuadro de busqueda.
const stuSearchInput = document.getElementById('stuSearch');

const deleteStudent = (e) => {
    // Se identifica que se presionó un botón en el cuerpo de la tabla.
    if (e.target.classList.contains('delete')) {
        const row = e.target.closest('tr');
        const id = parseInt(row.dataset.id);

        deleteRow(row);
        deleteStd(id);
    }
};

const addStudent = () => {
    // Valores para nuevo estudiante.
    const stuNameInput = document.getElementById('stuName');
    const stuEmailInput = document.getElementById('stuEmail');
    const stuNoteInput = document.getElementById('stuNote');
    const stuPhoneInput = document.getElementById('stuPhone');

    // Obtiene los valores del pequeño formulario.
    const stuName = stuNameInput.value.trim();
    const stuNote = Number(stuNoteInput.value);
    const stuEmail = stuEmailInput.value.trim();
    const stuPhone = stuPhoneInput.value

    if (!stuName) {
        alert('Ingrese un nombre válido.');
        return;
    }

    if (isNaN(stuNote)) {
        alert('Ingrese una nota válida.')
        return;
    }

    if (stuNote < 0 || stuNote > 20) {
        alert('El rango de notas va de 0 a 20')
        return;
    }

    if (!stuEmail) {
        alert('Ingrese un email válido.');
        return;
    }

    if (isNaN(stuPhone)) {
        alert('Ingrese un teléfono válido.');
        return;
    }

    add(stuName, stuEmail, stuPhone, stuNote);
};

const updateStudent = () => {
    // Nuevos valores del estudiante.
    const newName = stuUpdateNameInput.value.trim();
    const newNote = Number(stuUpdateNoteInput.value);

    if (!newName) {
        alert('Ingrese un nombre válido');
        return;
    }

    if (isNaN(newNote)) {
        alert('Ingrese una nota válida')
        return;
    }

    if (newNote < 0 || newNote > 20) {
        alert('El rango de notas va de 0 a 20')
        return;
    }

    update(parseInt(modalContent.dataset.id), newName, newNote);
    hideModal();
};

const searchStudent = (e) => {
    search(e.target.value.trim())
};

addStudentBtn.addEventListener('click', addStudent);

stuTableBody.addEventListener('click', openModalUpdateStudent);
updateStudentBtn.addEventListener('click', updateStudent);
cancelBtn.addEventListener('click', hideModal);
window.addEventListener('click', overlayModal);

stuTableBody.addEventListener('click', deleteStudent);

stuSearchInput.addEventListener('input', searchStudent);

populateLocalStorage();
populateTable(students);