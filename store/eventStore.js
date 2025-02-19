// store/eventStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useEventStore = defineStore("eventStore", () => {
  const events = ref([]); // Store events as an array

  // Get all events (computed for reactivity)
  const getEvents = computed(() => events.value);

  // Add or update an event
  const addOrUpdateEvent = (event) => {
    const index = events.value.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      // Update existing event
      events.value[index] = event;
    } else {
      // Add new event
      events.value.push(event);
    }
  };

  // Delete an event by ID
  const deleteEvent = (eventId) => {
    events.value = events.value.filter((e) => e.id !== eventId);
  };

  return { getEvents, addOrUpdateEvent, deleteEvent };
});
