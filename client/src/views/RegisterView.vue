<script setup>
import { ref } from 'vue'

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const telefono = ref('')
const usuario = ref('')
const password = ref('')
const conf_password = ref('')
</script>

<template>
    <main>
        <header>
            <h1 class="">Registro</h1>
            <p>Crea una cuenta</p>
        </header>
        <form @submit.prevent="">
            <label>
                <span>Ingrese su nombre</span>
                <input 
                type="text" 
                v-model="nombre" 
                placeholder="Nombre" />
            </label>
            <label>
                <span>Ingrese su apellido</span>
                <input 
                type="text" 
                v-model="apellido" 
                placeholder="Apellido" />
            </label>
            <label>
                <span>Ingrese su email</span>
                <input 
                type="text" 
                v-model="email" 
                placeholder="ejemp@gmail.com" />
            </label>
            <label>
                <span>Ingrese su teléfono</span>
                <input 
                type="text" 
                v-model="telefono" 
                placeholder="tel: " />
            </label>
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
            <label>
                <span>Confirme su contraseña</span>
                <input 
                type="password" 
                v-model="conf_password" 
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