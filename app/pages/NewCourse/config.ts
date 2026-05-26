import {z} from 'zod'
import {toTypedSchema} from '@vee-validate/zod'
import {BookOpen, Flame, Layers, GraduationCap, Wrench, FolderKanban, HelpCircle} from 'lucide-vue-next'
import type {FunctionalComponent} from 'vue'

export const knowledgeLevels = [
  {value: 'novis', label: 'Novice', description: 'New to this topic'},
  {value: 'adept', label: 'Adept', description: 'Some working knowledge'},
  {value: 'expert', label: 'Expert', description: 'Deep understanding'},
] as const

export const courseDepths = [
  {value: 'primer', label: 'Primer', description: 'Quick overview — key ideas only'},
  {value: 'deep_dive', label: 'Deep Dive', description: 'Thorough exploration of the topic'},
  {value: 'monolith', label: 'Monolith', description: 'Exhaustive, from foundations to mastery'},
] as const

export const lessonTypes = [
  {value: 'theory', label: 'Theory', description: 'Conceptual explanations and reasoning'},
  {value: 'hands_on', label: 'Hands-On', description: 'Practical exercises and examples'},
  {value: 'project', label: 'Project', description: 'Build something real, step by step'},
  {value: 'quiz', label: 'Quiz', description: 'Test understanding with questions'},
] as const

export const newCourseFormSchema = z.object({
  topic: z.string().min(2, {message: 'Give your topic a name'}),
  knowledgeLevel: z.enum(['novis', 'adept', 'expert'], {
    required_error: 'Select your knowledge level',
  }),
  courseDepth: z.enum(['primer', 'deep_dive', 'monolith'], {
    required_error: 'Select a course depth',
  }),
  lessonType: z.enum(['theory', 'hands_on', 'project', 'quiz'], {
    required_error: 'Select a lesson type',
  }),
})

export const newCourseSchema = toTypedSchema(newCourseFormSchema)

export type NewCourseFormValues = z.infer<typeof newCourseFormSchema>
