<template>
  <FullCalendar :options="calendarOptions" class="h-full" />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const emit = defineEmits(["date-selected"]);
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

const calendarOptions = {
  ...props.options,
  plugins: [...props.options.plugins, interactionPlugin],
  dateClick: (info) => {
    emit("date-selected", info.dateStr);
  },
};
</script>
