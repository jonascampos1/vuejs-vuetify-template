<template>
  <v-app :theme="themeColor" id="inspire">
    <v-app-bar app
      flat
      :color="themeColor === 'dark' ? 'light-blue-lighten-1' : 'light-blue-lighten-4'"
    >
      <v-container class="py-0 fill-height">
        <v-col justify="stretch">
          <v-avatar
            class="mr-2"
            color="grey-darken-1"
            size="40"
          >
          <v-img
          cover
          lazy-src="src/assets/images/ore.jpg"
          src="src/assets/images/ore.jpg"
          >
          </v-img>
          </v-avatar>
            <span>{{ userinfo.username }}</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-responsive  max-width="120">
          <v-btn color="blue-grey-darken-4" @click="msgWindow.show=true" prepend-icon="mdi-message">Dialog</v-btn>
        </v-responsive>
        <v-responsive  max-width="120">
          <v-btn color="blue-grey-darken-4" @click="snackbar=true" prepend-icon="mdi-message">Snackbar</v-btn>
        </v-responsive>
        <v-responsive  max-width="120">
          <v-btn :loading="loading" @click="logout" prepend-icon="mdi-logout">Logout</v-btn>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-main">
      <v-container>
        <h1 class="text-center pt-3">Ore por mi</h1>
        <v-row>
          <v-col>
            <v-row v-if="todos.length === 0"> 
              <v-col cols="12" md="6">
                  <v-skeleton-loader type="card"></v-skeleton-loader>
                </v-col>
                <v-col cols="12" md="6">
                  <v-skeleton-loader type="card"></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row align="center" justify="center" dense>
              <v-col cols="12" md="6" v-for="(todo,index) in todos"
              :key="todo.id">
              <v-card
                append-avatar="src/assets/images/ore.jpg"
                class="mx-auto"
                prepend-avatar="src/assets/images/ore2.jpg"
                :subtitle="todo.completed ? 'Completado' : 'Pendiente'"
                :title="`Title: ${todo.userId}`"
              >

                  <v-card-text>{{ todo.todo }}</v-card-text>
                  <v-card-actions :class="themeColor === 'dark' ? 'bg-light-blue-lighten-2' : 'bg-light-blue-lighten-5'">
                        <v-btn
                          variant="tonal"
                          color="medium-emphasis"
                          icon="mdi-heart"
                          size="small"
                        ></v-btn>

                        <v-btn
                          variant="tonal"
                          color="medium-emphasis"
                          icon="mdi-bookmark"
                          size="small"
                        ></v-btn>

                        <v-btn
                          variant="tonal"
                          color="medium-emphasis"
                          icon="mdi-share-variant"
                          size="small"
                        ></v-btn>
                        
                        <v-spacer></v-spacer>
                        
                        <v-btn
                          variant="flat"
                          color="medium-emphasis"
                          icon="mdi-chevron-right"
                          size="small"
                        ></v-btn>
                      </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
  
            <v-col>
                <v-row justify="space-between" class="pt-2">
                  <v-btn-toggle 
                    variant="outlined"
                    color="red"
                  >
                    <v-btn value="likes">
                      <span class="hidden-sm-and-down">23</span>
                      <v-icon end size="x-large">
                        mdi-heart
                      </v-icon>
                    </v-btn>

                    <v-btn value="share">
                      <span class="hidden-sm-and-down">12</span>
                      <v-icon end size="x-large">
                        mdi-share
                      </v-icon>
                    </v-btn>
                  </v-btn-toggle>
                  <v-btn color="light-blue-darken-3">Something</v-btn>
                </v-row>
              </v-col>
            <v-footer color="transparent"
              class="mt-3 pa-0" 
              rounded="xl">
                <div class="text-center">All rights reserver @church</div>
            </v-footer>
          </v-col>
        </v-row>
        <v-snackbar
          v-model="snackbar"
          :timeout="snackbar_timeout"
        >
          {{ snackbar_msg }}
          <template v-slot:actions>
            <v-btn
              color="light-blue-lighten-1"
              variant="text"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
    <v-dialog width="450"
      v-model="msgWindow.show"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
              color="light-blue-lighten-4"
              :title="msgWindow.title"
            ></v-toolbar>
        <v-card-text class="text-center">
          {{ msgWindow.msg }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" block @click="msgWindow.show = false">Entendido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { Todo } from '../types/index'

export default defineComponent({
  name: 'test',
  data () {
      return {
        bg_main : 'red',
        themeColor: 'light',
        msgWindow: {
          show: false,
          title: 'The Title',
          msg: 'This is a message'
        },
        snackbar: false,
        snackbar_msg: 'I´m a snackbar',
        snackbar_timeout: 2000,        
        userinfo: {
          username: 'Anonimous'
        },
        loader: null as string | null,
        loading: false,
        pageLoading: true,
        todos: [] as Todo[]
     }
  },
  methods:{
    async loadTodos(){  
      const todoResponse = await axios.get(import.meta.env.VITE_API_URL+'/todos')
      this.todos = todoResponse.data.todos
      this.pageLoading = false
    },
    logout(){
      this.loader = 'loading'
      /* localStorage.removeItem('user-info')
      setTimeout(()=>{
        this.$router.push({name: 'login'})
      },1000) */
    },
    check_scheme(){
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.themeColor = 'dark'
        this.bg_main = 'bg-black-lighten-1'
      }
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
          this.themeColor = newColorScheme
      })
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 1000)
      this.loader = null
    },
  },
  mounted(){
    this.check_scheme()
    this.loadTodos()
  },
  beforeCreate(){
    /* let usercheck = localStorage.getItem('user-info')
    if(!usercheck){
      this.$router.push({ name: 'login' })
    }else{
      this.userinfo = JSON.parse(usercheck)
    } */
  }
})
</script>
<style>
.bg-main{
  background: var(--color-background-mute);
}

</style>