<template>
  <div class="home">
    <box-modal
      :visible.sync="showModal"
      :submit-handler="submitForm"
      :print-handler="printLabel"
      v-bind="currentBox"
    />
    <page-section
      background-color="#eee"
      id="add-button-row"
    >
      <el-button
        type="success"
        icon="el-icon-plus"
        @click="() => viewBox(null)"
      >
        Add Box
      </el-button>
    </page-section>
    <page-section
      background-color="#eee"
      id="card-list"
    >
      <el-card
        v-for="box in boxes"
        :key="box.id"
        class="card"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <template slot="header">
          <h4>{{ box.name }}</h4>
          <el-button
            type="default"
            icon="el-icon-setting"
            @click="viewBox(box.id)"
          />
        </template>
        <h6 class="size">
          Size: {{ box.size }}
        </h6>
        <div class="body">
          <p>
            {{ box.description }}
          </p>
        </div>
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

  #add-button-row{
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: auto;
    justify-items: right;
  }

  .card{
    margin-bottom: var(--spacing-md);
    .el-card__header {
      display: grid;
      grid-template-columns: auto max-content;
      align-items: center;
    }
    &:last-of-type{
      margin-bottom: 0px;
    }
    .body{
      padding: var(--spacing-md);
    }
    .size {
      padding: var(--spacing-xs) var(--spacing-md);
      background-color: var(--app-primary);
      color: white;
    }
  }
</style>
