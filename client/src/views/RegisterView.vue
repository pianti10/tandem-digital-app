<template>
  <div>
    <div class="d-flex flex-column justify-center align-center" style="height: 100vh;">
      <v-form @submit.prevent="registrarUsuario" ref="form" v-model="valid" lazy-validation>
        <div>
          <h2 class="text-center mb-15 v-display-2 font-weight-bold teal--text darken-2">¡Registra un Nuevo Usuario!</h2>
        </div>
        <v-row>
          <v-col>
            <v-text-field v-model="usuario.nombre" label="Nombre" required></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field v-model="usuario.apellido" label="Apellido" required></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field v-model="usuario.email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field v-model="usuario.telefono" label="Teléfono" required maxlength="14"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field v-model="usuario.usuario" label="Usuario" required></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field type="password" v-model="usuario.contraseña" label="Contraseña" required></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field type="password" v-model="usuario.confirmarContraseña" label="Confirmar contraseña"
              required></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-10">
          <v-btn type="submit" color="#009688" dark>Registrarse</v-btn>
        </v-row>
      </v-form>

    </div>
    <v-alert v-if="errorMensaje" type="error" style="position: fixed; top: 20px; right: 20px">
      {{ errorMensaje }}
    </v-alert>
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
      },
      errorMensaje: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail requerido',
        v => /.+@.+\..+/.test(v) || 'El E-mail debe ser valido',
      ],
    };
  },
  methods: {
    async registrarUsuario() {
      if (this.usuario.contraseña !== this.usuario.confirmarContraseña) {
        this.mostrarError('Las contraseñas no coinciden');
        return;
      }

      if (this.usuario.nombre === '' || this.usuario.apellido === '' || this.usuario.email === '' || this.usuario.telefono === '' || this.usuario.usuario === '' || this.usuario.contraseña === '') {
        this.mostrarError('Por favor llene todos los campos');
        return
      }
      const email = /.+@.+\..+/.test(this.usuario.email);
      if (!email) {
        this.mostrarError('El correo ingresado es invalido');
        return
      }
      const telefono = this.usuario.telefono;

      if (
        (typeof this.usuario.telefono !== 'number' && !(/^\+?\d+$/.test(telefono))) ||
        ((telefono.startsWith('+') && telefono.length < 14) || (!telefono.startsWith('+') && telefono.length > 12))
      ) {
        this.mostrarError('Número de teléfono inválido');
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