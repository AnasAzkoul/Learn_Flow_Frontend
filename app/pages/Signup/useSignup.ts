import {useForm} from "vee-validate";
import {useRouter} from "vue-router";
import {computed, watch} from "vue";
import {storeToRefs} from "pinia";
import {signupSchema} from "~/pages/Signup/config";
import {useAuthStore} from "~/stores/useAuthStore";

export const useSignup = () => {
    const {
        defineField,
        errors,
        handleSubmit,
        handleReset,
        isSubmitting,
        setFieldError,
        values,
    } = useForm({
        validationSchema: signupSchema,
        initialValues: {
            fullName: "",
            email: "",
            occupation: "",
            birthDate: "",
            gender: undefined,
            educationalLevel: undefined,
            learningStyle: undefined,
            password: "",
            confirmPassword: "",
            termsAndConditions: false,
        },
    });

    const [termsAndConditions, termsAndConditionsAttrs] =
        defineField("termsAndConditions");

    const router = useRouter();
    const authStore = useAuthStore();
    const {error: authError, isLoading} = storeToRefs(authStore);

    watch(
        () => [
            values.fullName,
            values.email,
            values.occupation,
            values.birthDate,
            values.gender,
            values.educationalLevel,
            values.learningStyle,
            values.password,
            values.confirmPassword,
            values.termsAndConditions,
        ],
        () => {
            authStore.resetError();
        },
    );

    const onSubmit = handleSubmit(async (values) => {
        if (values.password !== values.confirmPassword) {
            setFieldError("confirmPassword", "Passwords do not match");
            return;
        }

        await authStore.signup({
            fullName: values.fullName ?? "",
            email: values.email,
            occupation: values.occupation,
            birthDate: values.birthDate,
            gender: values.gender,
            educationalLevel: values.educationalLevel,
            learningStyle: values.learningStyle,
            password: values.password,
            termsAndConditions: values.termsAndConditions,
        });
        handleReset();
        await router.push({name: "newCourse"});
    });

    return {
        termsAndConditions,
        termsAndConditionsAttrs,
        errors,
        isSubmitting: computed(() => isSubmitting.value || isLoading.value),
        onSubmit,
        authError,
    };
};
