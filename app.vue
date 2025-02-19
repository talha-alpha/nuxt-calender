<template>
  <div class="relative">
    <div
      v-if="showSideNav"
      class="fixed inset-0 bg-white/5 backdrop-blur-sm z-20 transition-all duration-300"
      @click="closeSidenav"
    ></div>

    <div class="flex overflow-hidden text-md bg-zinc-700 text-white h-screen">
      <FullCalendar
        :options="calendarOptions"
        @date-selected="handleDateSelected"
        @event-selected="handleEventSelected"
        class="flex overflow-hidden w-full h-full bg-zinc-900"
      />

      <Sidenav
        v-if="showSideNav"
        class="z-30 relative h-full bg-zinc-900"
        :selected-date="selectedDate"
        :selected-event="selectedEvent"
        @add-event="handleAddEvent"
        @delete-event="handleDeleteEvent"
        @close="closeSidenav"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import FullCalendar from "./components/FullCalendar.vue";
import Sidenav from "./components/Sidenav.vue";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = ref([]);
const showSideNav = ref(false);
const selectedDate = ref("");
const selectedEvent = ref(null);

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
  if (event.id) {
    const index = events.value.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      events.value[index] = event;
    } else {
      events.value.push(event);
    }
  } else {
    event.id = Date.now().toString();
    events.value.push(event);
  }
  showSideNav.value = false;
};

const handleDeleteEvent = (eventId) => {
  events.value = events.value.filter((event) => event.id !== eventId);
  showSideNav.value = false;
};

const closeSidenav = () => {
  selectedEvent.value = null;
  showSideNav.value = false;
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: computed(() => events.value),
});
</script>
