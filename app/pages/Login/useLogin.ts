import {useForm} from "vee-validate";
import {useRouter} from "vue-router";
import {watch} from "vue";
import {loginSchema} from "~/pages/Login/config";

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

    watch(
        () => [values.email, values.password],
        () => {
            // if (userStore.isError) {
            //     userStore.resetErrorState();
            // }
        },
    );

    const onSubmit = handleSubmit(async (values) => {
        console.log(values, "successful login")

        handleReset();
        await router.push({name: "dashboard"});
    });

    return {
        errors,
        isSubmitting,
        onSubmit,
    };
};
