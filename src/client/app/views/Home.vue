<template>
  <div class="home">
    <dlg
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :visible.sync="showOptionsModal"
      width="50%"
    >
      <div slot="title">
        <h3>{{ currentBox.name }}</h3>
      </div>
      <el-button @click="() => printLabel(currentBox.id)">
        <i class="el-icon-printer" /><br>
        <br>
        Print Label
      </el-button>
    </dlg>
    <dlg
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :visible.sync="showAddModal"
      width="95%"
    >
      <div slot="title">
        <h3>Add Box</h3>
      </div>
      <el-form ref="form">
        <el-form-item>
          <el-input
            placeholder="Title"
            v-model="currentBox.name"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="Description"
            v-model="currentBox.description"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="() => submitForm()"
          >
            Add Box
          </el-button>
        </el-form-item>
      </el-form>
    </dlg>
    <page-section
      background-color="white"
      id="header"
    >
      <h2>Boxes</h2>
      <el-button
        icon="el-icon-plus"
        @click="() => showModal(true)"
      />
    </page-section>
    <page-section background-color="#eee">
      <list>
        <list-item
          @click="() => setOptionsModalVisible(box)"
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
import { CreateBoxDto } from 'server/box/dto/CreateBox.dto';
import { UpdateBoxDto } from 'server/box/dto/UpdateBox.dto';
import { mapGetters } from 'vuex';
import { ACTIONS as BOX } from '../store/box/actions';
import { ACTIONS as LABEL } from '../store/label/actions';
import store from '../store';

@Component({
  computed: {
    ...mapGetters([
      'boxes',
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
  },
})
export default class Home extends Vue {
  private currentBox?: CreateBoxDto | UpdateBoxDto = {
    name: '',
    description: '',
    contents: [
    ],
  };

  private showOptionsModal = false;

  private showAddModal = false;

  private async printLabel(id: string): Promise<void> {
    store.dispatch(LABEL.PRINT_LABEL, id);
  }

  private async submitForm() {
    try {
      store.dispatch(BOX.ADD_BOX, this.currentBox);
      store.dispatch(BOX.GET_BOXES);
      this.showModal(false);
    } catch (e) {
      console.log(e);
    }

    this.currentBox.name = '';
    this.currentBox.description = '';
    this.currentBox.contents = [];
  }

  public async mounted(): Promise<void> {
    await store.dispatch(BOX.GET_BOXES);
  }

  private setOptionsModalVisible(box) {
    this.currentBox = box;
    this.showOptionsModal = true;
  }

  private showModal(status: boolean) {
    this.showAddModal = status;
  }
}
</script>

<style lang="scss">
  #header {
    display: grid;
    grid-template-columns: auto 0.25fr;
    grid-template-rows: 1fr;
    button i{
      font-weight: bold;
      font-size: 20px;
    }
  }
  .home{
    h2{ color: var(--text-dark)!important }
  }
</style>
