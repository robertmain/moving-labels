<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@500;900&display=swap');
@import '@/assets/scss/breakpoints.scss';
*{ box-sizing: border-box; }

body {
  background-color: var(--dark-grey);
  p, li, h1, h2, h3, h4, h5, h6{
    color: var(--text-dark);
  }
  p, li{
    font-family: var(--body-font-family);
    font-size: var(--paragraph-text-size-normal);
  }
  h1, h2, h3, h4, h5, h6{
    font-family: var(--heading-font-family);
  }
  h1{ font-size: var(--heading1-size); }
  h2{ font-size: var(--heading2-size); }
  h3{ font-size: var(--heading3-size); }
  h4{ font-size: var(--heading4-size); }
  h5{ font-size: var(--heading5-size); }
  h6{ font-size: var(--heading6-size); }
  p{
    margin-bottom: var(--spacing-md);
    &:last-of-type{
      margin-bottom: 0px;
    }
  }
}

</style>
