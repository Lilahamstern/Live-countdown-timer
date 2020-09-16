<template>
  <div class="w-full flex flex-col justify-center items-center h-full">
    <div class="flex text-center text-6xl -mb-4">
      <p v-if="live" class="text-red-700">Live</p>
      <p v-else-if="!live && paused" class="text-orange-500">Paused</p>
      <p v-else class="text-green-500">Offline</p>
    </div>
    <div v-bind:class="statusClass" class="text-10xl">
      <font-awesome-icon v-if="live" icon="video" />
      <font-awesome-icon v-if="!live || paused" icon="video-slash" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    live: Boolean,
    paused: Boolean,
  },
  computed: {
    statusClass: function () {
      return {
        "text-green-500": !this.live && !this.paused,
        "text-orange-500": !this.live && this.paused,
        "text-red-500": this.live,
      };
    },
  },
};
</script>