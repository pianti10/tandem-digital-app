<template>
    <div>
        <h2>Lista de Usuarios</h2>
          <div>
            <label>Buscar:</label>
            <input type="text" v-model="term" @input="filtrarUsuarios" />
        </div>
        <ul>
            <button @click="crearNuevoUsuario">Crear Nuevo Usuario</button>
             <li v-for="usuario in usuariosFiltrados" :key="usuario.id">
                {{ usuario.nombre }} {{ usuario.apellido }} {{ usuario.email }} {{ usuario.telefono }} {{ usuario.usuario }}
                {{ maskPassword(usuario.contraseña) }}
                <button @click="editarUsuario(usuario)">Editar</button>
                <button @click="confirmarBorrarUsuario(usuario)">Eliminar</button>
            </li>
        </ul>

        <div v-if="editingUsuario">
            <h2>{{ editingUsuario.id ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}</h2>
            <form @submit.prevent="editingUsuario.id ? actualizarUsuario() : guardarNuevoUsuario()">
              
                <label>Nombre:</label>
                <input type="text" v-model="editingUsuario.nombre" />

                <label>Apellido:</label>
                <input type="text" v-model="editingUsuario.apellido" />

                <label>Email:</label>
                <input type="email" v-model="editingUsuario.email" />

                <label>Teléfono:</label>
                <input type="tel" v-model="editingUsuario.telefono" />

                <label>Usuario:</label>
                <input type="text" v-model="editingUsuario.usuario" />

                <label>Contraseña:</label>
                <input type="password" v-model="editingUsuario.contraseña" />
                <button type="submit">{{ editingUsuario.id ? 'Guardar' : 'Crear' }}</button>
                <button @click="cancelarEdicion">Cancelar</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            usuarios: [], // Almacena la información de los usuarios obtenida del servidor
            editingUsuario: null, // Usuario en edición
            term: '', // Término de búsqueda
        };
    },
    created() {
        this.fetchUsuarios();
    },
    methods: {
        async fetchUsuarios() {
            try {
                const response = await axios.get('http://localhost:3000/users');
                this.usuarios = response.data;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        },
        crearNuevoUsuario() {
            // Limpiar el formulario de edición
            this.editingUsuario = {
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                usuario: '',
                contraseña: '',
            };
        },
        async guardarNuevoUsuario() {
            try {
                const response = await axios.post(
                    'http://localhost:3000/users', // Cambiar la URL según tu API
                    this.editingUsuario
                );
                console.log('Usuario creado:', response.data);
                // Actualizar la lista de usuarios después de crear
                this.fetchUsuarios();
                // Limpiar el formulario y desactivar la edición
                this.editingUsuario = null;
            } catch (error) {
                console.error('Error al crear usuario:', error);
            }
        },
        cancelarEdicion() {
            // Restablecer el formulario y desactivar la edición
            this.editingUsuario = null;
        },
        editarUsuario(usuario) {
            // Al hacer clic en "Editar", mostrar el formulario de edición y cargar el usuario
            this.editingUsuario = { ...usuario };
        },
        async actualizarUsuario() {
            try {
                const response = await axios.put(
                    `http://localhost:3000/users/${this.editingUsuario.id}`,
                    this.editingUsuario
                );
                console.log('Usuario actualizado:', response.data);
                // Actualizar la lista de usuarios después de actualizar
                this.fetchUsuarios();
                // Limpiar el formulario y desactivar la edición
                this.editingUsuario = null;
            } catch (error) {
                console.error('Error al actualizar usuario:', error);
            }
        },
        confirmarBorrarUsuario(usuario) {
            if (window.confirm('¿Estás seguro de que deseas borrar este usuario?')) {
                this.borrarUsuario(usuario);
            }
        },
        async borrarUsuario(usuario) {
            try {
                await axios.delete(`http://localhost:3000/users/${usuario.id}`);
                // Actualizar la lista de usuarios después de borrar
                this.fetchUsuarios();
            } catch (error) {
                console.error('Error al borrar el usuario:', error);
            }
        },
        // ... otros métodos de eliminación ...
        maskPassword(password) {
            // Devuelve asteriscos en lugar de la contraseña real
            return '*'.repeat(password.length);
        },
        filtrarUsuarios() {
            // Filtrar usuarios en función del término de búsqueda
            const termLower = this.term.toLowerCase();
            this.usuariosFiltrados = this.usuarios.filter(usuario => {
                return (
                    usuario.nombre.toLowerCase().includes(termLower) ||
                    usuario.apellido.toLowerCase().includes(termLower) ||
                    usuario.email.toLowerCase().includes(termLower) ||
                    usuario.telefono.includes(this.term) ||
                    usuario.usuario.toLowerCase().includes(termLower)
                );
            });
        },
    },
    computed: {
        usuariosFiltrados() {
            if (this.term === '') {
                return this.usuarios; // Mostrar todos los usuarios si no hay término de búsqueda
            }

            const termLower = this.term.toLowerCase();
            return this.usuarios.filter(usuario => {
                // Filtrar por todos los campos del usuario
                return (
                    usuario.nombre.toLowerCase().includes(termLower) ||
                    usuario.apellido.toLowerCase().includes(termLower) ||
                    usuario.email.toLowerCase().includes(termLower) ||
                    usuario.telefono.includes(this.term) ||
                    usuario.usuario.toLowerCase().includes(termLower)
                );
            });
        },
    },
};
</script>
  