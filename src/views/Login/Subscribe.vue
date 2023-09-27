<template>
    <div class="center-content">
        <v-container class="center-content" fluid fill-height>
            <v-row justify="center" align="center">
                <v-col cols="12" md="4">
                    <v-form v-model="valid">
                        <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name"
                            required></v-text-field>
                    </v-form>
                </v-col>

                <v-col cols="12" md="4">
                    <v-form v-model="valid">
                        <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name"
                            required></v-text-field>
                    </v-form>
                </v-col>

                <v-col cols="12" md="4">
                    <v-form v-model="valid">
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
  
<script>
export default {
    data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
    }),
}
</script>

<style>
.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>



  
  