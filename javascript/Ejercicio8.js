const presentarPersona = (persona) => `Hola, me llamo ${persona.nombre}, tengo ${persona.edad} y soy de ${persona.pais}`;

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
personas.forEach((persona) => console.log(presentarPersona(persona)));