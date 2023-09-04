<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height" justify="center" align="center">
      <v-col cols="12" md="8">
        <div>
          <div class="d-flex flex-column justify-center align-center">
            <v-form @submit.prevent="registrarUsuario" ref="form" v-model="valid" lazy-validation>
              <div>
                <h2 class="text-center mb-15 v-display-2 font-weight-bold teal--text darken-2">¡Registra un Nuevo Usuario!
                </h2>
              </div>
              <!-- Campos de entrada de datos -->
              <v-row justify="center">
                <v-col cols="6" md="8">
                  <v-text-field v-model="usuario.nombre" label="Nombre" required />
                  <v-text-field v-model="usuario.apellido" label="Apellido" required />
                  <v-text-field v-model="usuario.email" :rules="emailRules" label="E-mail" required />
                  <v-text-field v-model="usuario.telefono" maxlength="14" label="Teléfono" required />
                  <v-text-field v-model="usuario.usuario" label="Usuario" required />
                  <v-text-field type="password" v-model="usuario.contraseña" label="Contraseña" required />
                  <v-text-field type="password" v-model="usuario.confirmarContraseña" label="Confirmar contraseña"
                    required />
                </v-col>
              </v-row>
              <!-- Botones de registro y volver atrás -->
              <v-row class="mt-4">
                <v-col cols="12" xs="12" md="5" class="text-center">
                  <v-btn @click="volverAtras" color="grey" dark>Volver Atrás</v-btn>
                </v-col>
                <v-col cols="12" md="5" :class="{ 'ml-5': $vuetify.breakpoint.mdAndUp }" class="text-center">
                  <v-btn type="submit" color="#009688" dark>Registrarse</v-btn>
                </v-col>
              </v-row>
            </v-form>

          </div>
            <!-- Mensaje para indicar que el usuario se creo exitosamente-->
          <v-alert v-if="registroExitoso" type="success" style="position: fixed; top: 20px; right: 20px">
            Usuario creado exitosamente
          </v-alert>
          <!-- Mensaje de error (se muestra si errorMensaje tiene un valor) -->
          <v-alert v-if="errorMensaje" type="error" style="position: fixed; top: 20px; right: 20px">
            {{ errorMensaje }}
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Datos del formulario de registro de usuario
      usuario: {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        usuario: '',
        contraseña: '',
        confirmarContraseña: '',
      },
      registroExitoso: false,
      errorMensaje: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail requerido',
        v => /.+@.+\..+/.test(v) || 'El E-mail debe ser valido',
      ],
    };
  },
  methods: {
    // Función para registrar un nuevo usuario
    async registrarUsuario() {
      // Verifica si las contraseñas coinciden
      if (this.usuario.contraseña !== this.usuario.confirmarContraseña) {
        this.mostrarError('Las contraseñas no coinciden');
        return;
      }

      // Verifica si todos los campos están llenos
      if (this.usuario.nombre === '' || this.usuario.apellido === '' || this.usuario.email === '' || this.usuario.telefono === '' || this.usuario.usuario === '' || this.usuario.contraseña === '') {
        this.mostrarError('Por favor llene todos los campos');
        return
      }
      // Verifica si el email es válido
      const email = /.+@.+\..+/.test(this.usuario.email);
      if (!email) {
        this.mostrarError('El correo ingresado es invalido');
        return
      }
      const telefono = this.usuario.telefono;  // Verifica si el número de teléfono es válido

      if (
        (typeof this.usuario.telefono !== 'number' && !(/^\+?\d+$/.test(telefono))) ||
        ((telefono.startsWith('+') && telefono.length < 14) || (!telefono.startsWith('+') && telefono.length > 10 || telefono.length < 9))
      ) {
        this.mostrarError('Número de teléfono inválido');
        return;
      }
      try {
        // Envía la solicitud de registro al servidor
        const response = await axios.post('http://localhost:3000/users', this.usuario, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        console.log('Usuario registrado:', response.data);


        this.registroExitoso = true;

        this.ocultarAlertaRegistro(); // Oculta la alerta después de un tiempo

        setTimeout(() => {
          this.$router.push('/');  // Redirige al usuario al login después del registro
        }, 4000);

      } catch (error) {
        this.mostrarError(error.response.data);
        console.error('Error al registrar usuario:', error);
      }
    },
    // Muestra un mensaje de error durante un período de tiempo
    mostrarError(mensaje) {
      this.errorMensaje = mensaje;
      setTimeout(() => {
        this.errorMensaje = '';
      }, 4000);
    },
    // Vuelve atrás en la navegación utilizando el router
    volverAtras() {
      // Usa el router para volver atrás
      this.$router.go(-1);
    },
    ocultarAlertaRegistro() {
      setTimeout(() => {
        this.registroExitoso = false;
      }, 4000);
    },
  },
};
</script>