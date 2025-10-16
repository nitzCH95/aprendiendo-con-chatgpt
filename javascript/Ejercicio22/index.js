// Array de usuarios.
const users = [];

// Botón para agregar cargar usuarios.
const loadUsersBtn = document.getElementById('loadUsers');

// Cuerpo de la tabla.
const tableUsersBody = document.getElementById('tableUsersBody');

// Mensaje de carga.
const loadingBox = document.querySelector('.loading');

/*
 * Obtiene usuarios desde una API y los muestra en una tabla.
 *
 * @async
 * @function loadUsers
 * @returns {Promise<void>}
 */
const loadUsers = async () => {
    users.length = 0;
    tableUsersBody.replaceChildren();
    try {
        loadingBox.textContent = 'Obteniendo usuarios...';
        loadingBox.style.display = 'block';
        loadUsersBtn.disabled = true;
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        const data = await response.json();

        data.forEach(element => {
            const user = { id: element.id, name: element.name, username: element.username, email: element.email };
            users.push(user);
        });
        loadingBox.style.display = 'none';
        populateTable();
    } catch (error) {
        loadingBox.textContent = `Error: ${error.message}`;
    }

    loadUsersBtn.disabled = false;
};

/*
 * LLena la tabla con usuarios.
 * @returns {void}
 */
const populateTable = () => {
    users.forEach(user => {
        const row = document.createElement('tr');

        Object.keys(user).forEach(key => {
            const td = document.createElement('td');
            td.textContent = user[key];
            row.appendChild(td);
        });

        tableUsersBody.appendChild(row);
    });
}

loadUsersBtn.addEventListener('click', loadUsers);
