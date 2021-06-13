<template>
  <div class="home">
    <page-section backgroundColor="white">
      <h2>Boxes</h2>
      <list>
        <list-item v-for="box in boxes" :key="box.id">
          <h4>{{ box.name }}</h4>
          <p>{{ box.description }}</p>
        </list-item>
      </list>
    </page-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageSection from '@/components/PageSection.vue';
import List from '@/components/List.vue';
import ListItem from '@/components/ListItem.vue';
import axios, { AxiosInstance } from 'axios';
import { BoxResponseDto } from 'server/box/dto/BoxResponse.dto';

@Component({
  components: {
    PageSection,
    List,
    ListItem,
  },
})
export default class Home extends Vue {
  private axios: AxiosInstance;

  private boxes: BoxResponseDto[] = [];

  public constructor() {
    super();
    this.axios = axios.create({
      baseURL: '/api/',
      validateStatus: (status) => status < 400,
    });
  }

  public async mounted () {
    this.boxes = (await this.axios.get('box')).data;
    console.log(this.boxes);
  }
}
</script>

<style lang="scss">
  .home{
    h2{ color: var(--text-dark)!important }
  }
</style>
