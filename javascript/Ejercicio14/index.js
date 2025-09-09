// Ejercicio 14.
const myTable = document.getElementById("myTable");
const rows = myTable.querySelectorAll('tbody tr');

const btn = document.getElementById('verAprobados');
const noteInput = document.getElementById('minimumNote');

btn.addEventListener('click', () => {
    const minimumNote = Number(noteInput.value);
    let cantAprobados = 0;
    let cantDesaprobados = 0;
    let cells;
    let nota;

    rows.forEach(row => {
        cells = row.querySelectorAll('td');
        nota = Number(cells[1].textContent);
        
        row.classList.remove('aprobado', 'desaprobado');
        row.classList.add(nota >= minimumNote ? 'aprobado' : 'desaprobado');
    });
});