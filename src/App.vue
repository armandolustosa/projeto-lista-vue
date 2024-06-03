<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <TodoSpinner v-if="loading" />

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
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    TodoSpinner,
    TodoForm,
    TodoItems,
    TodoEmpty,
  },

  setup() {
    const loading = ref(false);

    const store = useStore();

    loading.value = true;
    store.dispatch("getTodos").finally(() => {
      loading.value = false;
    });

    return {
      loading,
    };
  },
};
</script>
