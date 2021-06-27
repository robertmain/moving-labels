<template>
  <page-section background-color="var(--light-grey)">
    <view-finder
      v-if="videoStream"
      :video-stream="videoStream"
    />
  </page-section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import ViewFinder from '@/components/ViewFinder.vue';
import PageSection from '@/components/PageSection.vue';

@Component({
  components: {
    ViewFinder,
    PageSection,
  },
})
export default class Scan extends Vue {
  private cameras: MediaDeviceInfo[] = [];

  private videoStream: MediaStream = null;

  public async mounted(): Promise<void> {
    this.cameras = (await navigator.mediaDevices.enumerateDevices())
      .filter(({ kind }) => kind === 'videoinput');
    this.videoStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 800,
        height: 600,
        frameRate: 19,
        deviceId: this.cameras[0].deviceId,
      },
    });
  }
}
</script>
