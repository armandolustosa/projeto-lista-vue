<template>
  <div class="space-y-2">
    <!-- Renderiza o componente TodoItem para cada tarefa na store e passa o valor para a props -->
    <TodoItem v-for="todo in $store.state.todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  components: { TodoItem }, 
  name: "TodoItems",
};
</script>
