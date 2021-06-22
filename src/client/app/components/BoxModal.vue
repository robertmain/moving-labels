<template>
  <el-dialog
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :visible.sync="syncedVisible"
    :destroy-on-close="true"
    width="calc(100% - var(--spacing-lg))"
    @open="populate"
  >
    <div slot="title">
      <h3>{{ formData.name }}</h3>
    </div>
    <el-form @submit.prevent.native="(e) => submitHandler(e, formData)">
      <input
        type="hidden"
        name="submithack"
        value="false"
      >
      <el-form-item>
        <el-input
          placeholder="Title"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="Description"
          v-model="formData.description"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          size="large"
          :style="{ width: '100%' }"
          v-model="formData.size"
        >
          <el-option
            v-for="size in sizes"
            :key="size"
            :label="size | titleCase"
            :value="size"
          >
            {{ size | titleCase }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          size="medium"
          icon="el-icon-finished"
          native-type="submit"
        >
          Save
        </el-button>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      v-if="id"
    >
      <el-button @click="(e) => printHandler(e, id)">
        <i class="el-icon-printer" /><br>
        <br>
        Print Label
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
} from 'vue-property-decorator';
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
} from 'element-ui';
import { SIZE } from '../store/box/types';

@Component({
  components: {
    ElDialog: Dialog,
    ElFormItem: FormItem,
    ElForm: Form,
    ElInput: Input,
    ElButton: Button,
    ElSelect: Select,
    ElOption: Option,
  },
  filters: {
    titleCase: (value: string) => value[0].toUpperCase()
      + value.slice(1).toLowerCase(),
  }
})
export default class BoxModal extends Vue {
  @PropSync('visible', {
    type: Boolean,
    default: false,
    required: false,
  })
  public syncedVisible: boolean;

  @Prop({
    type: String,
    default: null,
  })
  public id?: string | null;

  @Prop({
    type: String,
    default: '',
  })
  public name: string;

  @Prop({
    type: String,
    default: '',
  })
  public description: string;

  @Prop({
    type: String,
    default: SIZE.SMALL,
    validator: (val) => Object.values(SIZE).includes(val),
  })
  public size: SIZE;

  @Prop({
    type: Function,
    required: true,
  })
  // eslint-disable-next-line @typescript-eslint/ban-types
  public submitHandler: Function;

  @Prop({
    type: Function,
    required: true,
  })
  // eslint-disable-next-line @typescript-eslint/ban-types
  public printHandler: Function;

  private formData = {
    id: null,
    name: '',
    description: '',
    size: '',
  };

  private populate() {
    this.formData.id = this.id;
    this.formData.name = this.name;
    this.formData.description = this.description;
    this.formData.size = this.size;
  }

  private get sizes(): string[] {
    return Object.values(SIZE);
  }
}
</script>
