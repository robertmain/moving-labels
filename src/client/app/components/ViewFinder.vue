<template>
  <div>
    <video autoplay />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ViewFinder extends Vue {
  @Prop({
    type: MediaStream,
    required: true,
  })
  public videoStream: MediaStream;

  public async mounted(): Promise<void> {
    const videoElement = document.querySelector('video');
    videoElement.srcObject = this.videoStream;
    videoElement.onloadedmetadata = videoElement.play;
  }
}
</script>

<style lang="scss" scoped>
  video{
    width: 100%;
    height: 100%;
  }
</style>
