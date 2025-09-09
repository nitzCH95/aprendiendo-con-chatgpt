// Ejercicio 10.
const estudiantes = [
    {nombre: "Andy", edad: 29, nota: 12},
    {nombre: "Samantha", edad: 17, nota: 20},
    {nombre: "Frank", edad: 23, nota: 10},
    {nombre: "Jorge", edad: 20, nota: 17},
    {nombre: "Rosmery", edad: 31, nota: 18}
];

const aprobados = estudiantes.filter(estudiante => estudiante.nota >= 11);
const anuncios = estudiantes.map(estudiante => `${estudiante.nombre} sacó ${estudiante.nota} puntos.`);
const total = estudiantes.reduce((acc, estudiante) => acc + estudiante.nota, 0);
const promedio = total / estudiantes.length;

console.log(aprobados);
console.log(anuncios);
console.log(promedio);
