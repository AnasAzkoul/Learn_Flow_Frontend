import type {HTMLAttributes, SelectHTMLAttributes} from "vue";

export type Props = {
    data: string[];
    placeholder: string;
    className?: HTMLAttributes["class"];
    name: SelectHTMLAttributes["name"];
    description?: string;
    label: string;
    rules?: string;
};

export type Emits = {
    (e: "update:modelValue", value: string): void;
    (e: "focus"): void;
    (e: "blur"): void;
};
