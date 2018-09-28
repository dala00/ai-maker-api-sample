<template>
  <section v-if="ai" class="container">
    <nuxt-link to="/" class="breadcrumb">一覧へ</nuxt-link>
    <div class="card">
      <div class="card-content">
        <div class="content has-text-centered">
          <h1>{{ ai.name }}</h1>
          <button v-if="!labels" :class="buttonClass()" @click="execute">Twitterアイコンで診断する！</button>
          <p v-if="!$store.state.user" class="has-text-grey">
            Twitterへログインし、アイコンを取得します。<br>
            許可なくツイートなどは行いません。
          </p>
          <div v-if="labels">
            <h2>結果</h2>
            <table class="table is-striped">
              <thead>
                <tr>
                  <th>ラベル</th>
                  <th>スコア</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(label, index) in labels" :key="index">
                  <td>{{ label.label }}</td>
                  <td>{{ label.score }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="has-text-centered" style="margin-top: 2rem">
      オリジナルの診断ページはこちら<br>
      <a :href="`https://aimaker.io/app/image-classification/id/${ai.id}`" target="_blank" rel="nofollow noopener">{{ ai.name }}</a>
    </div>
  </section>
</template>

<script>
import * as firebase from "firebase";
import axios from "axios";
import { getAIById } from "../../data/ai";

export default {
  data() {
    return {
      ai: getAIById(Number(this.$route.params.id)),
      labels: null,
      loading: false
    };
  },
  mounted() {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        this.$store.commit("setUser", {
          photoURL: result.user.photoURL
        });
        this.execute();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    async execute() {
      if (!this.$store.state.user) {
        const provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        return;
      }

      this.loading = true;
      const params = {
        id: this.ai.id,
        image: this.$store.state.user.photoURL
      };
      axios
        .post(
          process.env.CLOUD_FUNCTIONS_BASE_URL + "imageClassification",
          params
        )
        .then(response => {
          this.labels = response.data.labels.sort((a, b) => {
            if (a.score == b.score) {
              return 0;
            }
            return a.score < b.score ? 1 : -1;
          });
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },

    getImage() {
      return new Promise(async resolve => {
        const icon = await this.loadImage();
        const canvas = document.createElement("canvas");
        canvas.width = icon.width;
        canvas.height = icon.height;
        const context = canvas.getContext("2d");
        context.drawImage(icon, 0, 0);
        canvas.toBlob(blob => resolve(blob));
      });
    },

    loadImage() {
      return new Promise(resolve => {
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.onload = () => {
          resolve(img);
        };
        img.src = this.$store.state.user.photoURL.replace(
          "normal.",
          "400x400."
        );
      });
    },

    buttonClass() {
      return {
        button: true,
        "is-primary": true,
        "is-loading": this.loading
      };
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 1rem 0;
}

.breadcrumb {
  display: inline-block;
  margin: 0.5rem;
}

h2 {
  margin-top: 2rem;
}
</style>
