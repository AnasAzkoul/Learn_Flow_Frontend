<script lang="ts" setup>
import Checkbox from "../../ui/checkbox/Checkbox.vue";
import {Field as VeeField} from "vee-validate";
import {Field, FieldLabel} from "../../ui/field";

const props = defineProps<{
  name: HTMLInputElement["name"];
  id: HTMLInputElement["id"];
  className?: string;
  description?: string;
  label?: string;
  rules?: string;
}>();
</script>

<template>
  <VeeField
    v-slot="{ field, errors }"
    :name="name"
    :rules="rules"
    type="checkbox"
  >
    <Field
      :class="className"
      :data-invalid="!!errors.length"
      orientation="horizontal"
    >
      <FieldLabel
        v-if="label"
        :for="name"
      >
        {{ label }}
      </FieldLabel>
      <Checkbox
        :id="name"
        :aria-invalid="!!errors.length"
        :model-value="field.value"
        :name="name"
        @update:model-value="field.onChange"
      />
      <FieldLabel v-if="!label">
        <slot />
      </FieldLabel>
      <!-- <FieldError
        v-if="errors.length"
        :errors="errors"
      /> -->
    </Field>
  </VeeField>
</template>
