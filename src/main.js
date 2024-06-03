import { createApp } from "vue"; // Importa a função createApp do Vue, que é usada para criar uma nova instância da aplicação Vue
import App from "./App.vue"; // Importa o componente principal da aplicação
import "./assets/css/main.css"; // Importa o arquivo CSS principal para a aplicação, que aplica os estilos globais
import store from './store'; // Importa a store Vuex configurada, que gerencia o estado da aplicação

// Cria uma nova instância da aplicação Vue, registra a store Vuex para gerenciamento de estado e monta a aplicação no elemento com id "app"
createApp(App)
  .use(store) // Usa a store Vuex
  .mount("#app"); // Monta a aplicação na div com id "app"
