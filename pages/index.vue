<template>
  <div class="container">
    <nuxt-link v-for="ai in ais" :key="ai.id" :to="`/ais/${ai.id}`">
      <div class="card">
        <div class="card-content">
          <div class="content">
            {{ ai.name }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { ais } from "../data/ai";

export default {
  data() {
    return {
      ais
    };
  }
};
</script>
