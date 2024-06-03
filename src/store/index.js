import { createStore } from "vuex"; // Importa a função para criar uma store do Vuex
import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP

// Cria e exporta a store Vuex
export default createStore({
  // O estado da store, onde armazenamos os dados reativos
  state: {
    todos: [], 
  },
  // Getters são métodos para acessar e processar os dados do estado
  getters: {},
  // Mutations são métodos que alteram o estado de forma síncrona
  mutations: {
    // Mutation para armazenar uma lista de tarefas no estado
    storeTodos(state, data) {
      state.todos = data;
    },
    // Mutation para armazenar ou atualizar uma única tarefa no estado
    storeTodo(state, data) {
      const index = state.todos.findIndex((todo) => todo.id === data.id); // Encontra o índice da tarefa no estado

      if (index >= 0) {
        // Se a tarefa já existe no estado, atualiza-a
        state.todos.splice(index, 1, data);
      } else {
        // Caso contrário, adiciona a nova tarefa ao estado
        state.todos.push(data);
      }
    },
    // Mutation para deletar uma tarefa do estado
    deleteTodo(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id); // Encontra o índice da tarefa a ser deletada

      if (index >= 0) {
        // Se a tarefa existir no estado, remove-a
        state.todos.splice(index, 1);
      }
    },
  },
  // Actions são métodos que podem ser assíncronos e que chamam mutations para alterar o estado
  actions: {
    // Action para buscar todas as tarefas do servidor
    getTodos({ commit }) {
      return axios.get("http://localhost:3000/todos").then((response) => {
        commit("storeTodos", response.data); // Chama a mutation para armazenar as tarefas recebidas no estado
      });
    },
    // Action para adicionar uma nova tarefa no servidor
    addTodo({ commit }, data) {
      return axios
        .post("http://localhost:3000/todos", data)
        .then((response) => {
          commit("storeTodo", response.data); // Chama a mutation para armazenar a nova tarefa no estado
        });
    },
    // Action para atualizar uma tarefa existente no servidor
    updateTodo({ commit }, { id, data }) {
      return axios
        .put(`http://localhost:3000/todos/${id}`, data)
        .then((response) => {
          commit("storeTodo", response.data); // Chama a mutation para atualizar a tarefa no estado
        });
    },
    // Action para deletar uma tarefa no servidor
    deleteTodo({ commit }, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit("deleteTodo", id); // Chama a mutation para remover a tarefa do estado
      });
    },
  },
  // Módulos podem ser usados para dividir a store em partes menores e mais gerenciáveis
  modules: {},
});
