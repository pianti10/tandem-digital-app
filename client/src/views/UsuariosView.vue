<template>
    <div>
        <h2>Lista de Usuarios</h2>
        <ul>
            <li v-for="usuario in usuarios" :key="usuario.id">
                {{ usuario.nombre }} {{ usuario.apellido }} {{ usuario.email }} {{ usuario.telefono }} {{ usuario.usuario }}
                {{ maskPassword(usuario.contraseña) }}
                <button @click="editarUsuario(usuario)">Editar</button>
                <button @click="confirmarBorrarUsuario(usuario)">Eliminar</button>
                <!-- <button @click="borrarUsuario(usuario)">Eliminar</button> -->
            </li>
        </ul>

        <!-- Agregar el formulario de edición -->
        <div v-if="editingUsuario">
            <h2>Editar Usuario</h2>
            <form @submit.prevent="actualizarUsuario">
                <label>Nombre:</label>
                <input type="text" v-model="editingUsuario.nombre" />

                <label>Apellido:</label>
                <input type="text" v-model="editingUsuario.apellido" />

                <label>Email:</label>
                <input type="text" v-model="editingUsuario.email" />

                <label>Teléfono:</label>
                <input type="text" v-model="editingUsuario.telefono" />

                <label>Usuario:</label>
                <input type="text" v-model="editingUsuario.usuario" />

                <label>Contraseña:</label>
                <input type="text" v-model="editingUsuario.contraseña" />

                <!-- Agrega más campos de edición aquí... -->

                <button type="submit">Guardar</button>
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
    },
};
</script>
  