<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../../ui/select";
import {type Props} from "./config";

import {Field as VeeField} from "vee-validate";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";

const props = defineProps<Props>();
</script>

<template>
  <VeeField
    v-slot="{ field, errors }"
    :name="name as string"
    :rules="rules"
  >
    <Field
      :class="className"
      :data-invalid="!!errors.length"
    >
      <FieldLabel
        :for="name as string"
        class="mono-space text-text-muted capitalize"
      >
        {{ label }}
      </FieldLabel>
      <Select
        :model-value="field.value"
        @blur="field.onBlur"
        @update:model-value="field.onChange"
      >
        <SelectTrigger :aria-invalid="!!errors.length">
          <SelectValue :placeholder="placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="item in data"
              :key="item"
              :value="item"
              class="capitalize text-gray-500"
            >
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription v-if="description">
        {{ description }}
      </FieldDescription>
      <FieldError
        v-if="errors.length"
        :errors="errors"
      />
    </Field>
  </VeeField>
</template>
