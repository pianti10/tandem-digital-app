<template>
    <div>
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="registrarUsuario">
        <label>Nombre:</label>
        <input type="text" v-model="usuario.nombre" />
  
        <label>Apellido:</label>
        <input type="text" v-model="usuario.apellido" />
  
        <label>Email:</label>
        <input type="email" v-model="usuario.email" />
  
        <label>Teléfono:</label>
        <input type="tel" v-model="usuario.telefono" />
  
        <label>Usuario:</label>
        <input type="text" v-model="usuario.usuario" />
  
        <label>Contraseña:</label>
        <input type="password" v-model="usuario.contraseña" />
  
        <button type="submit">Registrarse</button>
      </form>
      <footer>
            <p>No tienes una cuenta? <router-link to="/register">Registro</router-link></p>
        </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        usuario: {
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          usuario: '',
          contraseña: '',
        },
      };
    },
    methods: {
      async registrarUsuario() {
        try {
          const response = await axios.post('http://localhost:3000/users', this.usuario);
          console.log('Usuario registrado:', response.data);
          // Puedes redirigir al usuario a donde desees después de registrar
          this.$router.push('/usuarios');
        } catch (error) {
          console.error('Error al registrar usuario:', error);
        }
      },
    },
  };
  </script>
  