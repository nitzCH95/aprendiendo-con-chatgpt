import { addButtons } from "../ui.js";

// Cuerpo de la tabla.
export const stuTableBody = document.querySelector('tbody');

/**
 * Agrega una fila nueva a la tabla correspondiente al estudiante creado.
 * 
 * @param {*} student Estudiante recien creado.
 * @returns {void}
 */
export const addRow = student => {
    // Crea una nueva fila.
    const row = document.createElement('tr');
    row.dataset.id = student.id;

    const cellName = document.createElement('td');
    cellName.dataset.name = cellName.textContent = student.name;

    const cellNote = document.createElement('td');
    cellNote.dataset.note = cellNote.textContent = student.note;

    const cellEmail = document.createElement('td');
    cellEmail.dataset.email = cellEmail.textContent = student.email;

    const cellPhone = document.createElement('td');
    cellPhone.dataset.phone = cellPhone.textContent = student.phone;

    // Agrega la nueva fila a la tabla.
    row.appendChild(cellName);
    row.appendChild(cellEmail);
    row.appendChild(cellPhone);
    row.appendChild(cellNote);

    // Botón para borrar y actualizar estudiante.
    addButtons(row);
    stuTableBody.appendChild(row);
}

/**
 * Elimina una fila de la tabla.
 * 
 * @param {*} row 
 * @returns {void}
 */
export const deleteRow = row => {
    row.remove();
};

/**
 * Actualiza la información del estudiante en la tabla.
 * 
 * @param {*} student 
 * @returns {void}
 */
export const updateRow = (student) => {
    const row = document.querySelector(`tr[data-id="${student.id}"]`);

    const cellName = row.querySelector('td[data-name]');
    cellName.dataset.name = cellName.textContent = student.name;

    const cellNote = row.querySelector('td[data-note]');
    cellNote.dataset.note = cellNote.textContent = student.note;
};

/**
 * Llena la tabla con información de los estudiantes.
 * 
 * @returns {void}
 */
export const populateTable = (students) => {
    stuTableBody.innerHTML = '';

    if (students.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5
        cell.textContent = 'No se encontraron resultados.'
        row.appendChild(cell);
        stuTableBody.appendChild(row);
        return;
    }

    students.forEach(student => {
        const row = document.createElement('tr');
        row.dataset.id = student.id;

        const cellName = document.createElement('td');
        cellName.dataset.name = cellName.textContent = student.name;

        const cellEmail = document.createElement('td');
        cellEmail.dataset.email = cellEmail.textContent = student.email;

        const cellPhone = document.createElement('td');
        cellPhone.dataset.phone = cellPhone.textContent = student.phone;

        const cellNote = document.createElement('td');
        cellNote.dataset.note = cellNote.textContent = student.note;

        row.appendChild(cellName);
        row.appendChild(cellEmail);
        row.appendChild(cellPhone);
        row.appendChild(cellNote);

        addButtons(row)
        stuTableBody.appendChild(row);
    });
};