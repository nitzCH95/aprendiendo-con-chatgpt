export const students = [];

/**
 * Carga los estudiantes desde localStorage.
 * 
 * @returns {[]} - Array de estudiantes o vacío si no existe nada.
 */
const loadFromLocSto = () => {
  const data = localStorage.getItem('students');
  return data ? JSON.parse(data) : [];
};

/**
 * Guarda el array students en localStorage.
 * 
 * @returns {void}
 */
export const saveOnLocSto = () => {
    localStorage.setItem('students', JSON.stringify(students));
};

/**
 * Busca información en localStorage y la almacena en el array students.
 * De no haber información la trae desde la API y la almacena en local storage
 * y en el array students.
 * 
 * @returns {void}
 */
export const populateLocalStorage = async () => {
    const studentsLocSto = loadFromLocSto();

    if (studentsLocSto.length > 0) {
        studentsLocSto.forEach(student => {
            students.push(student);
        });
    } else {
        try {
            const response = await fetch('https://mocki.io/v1/8341baae-aade-40db-bc69-12460e3474e9');
            const data = await response.json();

            data.forEach(d => {
                const student = { id: d.id, name: d.name, email: d.email, phone: d.phone, note: d.note };
                students.push(student);
            });

            saveOnLocSto();
        } catch (error) {
            console.error(error);
        }
    }
};