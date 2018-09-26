<template>
  <div>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">
            AIメーカーのAPIテスター
          </nuxt-link>
        </div>

        <div id="nav-right">
          <div v-if="$store.state.user">
            <div :class="{ dropdown: true, 'is-right': true, 'is-active': userMenuOpened  }">
              <div class="dropdown-trigger">
                <a href="#" aria-haspopup="true" aria-controls="dropdown-menu" @click="userMenuOpened = !userMenuOpened">
                  <img id="user-icon" :src="$store.state.user.photoURL" width="28" height="28">
                </a>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item" @click.prevent="logout">
                    ログアウト
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>

    <nuxt/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMenuOpened: false
    };
  },
  methods: {
    logout() {
      this.$store.commit("setUser", null);
      this.userMenuOpened = false;
    }
  }
};
</script>

<style scoped>
nav.navbar > div.container {
  display: flex;
  justify-content: space-between;
}

#nav-right {
  margin-top: 0.7rem;
  margin-right: 0.7rem;
}
</style>
