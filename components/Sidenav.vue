<template>
  <div
    class="fixed right-0 top-0 h-full w-[25%] bg-zinc-900 text-white p-5 z-10"
    @click.stop
  >
    <div
      class="flex justify-between border-b border-zinc-600 backdrop-blur-sm pb-4"
    >
      <h2 class="text-xl font-semibold self-center">
        {{ selectedEvent ? "Edit Event" : "Create Event" }}
      </h2>
      <div v-if="selectedEvent" class="flex gap-2">
        <button
          type="button"
          @click="duplicateEvent"
          class="relative text-white bg-zinc-800 rounded-full hover:bg-zinc-700 w-1/2 p-2 transition group"
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-copy"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
            />
            <path
              d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
            />
          </svg>
          <span
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Duplicate
          </span>
        </button>
        <button
          type="button"
          @click="deleteEvent"
          class="relative text-white w-1/2 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition group"
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
          <!-- Tooltip -->
          <span
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Delete
          </span>
        </button>
      </div>
    </div>

    <div class="mt-5">
      <label for="title" class="text-lg font-semibold">Event Title</label>
      <input
        type="text"
        id="title"
        v-model="title"
        class="w-full bg-zinc-800 text-white px-4 py-3 rounded-md mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Enter event title"
        required
      />
    </div>

    <form @submit.prevent="handleSubmit" class="mt-4">
      <div class="mt-4">
        <label class="text-lg font-semibold">Time</label>
        <input
          type="time"
          v-model="startTime"
          class="w-full bg-zinc-800 text-white px-4 py-3 rounded-md mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div class="flex gap-2 mt-6">
        <button
          type="button"
          @click="close"
          class="bg-zinc-600 text-white w-1/2 py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white w-1/2 py-2 rounded-md hover:bg-blue-400 transition"
        >
          {{ selectedEvent ? "Update" : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["selectedDate", "selectedTime", "selectedEvent"]);
const emit = defineEmits(["add-event", "delete-event", "close"]);

const title = ref("");
const startDate = ref(props.selectedDate || getCurrentDate());
const startTime = ref(props.selectedTime || getCurrentTime());
const eventId = ref(null);

watch(
  () => props.selectedEvent,
  (event) => {
    if (event) {
      title.value = event.title;
      startDate.value = event.start.split("T")[0];
      startTime.value =
        event.start.split("T")[1]?.slice(0, 5) || getCurrentTime();
      eventId.value = event.id;
    } else {
      title.value = "";
      startDate.value = props.selectedDate || getCurrentDate();
      startTime.value = props.selectedTime || getCurrentTime();
      eventId.value = null;
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  const startDateTime = `${startDate.value}T${startTime.value}`;
  emit("add-event", {
    id: eventId.value || Date.now().toString(),
    title: title.value,
    start: startDateTime,
  });
  emit("close");
};

const deleteEvent = () => {
  if (eventId.value) {
    emit("delete-event", eventId.value);
  }
  emit("close");
};

const duplicateEvent = () => {
  const newEvent = {
    id: Date.now().toString(),
    title: title.value,
    start: `${startDate.value}T${startTime.value}`,
  };
  emit("add-event", newEvent);
};

const close = () => {
  emit("close");
};

function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
}
</script>
