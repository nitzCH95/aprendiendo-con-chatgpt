// Ejercicio 16-18.
const students = [];

// Tabla.
const stuTable = document.getElementById('myTable');

// Cuerpo de la tabla.
const stuTableBody = document.querySelector('tbody');

// Botón para agregar estudiante.
const addStudentBtn = document.getElementById('addStudent');

// Valores para nuevo estudiante.
const stuNameInput = document.getElementById('stuName');
const stuNoteInput = document.getElementById('stuNote');

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

// Actualiza a un estudiante de la tabla y del array.
const openModalUpdateStudent = (e) => {
    if (e.target.classList.contains('update')) {
        const row = e.target.closest('tr');
        const id = modalContent.dataset.id = parseInt(row.dataset.id);

        // Busca al estudiante y llena su información en el modal
        const student = students.find(student => student.id === id);
        stuUpdateNameInput.value = student.name;
        stuUpdateNoteInput.value = student.note;

        // Apertura el modal.
        modal.style.display = 'flex';
    }
};

// Agrega el botón para borrar estudiante.
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

// Agregar estudiantes a la tabla
const addStudent = () => {
    // Obtiene los valores del pequeño formulario.
    const stuName = stuNameInput.value.trim();
    const stuNote = Number(stuNoteInput.value);

    if (!stuName) {
        alert('Ingrese un nombre válido');
        return;
    }

    if (isNaN(stuNote)) {
        alert('Ingrese una nota válida')
        return;
    }

    if (stuNote < 0 || stuNote > 20) {
        alert('El rango de notas va de 0 a 20')
        return;
    }

    // Id de nuevo estudiante.
    const newId = students.length === 0 ? 1 : students[students.length - 1].id + 1;

    // Agrega el nuevo estudiante y su nota al arreglo.
    students.push({ id: newId, name: stuName, note: stuNote });

    // Crea una nueva fila e inserta los datos en ella.
    const row = document.createElement('tr');
    row.dataset.id = newId;
    const cellName = document.createElement('td');
    const cellNote = document.createElement('td');

    cellName.textContent = stuName;
    cellNote.textContent = stuNote;

    // Agrega una nueva fila a la tabla.
    row.appendChild(cellName);
    row.appendChild(cellNote);

    // Botón para borrar y actualizar estudiante.
    addButtons(row);
    stuTableBody.appendChild(row);
};

// Actualiza la información de un estudiante.
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

    student.name = newName;
    student.note = newNote;

    modal.style.display = 'none';
};

// Borra un estudiante de la tabla y del array.
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

// Inserción de datos en la tabla.
const populateTable = async () => {
    // Limpia todo el cuerpo de la tabla antes de insertar las filas.
    stuTableBody.replaceChildren();

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    users.forEach(user => {
        // Crea una nueva fila e inserta los datos en ella.
        const row = document.createElement('tr');
        row.dataset.id = user.id;

        // Nota aleatoria entre 0 y 20 (incluyendo).

        ['name', 'email', 'phone'].forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = user[key];
            row.appendChild(cell);
        });

        // Botón para borrar y actualizar estudiante.
        addButtons(row);

        // Agrega una nueva fila a la tabla.
        stuTableBody.appendChild(row);
    });
};

addStudentBtn.addEventListener('click', addStudent);
updateStudentBtn.addEventListener('click', updateStudent);
stuTableBody.addEventListener('click', deleteStudent);
stuTableBody.addEventListener('click', openModalUpdateStudent);
populateTable();
