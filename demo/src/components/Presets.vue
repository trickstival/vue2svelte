<template>
  <section class="presets">
    <h3>
      Presets
    </h3>
    <ul class="preset-list">
      <li
        v-for="(preset, key) in $options.presets"
        :key="key"
        class="preset"
        @click="$emit('input', preset)"
      >
        {{ key }}
      </li>
    </ul>
  </section>
</template>

<script>
import presets from '../utils/presets'
export default {
  presets,
  created () {
    this.$emit('input', presets.default)
  }
}
</script>

<style lang="scss">
.preset-list {
  padding: 0;
}
.preset {
  list-style: none;
  margin-top: 10px;
  border: 1px solid #CCC;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 4px;
}
</style>
