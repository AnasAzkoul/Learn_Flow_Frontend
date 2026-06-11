<script lang="ts" setup>
import {ref} from "vue";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";
import {Field as VeeField} from "vee-validate";
import {CalendarDate, getLocalTimeZone, parseDate, today, type DateValue} from '@internationalized/date'
import {Calendar} from '@/components/ui/calendar'
import {CalendarIcon} from "lucide-vue-next";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";

const maxDate = ref(today(getLocalTimeZone())) as Ref<CalendarDate>
const isOpen = ref(false)

const toCalendarDate = (value: unknown): DateValue | undefined => {
  if (typeof value !== "string" || !value) return undefined

  try {
    return parseDate(value)
  } catch {
    return undefined
  }
}

const formatDate = (value: unknown) => {
  const parsedDate = toCalendarDate(value)
  return parsedDate ? parsedDate.toDate(getLocalTimeZone()).toLocaleDateString() : "Select date"
}

const handleDateChange = (
    value: DateValue | undefined,
    handleChange: (value: string) => void,
) => {
  if (!value) return

  handleChange(value.toString())
  isOpen.value = false
}

interface Props {
  name: string;
  description?: string;
  rules?: string;
  className?: string;
  label: string;
}

defineProps<Props>();
</script>

<template>
  <VeeField
    v-slot="{ value, errors, handleChange }"
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
      <Popover v-model:open="isOpen">
        <PopoverTrigger as-child>
          <Button
            :id="name"
            class="w-48 justify-between font-normal"
            type="button"
            variant="outline"
          >
            <CalendarIcon class="mr-2 size-4 shrink-0" />
            {{ formatDate(value) }}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" class="w-auto p-0">
          <Calendar
            :max-value="maxDate"
            :min-value="new CalendarDate(1925, 1, 1)"
            :model-value="toCalendarDate(value)"
            initial-focus
            layout="month-and-year"
            @update:model-value="(val: DateValue | undefined) => handleDateChange(val, handleChange)"
          />
        </PopoverContent>
      </Popover>
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
