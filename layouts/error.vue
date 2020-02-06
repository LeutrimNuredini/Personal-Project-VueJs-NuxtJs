<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h2 v-else>
      {{ otherError }}
    </h2>
    <NuxtLink style="font-size: 30px; position: relative; left:730px; top: 170px; text-decoration: none"
     to="/">
     Go to the Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 150px;
  position: relative;
  left: 450px;
  top: 200px
}
h2 {
  font-size: 120px;
  position: relative;
  left: 450px;
  top: 200px
}
</style>
