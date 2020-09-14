<template>
  <div class="flex flex-auto bg-gray-700 w-full h-screen items-center">
    <div class="w-full">
      <div class="flex w-full justify-center">
        <VueCountdown
          class="text-6xl text-white"
          :time="time"
          ref="countdown"
          :auto-start="false"
          :emit-events="true"
          @end="ended"
          :transform="transform"
        >
          <template slot-scope="props"
            >{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</template
          >
        </VueCountdown>
      </div>
      <div class="flex w-full justify-center">
        <input
          v-model="seconds"
          type="number"
          placeholder="Seconds"
          class="p-1 rounded-md bg-gray-800 border-white border pl-2 outline-none text-white"
          :class="[live ? 'opacity-50 cursor-not-allowed' : '']"
          :disabled="live"
          min="10"
        />
      </div>
      <div class="flex w-1/2 justify-between mx-auto mt-10">
        <button
          @click="startTimer"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          :class="[live ? 'opacity-50 cursor-not-allowed' : '']"
          :disabled="live"
        >
          Start
          <!-- {{ !live ? "Start" : "Stop" }} -->
        </button>

        <button
          @click="pauseTimer"
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          :class="[!live ? 'opacity-50 cursor-not-allowed' : '']"
          :disabled="!live"
        >
          Pause
        </button>

        <button
          @click="resetTimer"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
    <div class="w-full flex flex-col justify-center items-center">
      <div class="flex text-center mb-8 text-6xl">
        <p v-if="live" class="text-red-700">Live</p>
        <p v-else-if="!live && paused" class="text-orange-500">Paused</p>
        <p v-else class="text-green-500">Offline</p>
      </div>
      <div v-bind:class="statusClass" class="text-10xl ">
        <font-awesome-icon v-if="live" icon="video" />
        <font-awesome-icon v-if="!live || paused" icon="video-slash" />
      </div>
    </div>
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
export default {
  name: "App",
  components: {
    VueCountdown,
  },

  data() {
    return {
      live: false,
      paused: false,
      seconds: null,
    };
  },

  methods: {
    startTimer() {
      if (!this.live) {
        this.live = false;
        this.paused = false;
        this.$refs.countdown.start();
        return;
      }
      this.$refs.countdown.end();
      location.reload();
    },
    pauseTimer() {
      this.live = false;
      this.paused = true;
      this.$refs.countdown.abort();
    },
    resetTimer() {
      location.reload();
    },
    ended() {
      this.paused = false;
      this.live = true;
    },
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        props[key] = value < 10 ? `0${value}` : value;
      });

      return props;
    },
  },

  computed: {
    time: function() {
      if (!this.seconds) {
        return 600 * 1000;
      }
      return this.seconds * 1000;
    },
    statusClass: function() {
      return {
        "text-green-500": !this.live && !this.paused,
        "text-orange-500": !this.live && this.paused,
        "text-red-500": this.live,
      };
    },
  },
};
</script>

<style>
.text-10xl {
  font-size: 10rem;
}
</style>
