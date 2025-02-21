<template>
  <FullCalendar
    :options="calendarOptions"
    :views="['month', 'week', 'day']"
    class="h-full"
  />
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const emit = defineEmits(["date-selected", "event-selected"]);

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

const calendarOptions = computed(() => ({
  ...props.options,
  plugins: [...props.options.plugins, dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth", // Set default view to Month
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,dayGridWeek,dayGridDay", // Month, Week, Day options
  },
  dateClick: (info) => {
    emit("date-selected", info.dateStr);
  },
  eventClick: (info) => {
    const event = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
    };
    emit("event-selected", event);
  },
}));
</script>
