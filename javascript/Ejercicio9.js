// Ejercicio 9
const personas = [
    {nombre: 'Maria', edad: 15, pais:'Mexico'},
    {nombre: 'Jose', edad: 34, pais:'Holanda'},
    {nombre: 'Roberto', edad: 21, pais:'Italia'},
    {nombre: 'Wendy', edad: 16, pais:'Perú'},
    {nombre: 'Ricardo', edad: 43, pais:'Chile'}
]

const nombres = personas.map((persona) => persona.nombre);
const mayores = personas.filter((persona) => persona.edad >= 18);
const nombresMayores = mayores.map((mayor) => mayor.nombre);
const findPerson = (nombre) => personas.find((persona) => persona.nombre === nombre);

console.log(nombres);
console.log(mayores);
console.log(findPerson('Maria'));
console.log(nombresMayores);