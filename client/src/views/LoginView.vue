<script setup>
import { ref } from 'vue'

const usuario = ref('')
const password = ref('')
</script>

<template>
    <main>
        <header>
            <h1 class="">Login</h1>
            <p>Inicia sesión o crea una cuenta</p>
        </header>
        <form @submit.prevent="">
            <label>
                <span>Ingrese su usuario</span>
                <input 
                type="text" 
                v-model="usuario" 
                placeholder="usuario" />
            </label>
            <label>
                <span>Ingrese su contraseña</span>
                <input 
                type="password" 
                v-model="password" 
                placeholder="**********" />
            </label>
            <input 
            type="submit" 
            value="Login" />
        </form>

        <footer>
            <p>No tienes una cuenta? <router-link to="/register">Registro</router-link></p>
        </footer>
    </main>
</template>