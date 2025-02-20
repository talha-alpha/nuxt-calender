// stores/eventStore.ts
import { defineStore } from "pinia";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    events: [] as { id: string; title: string; start: string }[],
  }),
  actions: {
    addEvent(event: { id: string; title: string; start: string }) {
      const index = this.events.findIndex((e) => e.id === event.id);
      if (index !== -1) {
        this.events[index] = event; // Update existing event
      } else {
        this.events.push(event); // Add new event
      }
    },
    deleteEvent(eventId: string) {
      this.events = this.events.filter((event) => event.id !== eventId);
    },
  },
});
