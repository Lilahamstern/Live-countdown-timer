<template>
  <div class="flex flex-col items-center">
    <p class="text-white text-6xl pt-10">{{formattedElapsedTime}}</p>
    <div class="flex justify-between w-1/2">
      <Button
        @click.native="start"
        :disable="!paused"
        classObj="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        text="Start"
      />

      <Button
        @click.native="pause"
        text="Pause"
        :disable="paused"
        classObj="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      />

      <Button
        @click.native="reset"
        classObj="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        :disable="true"
        text="Reset"
      />
    </div>
  </div>
</template>

<script>
import Button from "@/components/button/Button";
export default {
  components: {
    Button,
  },

  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
      paused: true,
    };
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
      this.paused = false;
    },
    pause() {
      clearInterval(this.timer);
      this.paused = true;
    },
    reset() {
      this.elapsedTime = 0;
    },
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    },
  },
};
</script>