<template>
    <v-dialog v-model="dialog" max-width="500px">
        <!-- Boton activador del dialog del Nuevo usuario -->
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
                    <!-- Campos de entrada de datos para el nuevo usuario -->
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedItem.apellido" label="Apellido"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedItem.email" :rules="emailRules" label="E-mail"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedItem.telefono" maxlength="14" label="Teléfono"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedItem.usuario" label="Usuario"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedItem.contraseña" label="Contraseña" type="password"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <!-- Botones de acción del diálogo -->
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
</template>
  
<script>
export default {
    // Propiedades del componente recibidas desde el componente padre
    props: {
        nombre: String,
        apellido: String,
        email: String,
        telefono: String,
        usuario: String,
        contraseña: String,
        editedIndex: Number,
        formTitle: String,
        users: Array,
        editedItem: Object,
        dialog: Boolean,
        errorMensaje: String,
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    },
    methods: {
        editItem() {
            // Emite un evento para notificar al componente padre que se esta editando un usuario
            this.$emit('edit-user');
        },
        close() {
            // Emite un evento para notificar al componente padre de que se debe cerrar el dialog
            this.$emit('close-dialog', this.editedItem);
        },

        save() {
            // Emite un evento para notificar al componente padre de que se debe guardar el usuario
            this.$emit('save-user');
        },
    },
};
</script> 

