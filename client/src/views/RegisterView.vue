<template>
  <div class="register-container">
    <v-form @submit.prevent="registrarUsuario" ref="form" v-model="valid" lazy-validation>
      <h2 class="headline text-center mb-15">Registro de usuario</h2>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-text-field v-model="usuario.nombre" label="Nombre" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-text-field v-model="usuario.apellido" label="Apellido" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-text-field v-model="usuario.email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-text-field v-model="usuario.telefono" label="Teléfono" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-text-field v-model="usuario.usuario" label="Usuario" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-text-field type="password" v-model="usuario.contraseña" label="Contraseña" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-text-field type="password" v-model="usuario.confirmarContraseña" label="Confirmar contraseña" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-btn type="submit" color="green" dark>Registrarse</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div class="error-alert-container">
    <v-alert v-if="errorMensaje" type="error"> 
    {{ errorMensaje }}
  </v-alert>
</div>
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
        confirmarContraseña: '',
        errorMensaje: ''
      },
      errorMensaje: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    async registrarUsuario() {
      if (this.usuario.contraseña !== this.usuario.confirmarContraseña) {
        this.mostrarError('Las contraseñas no coinciden');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/users', this.usuario);
        console.log('Usuario registrado:', response.data);
        this.$router.push('/usuarios');
      } catch (error) {
        this.mostrarError('Error: ' + error.response.data);
        console.error('Error al registrar usuario:', error);
      }
    },
    mostrarError(mensaje) {
      this.errorMensaje = mensaje;
      setTimeout(() => {
        this.errorMensaje = '';
      }, 4000);
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.error-alert-container {
  position: fixed;
  top: 0;
  right: 0;
  margin-top: 20px; /* Ajusta el margen superior según sea necesario */
  margin-right: 20px; /* Ajusta el margen derecho según sea necesario */
}

.error-alert {
  width: 300px; /* Ajusta el ancho según sea necesario */
}
</style>
  