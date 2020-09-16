<template>
  <div class="bg-gray-700 h-screen items-center">
    <div>
      <p class="text-center text-white text-6xl pt-10 mb-48">{{ clock }}</p>
    </div>
    <div class="flex w-full items-center">
      <Timer v-on:change-live-status="onLiveUpdate" />
      <Status :paused="paused" :live="live" />
    </div>
  </div>
</template>

<script>
import Timer from "@/components/timer/Timer";
import Status from "@/components/status/Status";
import { format } from "date-fns";
export default {
  name: "App",
  components: {
    Timer,
    Status,
  },

  data() {
    return {
      paused: false,
      live: false,
      clock: format(new Date(), "HH:mm:ss"),
    };
  },

  methods: {
    updateTime() {
      this.clock = format(new Date(), "HH:mm:ss");
    },
    onLiveUpdate(status) {
      switch (status) {
        case "starting":
          this.live = false;
          this.paused = false;
          break;
        case "paused":
          this.live = false;
          this.paused = true;
          break;
        case "live":
          this.live = true;
          this.paused = false;
          break;
      }
    },
  },

  mounted: function () {
    setInterval(this.updateTime, 1000);
  },
};
</script>

<style>
.text-10xl {
  font-size: 10rem;
}
</style>
