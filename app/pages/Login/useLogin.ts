import {useForm} from "vee-validate";
import {useRouter} from "vue-router";
import {computed, watch} from "vue";
import {storeToRefs} from "pinia";
import {loginSchema} from "~/pages/Login/config";
import {useAuthStore} from "~/stores/useAuthStore";

export const useLogin = () => {
    const {
        errors,
        handleSubmit,
        handleReset,
        isSubmitting,
        values,
    } = useForm({
        validationSchema: loginSchema,
        initialValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();
    const authStore = useAuthStore();
    const {error: authError, isLoading} = storeToRefs(authStore);

    watch(
        () => [values.email, values.password],
        () => {
            authStore.resetError();
        },
    );

    const onSubmit = handleSubmit(async (values) => {
        await authStore.login({
            email: values.email,
            password: values.password,
        });
        handleReset();
        await router.push({name: "dashboard"});
    });

    return {
        errors,
        isSubmitting: computed(() => isSubmitting.value || isLoading.value),
        onSubmit,
        authError,
    };
};
