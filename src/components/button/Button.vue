<template>
  <button :class="[classObj,classes]" :disabled="disable">{{text}}</button>
</template>


<script>
export default {
  props: {
    text: String,
    classObj: String,
    disable: Boolean,
  },

  methods: {},
  computed: {
    classes: function () {
      return {
        "opacity-50 cursor-not-allowed": this.disable,
      };
    },
  },
};
</script>