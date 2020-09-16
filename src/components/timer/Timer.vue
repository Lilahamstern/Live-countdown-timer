<template>
  <div class="w-full">
    <div class="flex w-full justify-center items-center">
      <VueCountdown
        class="text-6xl text-white"
        :time="time"
        ref="countdown"
        :auto-start="false"
        :emit-events="true"
        @end="ended"
        :transform="transform"
      >
        <template slot-scope="props">
          {{ props.hours }}:{{ props.minutes }}:{{
          props.seconds
          }}
        </template>
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
      <Button
        @click.native="start"
        classObj="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        :disable="live"
        text="Start"
      />

      <Button
        @click.native="pauseTimer"
        :disable="!live"
        text="Pause"
        classObj="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      />

      <Button
        @click.native="resetTimer"
        :disable="true"
        classObj="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        text="Reset"
      />
    </div>
  </div>
</template>


<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import Button from "@/components/button/Button";
export default {
  components: {
    VueCountdown,
    Button,
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
        this.$emit("change-live-status", "starting");
        this.live = false;
        this.paused = false;
        this.$refs.countdown.start();
        return;
      }
      this.$refs.countdown.end();
    },
    pauseTimer() {
      this.live = false;
      this.paused = true;
      this.$refs.countdown.abort();
      this.$emit("change-live-status", "paused");
    },
    resetTimer() {
      location.reload();
    },
    ended() {
      this.live = true;
      this.paused = false;
      this.$emit("change-live-status", "live");
    },
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        props[key] = value < 10 ? `0${value}` : value;
      });

      return props;
    },
  },

  computed: {
    time: function () {
      if (!this.seconds) {
        return 10 * 1000;
      }
      return this.seconds * 1000;
    },
  },
};
</script>