// Ejercicio 19.

const students = [];

// Tabla.
const stuTable = document.getElementById('myTable');

// Cuerpo de la tabla.
const stuTableBody = document.querySelector('tbody');

// Botón para agregar estudiante.
const addStudentBtn = document.getElementById('addStudent');

// Valores para nuevo estudiante.
const stuNameInput = document.getElementById('stuName');
const stuEmailInput = document.getElementById('stuEmail');
const stuNoteInput = document.getElementById('stuNote');
const stuPhoneInput = document.getElementById('stuPhone');

// Inputs de estudiante a editar.
const stuUpdateNameInput = document.getElementById('stuUpdateName');
const stuUpdateNoteInput = document.getElementById('stuUpdateNote');

// Botón para guardar cambios en estudiante.
const updateStudentBtn = document.getElementById('updateStudent');

// Modal.
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const openModalBtn = document.getElementById('testing');
const cancelBtn = document.getElementById('cancelBtn');

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    stuUpdateNameInput.value = '';
    stuUpdateNoteInput.value = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        stuUpdateNameInput.value = '';
        stuUpdateNoteInput.value = '';
    }
});


/**
 * Agrega los botones de borrar y actualizar para un estudiante.
 *  
 * @param {*} row - Fila donde se agregaran los botones.
 * @returns {void}
 */
const addButtons = (row) => {
    const cell = document.createElement('td');

    const deleteBtn = document.createElement('button');
    const updateBtn = document.createElement('button');

    deleteBtn.classList.add('delete');
    updateBtn.classList.add('update');

    deleteBtn.textContent = 'Borrar';
    updateBtn.textContent = 'Actualizar';

    cell.appendChild(deleteBtn);
    cell.appendChild(updateBtn);
    row.appendChild(cell);
};

/**
 * Agrega un nuevo estudiante a la tabla y al array.
 * 
 * @returns {void}
 */
const addStudent = () => {
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

    // Id de nuevo estudiante.
    const newId = students.length === 0 ? 1 : students[students.length - 1].id + 1;

    // Agrega el nuevo estudiante al arreglo.
    students.push({ id: newId, name: stuName, note: stuNote, email: stuEmail, phone: stuPhone });

    // Crea una nueva fila.
    const row = document.createElement('tr');
    row.dataset.id = newId;

    const cellName = document.createElement('td');
    cellName.dataset.name = cellName.textContent = stuName;

    const cellNote = document.createElement('td');
    cellNote.dataset.note = cellNote.textContent = stuNote;

    const cellEmail = document.createElement('td');
    cellEmail.dataset.email = cellEmail.textContent = stuEmail

    const cellPhone = document.createElement('td');
    cellPhone.dataset.phone = cellPhone.textContent = stuPhone

    // Agrega la nueva fila a la tabla.
    row.appendChild(cellName);
    row.appendChild(cellEmail);
    row.appendChild(cellPhone);
    row.appendChild(cellNote);

    // Botón para borrar y actualizar estudiante.
    addButtons(row);
    stuTableBody.appendChild(row);
};

/**
 * Muenstra el modal para actualizar un estudiante. 
 * @param {*} e - Evento click.
 * @returns {void}
 */
const openModalUpdateStudent = (e) => {
    if (e.target.classList.contains('update')) {
        const row = e.target.closest('tr');
        modalContent.dataset.id = parseInt(row.dataset.id);

        // Busca al estudiante y llena su información en el modal
        stuUpdateNameInput.value = row.querySelector('td[data-name]').dataset.name;
        stuUpdateNoteInput.value = row.querySelector('td[data-note]').dataset.note;

        // Apertura el modal.
        modal.style.display = 'flex';
    }
};

/**
 * Actualiza la información de un estudiante.
 * 
 * @returns {void}
 */
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

    // Traemos la informacion del estudiante a editar.
    const student = students.find(student => student.id === parseInt(modalContent.dataset.id));

    // Guardamos la nueva información.
    student.name = newName;
    student.note = newNote;

    updateRow(student);

    modal.style.display = 'none';
};

/**
 * Actualiza la información del estudiante en la tabla.
 * 
 * @param {*} student 
 * @returns {void}
 */
const updateRow = (student) => {
    const row = document.querySelector(`tr[data-id="${student.id}"]`);

    const cellName = row.querySelector('td[data-name]');
    cellName.dataset.name = cellName.textContent = student.name;

    const cellNote = row.querySelector('td[data-note]');
    cellNote.dataset.note = cellNote.textContent = student.note;
};

/**
 * Borra a un estdiante de la tabla y del array.
 * 
 * @param {MouseEvent} e - Evento click
 * @returns {void}
 */
const deleteStudent = (e) => {
    // Se identifica que se presionó un botón en el cuerpo de la tabla.
    if (e.target.classList.contains('delete')) {
        const row = e.target.closest('tr');
        const id = parseInt(row.dataset.id);

        // Se obtiene el indice del estudiante en el array y se elimina de él.
        const index = students.findIndex(student => student.id === id);
        if (index !== -1) {
            students.splice(index, 1);
        }

        // Elimina la fila de la tabla.
        row.remove();
    }
};

/**
 * Llena la tabla con información de los estudiantes.
 * 
 * @returns {void}
 */
const populateTable = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        users.forEach(user => {
            // Crea una nueva fila e inserta los datos en ella.
            const row = document.createElement('tr');

            // Datos que solo necesitamos del JSON.
            row.dataset.id = user.id;
            ['name', 'email', 'phone'].forEach(key => {
                const cell = document.createElement('td');
                cell.textContent = user[key];
                cell.dataset[key] = user[key];
                row.appendChild(cell);
            });

            // Nota aleatoria entre 0 y 20 (incluyendo).
            const note = Math.floor(Math.random() * (20 + 1)) + 0;
            const noteCell = document.createElement('td');
            noteCell.textContent = note;
            noteCell.dataset.note = note
            row.appendChild(noteCell);

            // Agregamos el nuevo estudiante al array.
            students.push({ id: user.id, name: user.name, email: user.email, phone: user.phone, note: note });

            addButtons(row);

            // Agrega una nueva fila a la tabla.
            stuTableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
};

addStudentBtn.addEventListener('click', addStudent);
updateStudentBtn.addEventListener('click', updateStudent);
stuTableBody.addEventListener('click', deleteStudent);
stuTableBody.addEventListener('click', openModalUpdateStudent);
populateTable();
