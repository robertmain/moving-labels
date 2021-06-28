<template>
  <div @click="parseImage">
    <video autoplay />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

declare type ScanCallback = (barcode: string) => void;

@Component({
  components: {},
})
export default class ViewFinder extends Vue {
  @Prop({
    type: MediaStream,
    required: true,
  })
  public videoStream: MediaStream;

  private videoElement: HTMLVideoElement = null;

  @Prop({
    type: Function,
    required: true,
  })
  public scanCallback: ScanCallback;

  public async mounted(): Promise<void> {
    this.videoElement = document.querySelector('video');
    this.videoElement.srcObject = this.videoStream;
    this.videoElement.onloadedmetadata = this.videoElement.play;
  }

  private async parseImage() {
    const [mediaStreamTrack] = this.videoStream.getVideoTracks();
    const imageCapture = new ImageCapture(mediaStreamTrack);
    const still = await imageCapture.grabFrame();

    const detector = new BarcodeDetector({
      formats: ['qr_code'],
    });

    const barcodeData = await detector.detect(still);
    if (barcodeData.length > 0) {
      this.scanCallback(barcodeData[0].rawValue);
    }
  }
}
</script>

<style lang="scss" scoped>
  video, cavnas{
    border: 1px solid red;
    width: 100%;
    height: 100%;
  }
</style>
