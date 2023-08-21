<script>
import axios from 'axios';

export default {
    data() {
        return {
            usuario: '',
            contraseña: '',
            message: '',
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
                console.log('Response', response)
                if (response.status === 201) {
                    this.$router.push('/usuarios');
                } else {
                    this.message = 'Error al iniciar sesión.';
                }
            } catch (error) {
                this.message = 'Error al iniciar sesión.';
            }
        },
    },
};
</script>

<template>
    <main>
        <header>
            <h1 class="">Login</h1>
            <p>Inicia sesión o crea una cuenta</p>
        </header>
        <form @submit.prevent="login">
            <label>
                <span>Ingrese su usuario</span>
                <input type="text" v-model="usuario" placeholder="usuario" />
            </label>
            <label>
                <span>Ingrese su contraseña</span>
                <input type="password" v-model="contraseña" placeholder="****" />
            </label>
            <input type="submit" value="Iniciar Sesión" />
        </form>

        <footer>
            <p>No tienes una cuenta? <router-link to="/register">Registro</router-link></p>
        </footer>
        <div class="alert" v-if="message === 'Acceso conseguido'">Sesión iniciada</div>
    </main>
</template>