<template>
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
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field v-model="editedItem.nombre"
                                                            label="Nombre"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field v-model="editedItem.apellido"
                                                            label="Apellido"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field v-model="editedItem.email" :rules="emailRules"
                                                            label="E-mail"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field v-model="editedItem.telefono" maxlength="14"
                                                            label="Teléfono"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field v-model="editedItem.usuario"
                                                            label="Usuario"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
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
</template>
  
<script>
export default {
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
      // Emitir un evento para notificar al componente padre
      this.$emit('edit-user');
    },
    close() {
      this.$emit('close-dialog', this.editedItem); 
    },

    save() {
      // Emitir un evento para notificar al componente padre de que se debe guardar el usuario
      this.$emit('save-user');
    },
  },
};
</script> 

