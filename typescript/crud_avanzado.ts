// 1. Definimos los posibles roles
type Rol = "ADMIN" | "EDITOR" | "VISITANTE";

// 2. Definimos los permisos por rol usando Record
const permisos: Record<Rol, string[]> = {
    ADMIN: ["crear", "editar", "eliminar", "ver"],
    EDITOR: ["editar", "ver"],
    VISITANTE: ["ver"]
};

// 3. Definimos el Usuario con roles
interface Usuario {
    readonly id: number;
    nombre: string;
    email: string;
    password: string;
    rol: Rol;
}

// 4. Tipos derivados
type NuevoUsuario = Omit<Usuario, "id">;
type UsuarioUpdate = Partial<NuevoUsuario>;
type UsuarioPublico = Pick<Usuario, "id" | "nombre" | "email" | "rol">;

// ------------------- CRUD -------------------
class UsuarioService {
    private usuarios: Usuario[] = [];
    private nextId: number = 1;

    crear(data: NuevoUsuario): Usuario {
        const nuevo: Usuario = { id: this.nextId++, ...data };
        this.usuarios.push(nuevo);
        return nuevo;
    }

    actualizar(id: number, cambios: UsuarioUpdate): Usuario | undefined {
        const user = this.usuarios.find(u => u.id === id);
        if (!user) return undefined;
        Object.assign(user, cambios);
        return user;
    }

    listarPublicos(): UsuarioPublico[] {
        return this.usuarios.map(({ id, nombre, email, rol }) => ({ id, nombre, email, rol }));
    }

    // Nuevo método: verificar permisos
    tienePermiso(id: number, accion: string): boolean {
        const user = this.usuarios.find(u => u.id === id);
        if (!user) return false;
        return permisos[user.rol].includes(accion);
    }
}

// ------------------- USO -------------------
const service = new UsuarioService();

// Crear usuarios
const admin = service.crear({ nombre: "Andy", email: "andy@mail.com", password: "1234", rol: "ADMIN" });
const editor = service.crear({ nombre: "Carla", email: "carla@mail.com", password: "abcd", rol: "EDITOR" });
const visitante = service.crear({ nombre: "Mario", email: "mario@mail.com", password: "xyz", rol: "VISITANTE" });

console.log("Usuarios públicos:", service.listarPublicos());

// Actualizar rol de un usuario
service.actualizar(3, { rol: "EDITOR" });

// Verificar permisos
console.log(`¿Andy puede eliminar?`, service.tienePermiso(1, "eliminar"));
console.log(`¿Carla puede crear?`, service.tienePermiso(2, "crear"));
console.log(`¿Mario puede ver?`, service.tienePermiso(3, "ver"));
