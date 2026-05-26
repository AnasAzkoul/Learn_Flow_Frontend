import {useForm} from 'vee-validate'
import {useRouter} from 'vue-router'
import {newCourseSchema} from './config'

export const useNewCourse = () => {
  const {
    errors,
    handleSubmit,
    handleReset,
    isSubmitting,
    values,
  } = useForm({
    validationSchema: newCourseSchema,
    initialValues: {
      topic: '',
      knowledgeLevel: undefined,
      courseDepth: undefined,
      lessonType: undefined,
    },
  })

  const router = useRouter()

  const onSubmit = handleSubmit(async (values) => {
    console.log(values, 'new course created')
    handleReset()
    await router.push('/dashboard')
  })

  return {
    errors,
    isSubmitting,
    values,
    onSubmit,
  }
}
