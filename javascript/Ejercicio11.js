// Ejercicio 11.
const estudiantes = [
    {nombre: "Andy", edad: 29, nota: 12},
    {nombre: "Samantha", edad: 17, nota: 20},
    {nombre: "Frank", edad: 23, nota: 10},
    {nombre: "Jorge", edad: 20, nota: 17},
    {nombre: "Rosmery", edad: 31, nota: 18}
];

const aprobados = estudiantes.filter(e => e.nota >= 11).map(e => e.nombre);
const desaprobados = estudiantes.filter(e => e.nota < 11).map(e => e.nombre);
const sobresaliente = estudiantes.filter(e => e.nota === 20).map(e => e.nombre);

console.log(aprobados);
console.log(desaprobados);
console.log(sobresaliente);