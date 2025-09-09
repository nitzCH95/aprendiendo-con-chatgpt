// Ejercicio 12
const myTable = document.getElementById("myTable");
const rows = myTable.querySelectorAll('tbody tr');
const btn = document.getElementById('verAprobados');
const resultado = document.createElement('div');

btn.addEventListener('click', () => {
    const students = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        students.push({
            nombre: cells[0].textContent,
            nota: Number(cells[1].textContent)
        });
    });

    const aprobados = students.filter(s => s.nota >= 11).map(s => s.nombre);
    document.body.appendChild(resultado);
    resultado.textContent = `Aprobados: ${aprobados.join(', ')}`;
});