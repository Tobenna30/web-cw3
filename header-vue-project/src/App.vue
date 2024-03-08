<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script> -->



<template>
  <div id="app">
    <!-- <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header> -->

    <header>
      <h2>{{sitename}}</h2>
    <button @click="showCheckout">Checkout</button>
  </header>

    <!-- <main>
      <TheWelcome />
    </main> -->
    <main>
      <component :is="currentView"></component>
    </main>
  </div>
</template>

<script>
import productList from './components/productList.vue'
import checkout from './components/checkout.vue'

export default {
  name: 'lesson app',
  data() {
    return {
      sitename: 'Individual Demonstration Booking System',
      cart: [],
      currentView: productList
    }
  },
  components: {
    productList,
    checkout
  },
  methods: {
    showCheckout() { // Corrected the method name to match the button's @click directive
      this.currentView = this.currentView === productList ? checkout : productList;
    }
  }
}
</script>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
