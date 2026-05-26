import {useForm} from "vee-validate";
import {useRouter} from "vue-router";
import {watch} from "vue";
// import {useUserStore} from "../../../stores/useUserStore.ts";
import {signupSchema} from "~/pages/Signup/config";

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
    // const userStore = useUserStore();
    // const authError = computed(() => userStore.errorMessage);

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
            // if (userStore.isError) {
            //     userStore.resetErrorState();
            // }
        },
    );

    const onSubmit = handleSubmit(async (values) => {
        if (values.password !== values.confirmPassword) {
            setFieldError("confirmPassword", "Passwords do not match");
            return;
        }

        // const result = await userStore.signupUser(values);

        // if (!result.success) {
        //     toast.error(result.error.message);
        //     return;
        // }

        console.log(values, "successful signup")

        handleReset();
        await router.push({name: "newCourse"});
    });

    return {
        termsAndConditions,
        termsAndConditionsAttrs,
        errors,
        isSubmitting,
        onSubmit,
        // authError,
    };
};
