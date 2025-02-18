<template>
  <div class="bg-black text-white p-4 fixed z-30 right-0 top-0 h-full w-128">
    <div
      class="flex overflow-hidden justify-between border-b-2 border-zinc-400 mb-4"
    >
      <h2 class="flex overflow-hidden text-xl font-bold mb-4">Create Event</h2>
      <button
        type="button"
        @click="close"
        class="flex overflow-hidden text-white rounded-lg justify-end"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          @click="close"
          class="icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="mb-4">
      <label for="title" class="text-xl font-bold mb-2">Event Title</label>
      <input
        type="text"
        id="title"
        v-model="title"
        class="w-full bg-zinc-800 p-4 rounded-xl"
        placeholder="Event Title"
        required
      />
    </div>

    <form @submit.prevent="handleSubmit">
      <div>
        <input
          type="date"
          name="date"
          id="d"
          v-model="startDate"
          class="flex w-full bg-zinc-800 p-4 justify-center rounded-xl mb-4"
        />
      </div>

      <div class="flex overflow-hidden justify-between gap-2 items-end">
        <button
          type="button"
          @click="close"
          class="bg-zinc-500 text-white px-4 py-2 text-center rounded-lg hover:bg-zinc-600 w-[50%]"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-600 w-[50%]"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["selectedDate", "selectedTime"]);
const emit = defineEmits(["add-event", "close"]);

const title = ref("");
const startDate = ref(props.selectedDate);
const startTime = ref(props.selectedTime);

const handleSubmit = () => {
  const startDateTime = `${startDate.value}T${startTime.value}`;
  emit("add-event", {
    title: title.value,
    start: startDateTime,
  });
  title.value = "";
  emit("close");
};

const close = () => {
  emit("close");
};
</script>
