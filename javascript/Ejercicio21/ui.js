const modal = document.getElementById('modal');

// Inputs de estudiante a editar.
export const stuUpdateNameInput = document.getElementById('stuUpdateName');
export const stuUpdateNoteInput = document.getElementById('stuUpdateNote');

/**
 * Oculta el modal.
 * 
 * @returns {void}
 */
export const hideModal = () => {
    modal.style.display = 'none';
    stuUpdateNameInput.value = '';
    stuUpdateNoteInput.value = '';
}

/**
 * Oculta el modal al hacer click en su overlay.
 * 
 * @returns {void}
 */
export const overlayModal = (e) => {
    if (e.target === modal) {
        hideModal();
    }
}

/**
 * Muenstra el modal para actualizar un estudiante. 
 * @param {*} e - Evento click.
 * @returns {void}
 */
export const openModalUpdateStudent = (e) => {
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
 * Agrega los botones de borrar y actualizar para un estudiante.
 *  
 * @param {*} row - Fila donde se agregaran los botones.
 * @returns {void}
 */
export const addButtons = row => {
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
