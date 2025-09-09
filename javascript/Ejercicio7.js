// Ejercicio 7.
const esMayorDeEdad = (edad) => edad >= 18;

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
    edad: 17,
    pais: 'Mexico'
}

const personas = [person1, person2, person3];

personas.forEach((persona) => {
    console.log(esMayorDeEdad(persona.edad) ? `${persona.nombre} es mayor de edad` : `${persona.nombre} es menor de edad.`);
});