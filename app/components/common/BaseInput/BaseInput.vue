<script lang="ts" setup>
import {ref} from "vue";
import Input from "../../ui/input/Input.vue";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "../../ui/input-group";
import {Field as VeeField} from "vee-validate";
import {Eye, EyeOff} from "lucide-vue-next";

withDefaults(
    defineProps<{
      name: string;
      description?: string;
      placeholder: string;
      rules?: string;
      isInputGroup?: boolean;
      type?: string;
      className?: string;
      label: string;
      autoComplete?: string;
    }>(),
    {
      isInputGroup: false,
      type: "text",
    },
);
const showPassword = ref(false);
</script>

<template>
  <VeeField
    v-slot="{ field, errors }"
    :name="name"
    :rules="rules"
  >
    <Field
      :class="className"
      :data-invalid="!!errors.length"
    >
      <FieldLabel
        :for="name"
        class="capitalize mono-space text-text-muted"
      >
        {{ label }}
      </FieldLabel>
      <Input
        v-if="!isInputGroup"
        :id="name"
        :aria-invalid="!!errors.length"
        :autocomplete="autoComplete ?? 'on'"
        :placeholder="placeholder"
        :type="type"
        v-bind="field"
      />
      <InputGroup v-else>
        <InputGroupInput
          :id="name"
          :aria-invalid="!!errors.length"
          :autocomplete="autoComplete ?? 'current-password'"
          :placeholder="placeholder"
          :type="showPassword ? 'text' : 'password'"
          v-bind="field"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="showPassword = !showPassword"
          >
            <Eye v-if="!showPassword" />
            <EyeOff v-else />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
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
