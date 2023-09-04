<template>
    <v-container class="fill-height" fluid>
        <v-row class="fill-height" justify="center" align="center">
            <v-col cols="12" md="12">
                <div>
                    <h2 class="text-center mb-15 v-display-2 font-weight-bold teal--text darken-2 mt-5">Lista de Usuarios
                    </h2>
                    <!-- Mensaje de error (se muestra si errorMensaje tiene un valor) -->
                    <v-alert v-if="errorMensaje" type="error" style="position: fixed; top: 20px; right: 20px">
                        {{ errorMensaje }}
                    </v-alert>
                    <v-data-table :headers="headers" :items="users" class="elevation-1" :search="search">
                        <template v-slot:top>
                            <v-toolbar flat>

                                <v-row>
                                    <v-col xs="6" md="6" sm="6">
                                        <v-text-field v-model="search" color="#009688" append-icon="mdi-magnify"
                                            label="Search" single-line hide-details></v-text-field>
                                    </v-col>
                                </v-row>
                                <!-- Componente del dialog para agregar/editar usuarios -->
                                <user-dialog :formTitle="formTitle" :editedItem="editedItem" :dialog="dialog" :users="users"
                                    :editedIndex="editedIndex" :errorMensaje="errorMensaje" @edit-user="editItem"
                                    @save-user="save" @close-dialog="close"></user-dialog>

                                <!-- Diálogo de confirmación para eliminar usuarios -->
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5">¿Estás seguro de que quieres eliminar este
                                            usuario?</v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text
                                                @click="deleteItemConfirm(editedItem)">OK</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">

                            <!-- Iconos para editar y eliminar usuarios en cada fila de la tabla -->
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>

                    <!-- Botón para cerrar sesión -->
                    <div class="text-center mt-5">
                        <v-btn color="red" dark @click="logout">Cerrar Sesión</v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';
import UserDialog from '../components/UserDialog.vue'

export default {
    components: {
        UserDialog,
    },
    data: () => ({
        search: '',
        // Controla si el diálogo de edición de usuario está abierto o cerrado
        dialog: false,
        // Controla si el diálogo de confirmación para eliminar usuario está abierto o cerrado
        dialogDelete: false,

        // Configuración de las columnas de la tabla de usuarios
        headers: [
            {
                text: 'Nombre',
                align: 'start',
                sortable: false,
                value: 'nombre',
            },
            { text: 'Apellido', value: 'apellido' },
            { text: 'Email', value: 'email' },
            { text: 'Teléfono', value: 'telefono' },
            { text: 'Acciones', value: 'actions', sortable: false },

        ],
        // Almacena la lista de usuarios recuperada del servidor
        users: [],

        // Índice del usuario editado en la lista de usuarios
        editedIndex: -1,
        editedItem: {
            id: 0,
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            usuario: "",
            contraseña: "",
            contraseñaOriginal: "",
        },
        // Datos predeterminados para un nuevo usuario
        defaultItem: {
            id: 0,
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            usuario: "",
            contraseña: ""
        },
        errorMensaje: '',
        email: '',
        // Reglas de validación para el campo de email
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),

    computed: {
        // Muestra el título del formulario en función del índice del usuario editado
        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
        },
    },

    watch: {
        // Observa el cambio en la propiedad 'dialog' y cierra el diálogo de edición
        dialog(val) {
            val || this.close()
        },
        // Observa el cambio en la propiedad 'dialogDelete' y cierra el diálogo de confirmación para eliminar usuario
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        // Función para obtener la lista de usuarios desde el servidor
        async fetchUsuarios() {
            try {
                const response = await axios.get('http://localhost:3000/users', {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        },
        // Inicializa la lista de usuarios al cargar la página
        async initialize() {
            this.users = await this.fetchUsuarios();
        },

        // Abre el diálogo de edición de usuario
        editItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        // Elimina el usuario seleccionado después de confirmar
        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm(item) {
            try {
                await axios.delete(`http://localhost:3000/users/${item.id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                this.initialize()
                this.closeDelete()
            } catch (error) {
                console.error('Error al borrar el usuario:', error);
            }
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async save() {
            if (this.editedItem.usuario.length > 0) {
                try {
                    if (this.editedIndex === -1) {
                        await axios.post('http://localhost:3000/users', this.editedItem, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                    } else {
                        await axios.put(`http://localhost:3000/users/${this.editedItem.id}`, this.editedItem, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                    }
                    this.initialize();
                    this.close();
                } catch (error) {
                    const email = /.+@.+\..+/.test(this.editedItem.email);
                    if (!email) {
                        this.mostrarError('El correo ingresado es invalido');
                        return
                    }
                    const telefono = this.editedItem.telefono;
                    if (
                        (typeof this.editedItem.telefono !== 'number' && !(/^\+?\d+$/.test(telefono))) ||
                        ((telefono.startsWith('+') && telefono.length < 14) || (!telefono.startsWith('+') && telefono.length > 10 || telefono.length < 9))
                    ) {
                        this.mostrarError('Número de teléfono inválido');
                        return;
                    }
                    const existingUser = this.users.find(user => user.usuario === this.editedItem.usuario);
                    if (existingUser) {
                        this.mostrarError('Este nombre de usuario ya se encuentra en uso');
                        return;
                    }
                }
            }
        },
        mostrarError(mensaje) {
            this.errorMensaje = mensaje;
            setTimeout(() => {
                this.errorMensaje = '';
            }, 4000);
        },

        async logout() {
            try {
                await axios.post('http://localhost:3000/logout', null, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                localStorage.removeItem("token")
                // Redirige al usuario a la página de inicio de sesión
                this.$router.push('/');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        },

    },
}
</script>

<style>
.v-data-table-header {
    background-color: #009688;
}

.v-data-table-header>tr>th>span {
    color: white;
    font-size: 1rem;
}

.v-data-table-header>tr>th>i {
    display: none !important;
}

</style>