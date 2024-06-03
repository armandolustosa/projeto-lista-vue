<template>
  <div class="bg-gray-300 rounded-sm">
    <div
      class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
    >
      <!-- Botão de checkbox para marcar como completo ou incompleto -->
      <div class="flex items-center justify-center mr-2">
        <button
          :class="{
            'text-green-600': isCompleted, // Classe aplicada quando a tarefa está completa
            'text-gray-400': !isCompleted, // Classe aplicada quando a tarefa está incompleta
          }"
          @click="onCheckClick"
        >
          <!-- Evento de clique para alternar o estado de conclusão -->
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Campo de entrada de texto para o título da tarefa -->
      <!-- Vincula o valor do campo de entrada ao estado reativo 'title' -->
      <!-- Evento de tecla 'Enter' para atualizar a tarefa -->
      <div class="w-full">
        <input
          v-model="title"
          type="text"
          placeholder="Digite a sua tarefa"
          @keyup.enter="onTitleChange"
          class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
        />
      </div>

      <!-- Botão de delete para remover a tarefa -->
      <div class="ml-auto flex items-center justify-center">
        <button class="focus:outline-none" @click="onDelete">
          <svg
            class="ml-3 h-4 w-4 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7L18.1327 19.1425C18.0579 
20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
3 9 3.44772 9 4V7M4 7H20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"; // Importa a função ref do Vue para criar referências reativas
import { useStore } from "vuex"; // Importa a função useStore do Vuex para acessar a store

export default {
  name: "TodoItem",
  props: {
    todo: { type: Object, required: true }, // Define a prop 'todo' que deve ser um objeto e é obrigatória
  },

  setup(props) {
    const title = ref(props.todo.title); // Cria uma referência reativa para o título da tarefa
    const isCompleted = ref(props.todo.completed); // Cria uma referência reativa para o estado de conclusão da tarefa
    const id = ref(props.todo.id); // Cria uma referência reativa para o ID da tarefa

    const store = useStore(); // Obtém a instância da store Vuex

    const updateTodo = () => {
      // Função para atualizar a tarefa
      const newData = {
        id: id.value, // ID da tarefa
        data: {
          title: title.value, // Novo título da tarefa
          completed: isCompleted.value, // Novo estado de conclusão da tarefa
        },
      };
      store.dispatch("updateTodo", newData); // Despacha a ação 'updateTodo' com os novos dados da tarefa para o actions
    };

    const onTitleChange = (evento) => {
      // Função chamada ao pressionar 'Enter' no campo de entrada
      title.value = evento.target.value; // Atualiza o valor do título com o valor do campo de entrada

      // Verifica se o título não está vazio, nulo ou indefinido antes de atualizar
      if (
        title.value !== "" &&
        title.value !== null &&
        title.value !== undefined
      ) {
        updateTodo(); // Chama a função que tualiza a tarefa
      } else {
        alert("O campo está vazio, digite algo nele para validar a tarefa!"); // Exibe um alerta se o campo estiver vazio
      }
    };

    const onCheckClick = () => {
      // Função chamada ao clicar no botão de checkbox
      isCompleted.value = !isCompleted.value; // Alterna o estado de conclusão da tarefa
      updateTodo(); // Chama a função que tualiza a tarefa
    };

    const onDelete = () => {
      // Função chamada ao clicar no botão de delete
      store.dispatch("deleteTodo", id.value); // Despacha a ação 'deleteTodo' com o ID da tarefa para o actions
    };

    return {
      title, // Retorna a referência reativa 'title' para ser usada no template
      isCompleted, // Retorna a referência reativa 'isCompleted' para ser usada no template
      updateTodo, // Retorna a função 'updateTodo' para ser usada no template
      onTitleChange, // Retorna a função 'onTitleChange' para ser usada no template
      onCheckClick, // Retorna a função 'onCheckClick' para ser usada no template
      onDelete, // Retorna a função 'onDelete' para ser usada no template
    };
  },
};
</script>
