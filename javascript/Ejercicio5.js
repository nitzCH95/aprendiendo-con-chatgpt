// Ejercicio 5.
const person1 = {
    nombre: 'Mario',
    edad: 29,
    pais: 'Holanda'
}

const person2 = {
    nombre: 'Maria',
    edad: 30,
    pais: 'Colombia'
}

const person3 = {
    nombre: 'Jesus',
    edad: 40,
    pais: 'Mexico'
}

const personas = [person1, person2, person3];

console.log(personas);

for (const persona of personas) {
    console.log(persona.nombre)
    console.log(`${persona.nombre} tiene ${persona.edad} años y es de ${persona.pais}`);
}