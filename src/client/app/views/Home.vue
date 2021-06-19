<template>
  <div class="home">
    <box-modal
      :visible.sync="showAddModal"
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
    <page-section background-color="#eee">
      <list>
        <list-item
          @click="() => viewBox(box.id)"
          v-for="box in boxes"
          :key="box.id"
        >
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
import {
  Button, Dialog, Form, FormItem, Input,
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
    List,
    ListItem,
    elButton: Button,
    dlg: Dialog,
    elInput: Input,
    elForm: Form,
    elFormItem: FormItem,
    BoxModal,
  },
})
export default class Home extends Vue {
  private showOptionsModal = false;

  private showAddModal = false;

  private printLabel(e: Event, id: string): void {
    store.dispatch(LABEL.PRINT_LABEL, id);
  }

  private submitForm(event: Event, box: Box): void {
    if (!box.id) {
      store.dispatch(BOX.ADD_BOX, box);
    } else {
      store.dispatch(BOX.UPDATE_BOX, box);
    }
  }

  public async mounted(): Promise<void> {
    await store.dispatch(BOX.GET_BOXES);
  }

  private viewBox(id?: string) {
    store.dispatch(BOX.SET_CURRENT_BOX, id);
    this.showAddModal = true;
  }
}
</script>

<style lang="scss">
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
</style>
