<template>
  <div class="flex overflow-hidden text-md bg-zinc-700 text-white">
    <FullCalender
      :options="calendarOptions"
      @date-selected="handleDateSelected"
      @time-selected="handleTimeSelected"
      class="flex overflow-hidden min-h-screen w-full"
    />
    <Sidenav
      v-if="showSideNav"
      :selected-date="selectedDate"
      :selected-time="selectedTime"
      @add-event="handleAddEvent"
      @close="showSideNav = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import FullCalender from "./components/FullCalendar.vue";
import Sidenav from "./components/Sidenav.vue";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = ref([]); // Initialize as array

const showSideNav = ref(false);
const selectedDate = ref("");
const selectedTime = ref("");

const handleDateSelected = (date) => {
  selectedDate.value = date;
  showSideNav.value = true;
};

const handleTimeSelected = (time) => {
  selectedTime.value = time;
  showSideNav.value = true;
};

const handleAddEvent = (event) => {
  events.value.push(event);
  showSideNav.value = false;
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: computed(() => events.value),
});
</script>
