// Ejercicio 13.
const myTable = document.getElementById("myTable");
const rows = myTable.querySelectorAll('tbody tr');
const btn = document.getElementById('verAprobados');
const resultado = document.createElement('div');
const noteInput = document.getElementById('minimumNote');

btn.addEventListener('click', () => {
    const students = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        students.push({
            nombre: cells[0].textContent,
            nota: Number(cells[1].textContent)
        });
    });

    const note = noteInput.value;

    const aprobados = students.filter(s => s.nota >= Number(note)).map(s => s.nombre);

    document.body.appendChild(resultado);
    resultado.textContent = aprobados.length > 0 ? `Aprobados: ${aprobados.join(', ')}` : 'No hay aprobados.';
});