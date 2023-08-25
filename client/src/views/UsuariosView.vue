<template>
    <div>
        <h2 class="text-center mb-15 v-display-2 font-weight-bold teal--text darken-2 mt-5">Lista de Usuarios</h2>
        <v-alert v-if="errorMensaje" type="error" style="position: fixed; top: 20px; right: 20px">
            {{ errorMensaje }}
        </v-alert>
        <v-data-table :headers="headers" :items="users" class="elevation-1" :search="search">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-container class="d-flex align-start" style="margin-right: 500px;">
                        <div>
                            <v-text-field v-model="search" color="#009688" append-icon="mdi-magnify" label="Search"
                                single-line hide-details></v-text-field>
                        </div>
                    </v-container>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="#009688" dark class="mb-2" v-bind="attrs" v-on="on">
                                Nuevo Usuario
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.apellido" label="Apellido"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.email" :rules="emailRules"
                                                label="E-mail"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.telefono" label="Teléfono"></v-text-field>
                                        </v-col>
                                        <v-col cols=" 12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.usuario" label="Usuario"></v-text-field>
                                        </v-col>
                                        <v-col cols=" 12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.contraseña" label="Contraseña"
                                                type="password"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Estas seguro de que quieres eliminar este usuario?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedItem)">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
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
        users: [],
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
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        async fetchUsuarios() {
            try {
                const response = await axios.get('http://localhost:3000/users');
                return response.data;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        },
        async initialize() {
            this.users = await this.fetchUsuarios();
        },

        editItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm(item) {
            try {
                await axios.delete(`http://localhost:3000/users/${item.id}`);
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
                        await axios.post('http://localhost:3000/users', this.editedItem);
                    } else {
                        await axios.put(`http://localhost:3000/users/${this.editedItem.id}`, this.editedItem);
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
                        ((telefono.startsWith('+') && telefono.length < 14) || (!telefono.startsWith('+') && telefono.length > 12))
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
</style>