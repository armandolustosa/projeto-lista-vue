<template>
  <!-- Formulário para adicionar novas tarefas, com prevenção do comportamento padrão de submissão -->
  <form
    @submit.prevent="addTodo"
    class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
  >
    <!-- Campo de entrada de texto para o título da tarefa, vinculado ao estado reativo 'title' -->
    <input
      v-model="title"
      placeholder="Adicione um novo item ..."
      type="text"
      class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
    />
    
    <button
      class="text-green-400 text-xs font-semibold focus:outline-none"
      type="submit"
    >
      ADICIONAR
    </button>
  </form>
</template>

<script>
import { ref } from "vue"; // Importa a função ref do Vue para criar referências reativas
import { useStore } from "vuex"; // Importa a função useStore do Vuex para acessar a store

export default {
  name: "TodoForm",

  setup() {
    const title = ref(""); // Cria uma referência reativa para armazenar o título da nova tarefa

    const store = useStore(); // Obtém a instância da store Vuex

    const addTodo = () => {
      // Função para adicionar uma nova tarefa
      if (
        title.value !== "" && // Verifica se o título não está vazio
        title.value !== null && // Verifica se o título não é nulo
        title.value !== undefined // Verifica se o título não é indefinido
      ) {
        store.dispatch("addTodo", {
          title: title.value, // Passa o título da nova tarefa
          completed: false, // Define a tarefa como não concluída
        });
        title.value = ""; // Limpa o campo de entrada após adicionar a tarefa
      } else {
        alert("O campo está vazio, digite algo nele para validar a tarefa!"); // Alerta caso o campo esteja vazio
      }
    };

    return {
      title, // Retorna a referência reativa 'title' para ser usada no template
      addTodo, // Retorna a função 'addTodo' para ser usada no template
    };
  },
};
</script>
