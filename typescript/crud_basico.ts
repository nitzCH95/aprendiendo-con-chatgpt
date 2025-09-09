// 1. Definimos la base del usuario
interface Usuario {
    readonly id: number;  // ID no cambia
    nombre: string;
    email: string;
    password: string;
}

// 2. Crear un usuario nuevo (no necesita id porque se genera solo)
type NuevoUsuario = Omit<Usuario, "id">;

// 3. Para actualizar un usuario: usamos Partial
type UsuarioUpdate = Partial<NuevoUsuario>;

// 4. Para mostrar públicamente: ocultamos password
type UsuarioPublico = Pick<Usuario, "id" | "nombre" | "email">;

// ------------------- CRUD SIMULADO -------------------
class UsuarioService {
    private usuarios: Usuario[] = [];
    private nextId: number = 1;

    // Crear usuario
    crear(data: NuevoUsuario): Usuario {
        const nuevo: Usuario = { id: this.nextId++, ...data };
        this.usuarios.push(nuevo);
        return nuevo;
    }

    // Actualizar usuario
    actualizar(id: number, cambios: UsuarioUpdate): Usuario | undefined {
        const user = this.usuarios.find(u => u.id === id);
        if (!user) return undefined;
        Object.assign(user, cambios);
        return user;
    }

    // Listar usuarios públicos
    listarPublicos(): UsuarioPublico[] {
        return this.usuarios.map(({ id, nombre, email }) => ({ id, nombre, email }));
    }
}

// ------------------- USO -------------------
const service = new UsuarioService();

// Crear usuarios
const u1 = service.crear({ nombre: "Andy", email: "andy@mail.com", password: "1234" });
const u2 = service.crear({ nombre: "Carla", email: "carla@mail.com", password: "abcd" });

console.log("Usuarios creados:", u1, u2);

// Actualizar un usuario
service.actualizar(1, { email: "andy_new@mail.com" });

// Listar usuarios públicos (sin password)
console.log("Usuarios públicos:", service.listarPublicos());
