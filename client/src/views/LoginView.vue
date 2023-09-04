<template>
    <v-container class="fill-height" fluid>
        <v-row class="fill-height" justify="center" align="center">
            <v-col cols="12" md="8">
                <div class="login-container">
                    <h2 class="text-center mb-15 v-display-2 font-weight-bold teal--text darken-2">Iniciar Sesión</h2>
                    <v-form @submit.prevent="login" v-model="valid">
                        <v-container>
                            <v-row justify="center">
                                <v-col cols="8" md="10">
                                    <!-- Campos de entrada para nombre de usuario y contraseña -->
                                    <v-text-field v-model="usuario" type="text" label="Nombre de usuario"
                                        required></v-text-field>
                                    <v-text-field type="password" v-model="contraseña" label="Contraseña"
                                        required></v-text-field>
                                </v-col>
                                  <!-- Botón para enviar el formulario -->
                                <v-row class="mt-4">
                                    <v-col cols="12" xs="12" md="12" class="text-center">
                                        <v-btn type="submit" color="#009688" dark>Iniciar Sesión</v-btn>
                                    </v-col>
                                </v-row>
                            </v-row>
                        </v-container>
                         <!-- Enlace para registrarse -->
                        <footer>
                            <p class="register-link mt-8">
                                <v-btn color="primary" text to="/register">¿No tienes una cuenta? Registrate</v-btn>
                            </p>
                        </footer>
                    </v-form>
                        <!-- Contenedor para mostrar mensajes de error -->
                    <div class="error-alert-container">
                        <v-alert v-if="errorMensaje" type="error">
                            {{ errorMensaje }}
                        </v-alert>
                    </div>
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
             // Datos del formulario de inicio de sesión
            usuario: '',
            contraseña: '',
            message: '',
            errorMensaje: ''
        };
    },
    methods: {
         // Función para realizar el inicio de sesión
        async login() {
            try {
                // Envía una solicitud de inicio de sesión al servidor
                const response = await axios.post('http://localhost:3000/login', {
                    usuario: this.usuario,
                    contraseña: this.contraseña,
                });
                console.log('Response', response);
                if (response.status === 201) {
                     // Al iniciar sesión con éxito, guarda el token en el almacenamiento local y redirige al usuario
                    localStorage.setItem("token", response.data.token)
                    this.$router.push('/usuarios');
                } else {
                    console.log('Error al iniciar sesión.');
                    if (response.status === 401) {
                        // Muestra un mensaje de error si las credenciales son incorrectas
                        this.mostrarError('Credenciales incorrectas.');
                    } else {
                        // Muestra un mensaje de error genérico en otros casos de error
                        this.mostrarError('Error al iniciar sesión.');
                    }
                }
            } catch (error) {
                this.mostrarError('Error al iniciar sesión.');
            }
        },
        // Función para mostrar mensajes de error durante un período de tiempo
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
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.register-link {
    margin-top: 10px;
    text-align: center;
}

.error-alert-container {
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 20px;
    margin-right: 20px;
}
</style>