<template>
  <div class="home">
    <box-modal
      :visible.sync="showModal"
      :submit-handler="submitForm"
      :print-handler="printLabel"
      v-bind="currentBox"
    />
    <page-section
      background-color="white"
      id="header"
    >
      <h2>Boxes</h2>
      <el-button
        icon="el-icon-plus"
        @click="() => viewBox(null)"
      />
    </page-section>
    <page-section
      background-color="#eee"
      id="card-list"
    >
      <el-card
        v-for="box in boxes"
        :key="box.id"
        class="card"
      >
        <template slot="header">
          <h5>{{ box.name }}</h5>
          <el-button
            type="default"
            icon="el-icon-setting"
            @click="viewBox(box.id)"
          />
        </template>
        <p>
          {{ box.description }}
        </p>
      </el-card>
    </page-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageSection from '@/components/PageSection.vue';
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Card,
} from 'element-ui';
import { mapGetters } from 'vuex';
import BoxModal from '@/components/BoxModal.vue';
import { ACTIONS as BOX } from '../store/box/actions';
import { ACTIONS as LABEL } from '../store/label/actions';
import { store } from '../store';
import { Box } from '../store/box/types';

@Component({
  computed: {
    ...mapGetters([
      'boxes',
      'currentBox',
    ]),
  },
  components: {
    PageSection,
    elButton: Button,
    dlg: Dialog,
    elInput: Input,
    elForm: Form,
    elFormItem: FormItem,
    elCard: Card,
    BoxModal,
  },
})
export default class Home extends Vue {
  private showModal = false;

  private printLabel(e: Event, id: string): void {
    store.dispatch(LABEL.PRINT_LABEL, id);
  }

  private submitForm(event: Event, box: Box): void {
    if (!box.id) {
      store.dispatch(BOX.ADD_BOX, box);
    } else {
      store.dispatch(BOX.UPDATE_BOX, box);
    }
    this.showModal = false;
  }

  public async mounted(): Promise<void> {
    await store.dispatch(BOX.GET_BOXES);
  }

  private viewBox(id?: string) {
    store.dispatch(BOX.SET_CURRENT_BOX, id);
    this.showModal = true;
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/breakpoints.scss';
  #header {
    display: grid;
    grid-template-columns: auto 0.25fr;
    grid-template-rows: auto;
    align-items: center;
    h2{
      line-height: 1;
      margin-bottom: 0px;
    };
    button i{
      font-weight: bold;
      font-size: 20px;
    }
  }
  .home{
    h2{ color: var(--text-dark)!important }
  }

  #card-list{
    display: grid;
    grid-gap: var(--spacing-xs);
    grid-template-columns: 1fr;
    @include for-tablet-portrait-up {
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: var(--spacing-md);
    }
    @include for-tablet-landscape-up  {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: var(--spacing-md);
    }
  }

  .card{
    margin-bottom: var(--spacing-md);
    .el-card__header {
      display: grid;
      grid-template-columns: auto 70px;
      align-items: center;
    }
    &:last-of-type{
      margin-bottom: 0px;
    }
  }
</style>
