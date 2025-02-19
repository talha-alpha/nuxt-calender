<template>
  <div class="flex overflow-hidden text-md bg-zinc-900 text-white">
    <FullCalendar
      :options="calendarOptions"
      @date-selected="handleDateSelected"
      @event-selected="handleEventSelected"
      class="flex overflow-hidden h-screen w-full"
    />
    <Sidenav
      v-if="showSideNav"
      :selected-date="selectedDate"
      :selected-event="selectedEvent"
      @add-event="handleAddEvent"
      @close="closeSidenav"
    />
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
    }
  } else {
    event.id = Date.now().toString();
    events.value.push(event);
  }
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
