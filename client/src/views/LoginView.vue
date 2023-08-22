<template>
    <div class="login-container">
        <v-form @submit.prevent="login" v-model="valid">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" md="12">
                        <v-text-field v-model="usuario" type="text" label="Nombre de usuario" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="12" md="12">
                        <v-text-field type="password" v-model="contraseña" label="Contraseña" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="12" md="7">
                        <v-btn type="submit" color="green" dark>Iniciar Sesión</v-btn>
                    </v-col>
                </v-row>
            </v-container>
            <footer>
                <p class="register-link">
                    <v-btn color="primary" text to="/register">No tienes una cuenta? Registrate</v-btn>
                </p>
            </footer>
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
            usuario: '',
            contraseña: '',
            message: '',
            errorMensaje: ''
        };
    },
    methods: {
        async login() {
            console.log('Login method invoked');
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    usuario: this.usuario,
                    contraseña: this.contraseña,
                });
                console.log('Response', response);
                if (response.status === 201) {
                    this.$router.push('/usuarios');
                } else {
                    console.log('Error al iniciar sesión.');
                    if (response.status === 401) {
                        this.mostrarError('Credenciales incorrectas.');
                    } else {
                        this.mostrarError('Error al iniciar sesión.');
                    }
                }
            } catch (error) {
                console.log('Error al iniciar sesión.', error);
                this.mostrarError('Error al iniciar sesión.');
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
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.register-link {
    text-align: center;
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