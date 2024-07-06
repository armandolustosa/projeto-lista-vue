<template>
  <div class="px-3 py-10 md:px-10">
    <h1 class="text-center text-4xl text-white font-bold">To-Do List</h1>
    <br>
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <!-- Exibe o spinner de carregamento se a propriedade loading for verdadeira -->
      <TodoSpinner v-if="loading" />

      <!-- Caso contrário, exibe o formulário de tarefas, lista de tarefas e componente vazio se não houver tarefas -->
      <template v-else>
        <TodoForm />
        <TodoItems />
        <TodoEmpty v-if="!$store.state.todos.length" />
      </template>
    </div>
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoItems from "./components/TodoItems.vue"; 
import TodoSpinner from "./components/TodoSpinner.vue"; 
import TodoEmpty from "./components/TodoEmpty.vue"; 
import { ref } from "vue"; // Importa a função ref do Vue para criar referências reativas
import { useStore } from "vuex"; // Importa a função useStore do Vuex para acessar a store

export default {
  name: "App", 
  components: {
    TodoSpinner,
    TodoForm,
    TodoItems,
    TodoEmpty,
  },

  setup() {
    const loading = ref(false); // Cria uma referência reativa para controlar o estado de carregamento

    const store = useStore(); // Acessa a store Vuex

    // Inicia o carregamento e faz a requisição para obter as tarefas
    loading.value = true;
    store.dispatch("getTodos").finally(() => {
      loading.value = false; // Define loading como false após a requisição ser concluída
    });

    return {
      loading, // Retorna a referência reativa para ser usada no template
    };
  },
};
</script>
