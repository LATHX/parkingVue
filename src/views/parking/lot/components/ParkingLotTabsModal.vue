<template>
  <j-modal
    :title="title"
    :width="1200"
    :visible="visible"
    @ok="handleOk"
    :okText="disableSubmit ? '编辑' : '保存'"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="parking-lot-tabs-modal"
  >
    <div style="margin-left: 20px">
      <a-tabs v-model:activeKey="activeKey" :centered="true">
        <a-tab-pane key="1" tab="车场信息" :forceRender="true">
          <ParkingLotForm ref="parkingLotFormRef" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="室外车位价格" :forceRender="true">
          <ParkingPriceForm ref="parkingOuterPriceFormRef" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="室内车位价格" :forceRender="true">
          <ParkingPriceForm ref="parkingInnerPriceFormRef" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="车场图片" :forceRender="true">
          <ParkingLotImageForm ref="ParkingLotImageFormRef" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="车场资质" :forceRender="true">
          <ParkingCertificationForm ref="ParkingCertificationFormRef" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" />
        </a-tab-pane>
        <a-tab-pane key="6" tab="其他信息" :forceRender="true">
          <ParkingSettlementSettingList :parking-id="parkingId" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </j-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import ParkingLotForm from './ParkingLotForm.vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import ParkingLotImageForm from '@/views/parking/image/components/ParkingLotImageForm.vue';
  import ParkingPriceForm from '@/views/parking/price/components/ParkingPriceForm.vue';
  import ParkingCertificationForm from '@/views/parking/certification/components/ParkingCertificationForm.vue';
  import ParkingSettlementSettingList from '@/views/parking/settlementSetting/ParkingSettlementSettingList.vue';

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const parkingId = ref('');
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const parkingLotFormRef = ref();
  const parkingOuterPriceFormRef = ref();
  const parkingInnerPriceFormRef = ref();
  const ParkingLotImageFormRef = ref();
  const ParkingCertificationFormRef = ref();
  const activeKey = ref('1');
  const emit = defineEmits(['register', 'success']);

  /**
   * 新增
   */
  function add() {
    activeKey.value = '1';
    parkingId.value = '';
    title.value = '新增';
    disableSubmit.value = false;
    visible.value = true;
    nextTick(() => {
      parkingLotFormRef.value.add();
    });
  }

  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    activeKey.value = '1';
    parkingId.value = record.id;
    title.value = disableSubmit.value ? '详情' : '编辑';
    let parkingOuterPriceRecord = record.parkingPricesList.filter((item) => item.parkingType === '0');
    let parkingInnerPriceRecord = record.parkingPricesList.filter((item) => item.parkingType === '1');
    if (parkingOuterPriceRecord.length > 0) {
      parkingOuterPriceRecord = parkingOuterPriceRecord[0];
    }
    if (parkingInnerPriceRecord.length > 0) {
      parkingInnerPriceRecord = parkingInnerPriceRecord[0];
    }
    nextTick(() => {
      parkingLotFormRef.value.edit(record);
      parkingOuterPriceFormRef.value.edit(parkingOuterPriceRecord);
      parkingInnerPriceFormRef.value.edit(parkingInnerPriceRecord);
      ParkingLotImageFormRef.value.edit(record.parkingLotImage);
      ParkingCertificationFormRef.value.edit(record.parkingCertification);
    });
    visible.value = true;
  }

  /**
   * 确定按钮点击事件
   */
  function handleOk() {
    if (disableSubmit.value) {
      // 当前是详情/禁用状态，点击变成了编辑
      disableSubmit.value = false;
      title.value = '编辑';
    } else {
      // 当前是编辑状态，点击保存
      parkingLotFormRef.value.submitForm();
    }
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    handleCancel();
    emit('success');
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  defineExpose({
    add,
    edit,
    disableSubmit,
    parkingId,
  });
</script>

<style lang="less" scoped></style>
