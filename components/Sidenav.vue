<template>
  <div class="bg-black text-white p-4 fixed z-30 right-0 top-0 h-full w-[20%]">
    <div class="flex justify-between border-b-2 border-zinc-400 mb-4">
      <h2 class="text-xl font-bold mb-4">
        {{ selectedEvent ? "Edit Event" : "Create Event" }}
      </h2>
      <button @click="close" class="text-white rounded-lg">
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
          class="icon icon-tabler icon-tabler-x mb-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="mb-4">
      <label for="title" class="text-xl font-bold mb-6">Event Title</label>
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
          v-model="startDate"
          class="w-full bg-zinc-800 p-4 rounded-xl mb-4"
        />
      </div>

      <div class="bg-zinc-800 p-4 rounded-lg mb-4">
        <p class="text-lg font-bold mb-2">Time</p>
        <input
          type="time"
          v-model="startTime"
          class="w-full bg-zinc-900 p-4 rounded-xl"
        />
      </div>

      <div class="flex justify-between gap-2">
        <button
          type="button"
          @click="close"
          class="bg-zinc-500 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 w-[50%]"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[50%]"
        >
          {{ selectedEvent ? "Update" : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["selectedDate", "selectedEvent"]);
const emit = defineEmits(["add-event", "close"]);

const title = ref("");
const startDate = ref(props.selectedDate);
const startTime = ref("");
const eventId = ref(null);

watch(
  () => props.selectedEvent,
  (event) => {
    if (event) {
      title.value = event.title;
      startDate.value = event.start.split("T")[0];
      startTime.value = event.start.split("T")[1] || "";
      eventId.value = event.id;
    } else {
      title.value = "";
      startDate.value = props.selectedDate;
      startTime.value = "";
      eventId.value = null;
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  const startDateTime = `${startDate.value}T${startTime.value}`;
  emit("add-event", {
    id: eventId.value,
    title: title.value,
    start: startDateTime,
  });
  emit("close");
};

const close = () => {
  emit("close");
};
</script>
