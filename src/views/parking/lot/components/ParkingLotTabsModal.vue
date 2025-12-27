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
          <ParkingBondForm ref="ParkingBondFormRef" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" />
          <ParkingBankInfoForm ref="ParkingBankInfoFormRef" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false"></ParkingBankInfoForm>
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
  import ParkingBondForm from '@/views/parking/bond/components/ParkingBondForm.vue';
  import ParkingBankInfoForm from '@/views/parking/bank/components/ParkingBankInfoForm.vue';

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
  const ParkingBondFormRef = ref();
  const ParkingBankInfoFormRef = ref();
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
    let defaultInfo = { parkingId: record.id };
    let parkingOuterPriceRecord = defaultInfo;
    let parkingInnerPriceRecord = defaultInfo;
    let parkingLotImageRecord = defaultInfo;
    let parkingCertificationRecord = defaultInfo;
    let parkingBondRecord = defaultInfo;
    let parkingBankInfoRecord = defaultInfo;
    if (record.parkingPricesList) {
      let outerTempList = record.parkingPricesList.filter((item) => item.parkingType === '0');
      let innerTempList = record.parkingPricesList.filter((item) => item.parkingType === '1');
      if (outerTempList.length > 0) {
        parkingOuterPriceRecord = outerTempList[0];
      } else {
        parkingOuterPriceRecord.parkingType = '0';
      }
      if (innerTempList.length > 0) {
        parkingInnerPriceRecord = innerTempList[0];
      } else {
        parkingOuterPriceRecord.parkingType = '1';
      }
      if (record.parkingLotImage) {
        parkingLotImageRecord = record.parkingLotImage;
      }
      if (record.parkingCertification) {
        parkingCertificationRecord = record.parkingCertification;
      }
      if (record.parkingBond) {
        parkingBondRecord = record.parkingBond;
      }
      if (record.parkingBankInfo) {
        parkingBankInfoRecord = record.parkingBankInfo;
      }
    }
    nextTick(() => {
      parkingLotFormRef.value.edit(record);
      parkingOuterPriceFormRef.value.edit(parkingOuterPriceRecord);
      parkingInnerPriceFormRef.value.edit(parkingInnerPriceRecord);
      ParkingLotImageFormRef.value.edit(parkingLotImageRecord);
      ParkingCertificationFormRef.value.edit(parkingCertificationRecord);
      ParkingBondFormRef.value.edit(parkingBondRecord);
      ParkingBankInfoFormRef.value.edit(parkingBankInfoRecord);
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
      if (activeKey.value === '1') {
        parkingLotFormRef.value.submitForm();
      } else if (activeKey.value === '2') {
        parkingOuterPriceFormRef.value.submitForm();
      } else if (activeKey.value === '3') {
        parkingInnerPriceFormRef.value.submitForm();
      } else if (activeKey.value === '4') {
        ParkingLotImageFormRef.value.submitForm();
      } else if (activeKey.value === '5') {
        ParkingCertificationFormRef.value.submitForm();
      } else if (activeKey.value === '6') {
        ParkingBondFormRef.value.submitForm();
        ParkingBankInfoFormRef.value.submitForm();
      }
    }
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    // handleCancel();
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
