<template>
  <div class="relative">
    <div
      v-if="showSideNav"
      class="fixed inset-0 bg-white/5 backdrop-blur-sm z-20 transition duration-700"
      @click="closeSidenav"
    ></div>

    <div class="flex overflow-hidden text-md bg-zinc-900 text-white h-screen">
      <FullCalendar
        :options="calendarOptions"
        @date-selected="handleDateSelected"
        @event-selected="handleEventSelected"
        class="flex overflow-hidden w-full h-full bg-zinc-900"
      />
      <Sidenav
        v-if="showSideNav"
        class="z-30 relative h-full bg-zinc-950"
        :selected-date="selectedDate"
        :selected-event="selectedEvent"
        @add-event="handleAddEvent"
        @delete-event="handleDeleteEvent"
        @close="closeSidenav"
      />
      <div
        v-if="showUndoToast"
        class="fixed bottom-5 right-5 font-bold bg-zinc-950 text-white px-6 py-4 rounded-lg shadow-md flex items-center gap-8 z-20 transition duration-200 ease-in-out border-l-4 border-red-500"
      >
        <span>Event Deleted</span>
        <button
          @click="undoDelete"
          class="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out"
        >
          Undo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useEventStore } from "./stores/eventStore";
import FullCalendar from "./components/FullCalendar.vue";
import Sidenav from "./components/Sidenav.vue";
import dayGridPlugin from "@fullcalendar/daygrid";

const eventStore = useEventStore();
const showSideNav = ref(false);
const selectedDate = ref("");
const selectedEvent = ref(null);
const deletedEvent = ref(null);
const showUndoToast = ref(false);
let undoTimeout = null;

const handleDateSelected = (date) => {
  selectedDate.value = date;
  selectedEvent.value = null;
  showSideNav.value = true;
};

const handleEventSelected = (event) => {
  selectedEvent.value = event;
  selectedDate.value = event.start.split("T")[0];
  showSideNav.value = true;
};

const handleAddEvent = (event) => {
  eventStore.addEvent(event);
  showSideNav.value = false;
};

const handleDeleteEvent = (eventId) => {
  const eventToDelete = eventStore.events.find((event) => event.id === eventId);
  if (!eventToDelete) return;

  deletedEvent.value = eventToDelete;
  eventStore.deleteEvent(eventId);
  showSideNav.value = false;

  showUndoToast.value = true;

  clearTimeout(undoTimeout);
  undoTimeout = setTimeout(() => {
    deletedEvent.value = null;
    showUndoToast.value = false;
  }, 4000);
};

const undoDelete = () => {
  if (deletedEvent.value) {
    eventStore.addEvent(deletedEvent.value);
    deletedEvent.value = null;
    showUndoToast.value = false;
    clearTimeout(undoTimeout);
  }
};

const closeSidenav = () => {
  selectedEvent.value = null;
  showSideNav.value = false;
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: computed(() => eventStore.events),
});

onMounted(() => {
  console.log("Current Events:", eventStore.events);
});

watch(
  () => eventStore.events,
  (newEvents) => {
    console.log("Updated Events:", newEvents);
  },
  { deep: true }
);
</script>
