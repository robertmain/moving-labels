<template>
  <div>
    <page-section
      background-color="var(--light-grey)"
      v-if="cameras.length > 1"
    >
      <el-button-group class="buttonGroup">
        <el-button
          type="default"
          icon="el-icon-camera"
          v-for="(camera, index) in cameras"
          @click="() => setCamera(index)"
          :key="index"
        >
          Camera {{ index + 1 }}
        </el-button>
      </el-button-group>
    </page-section>
    <page-section>
      <view-finder
        v-if="videoStream"
        :video-stream="videoStream"
        :scan-callback="scanCallback"
      />
    </page-section>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import ViewFinder from '@/components/ViewFinder.vue';
import PageSection from '@/components/PageSection.vue';
import {
  Button,
  ButtonGroup,
} from 'element-ui';

@Component({
  components: {
    ViewFinder,
    PageSection,
    ElButton: Button,
    ElButtonGroup: ButtonGroup,
  },
})
export default class Scan extends Vue {
  private currentCameraIndex = 1;

  private cameras: MediaDeviceInfo[] = [];

  private videoStream: MediaStream = null;

  private setCamera(index: number): void {
    this.currentCameraIndex = index;
  }

  private scanCallback(barcode: string) {
    alert(barcode);
  }

  private get currentCamera(): MediaDeviceInfo {
    return this.cameras[this.currentCameraIndex];
  }

  public async mounted(): Promise<void> {
    this.cameras = (await navigator.mediaDevices.enumerateDevices())
      .filter(({ kind }) => kind === 'videoinput');
    this.videoStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 800,
        height: 600,
        frameRate: 19,
        deviceId: this.currentCamera.deviceId,
      },
    });
  }
}
</script>
