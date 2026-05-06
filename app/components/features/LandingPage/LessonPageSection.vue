<script lang="ts" setup>
interface CodeSegment {
  text: string
  cls?: string
}

interface Lesson {
  name: string
  done: boolean
  current?: boolean
}

interface Module {
  num: string
  title: string
  lessons: Lesson[]
}

function highlightCode(segments: CodeSegment[]): string {
  return segments
      .map((seg) => {
        const safe = seg.text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        return seg.cls ? `<span class="${seg.cls}">${safe}</span>` : safe
      })
      .join('')
}

const modules: Module[] = [
  {
    num: '01',
    title: 'Getting Started',
    lessons: [
      {name: 'Installing Python', done: true},
      {name: 'Your First Script', done: true},
    ],
  },
  {
    num: '02',
    title: 'Core Concepts',
    lessons: [
      {name: 'Variables & Types', done: true},
      {name: 'Lists and Loops', done: false, current: true},
      {name: 'Functions', done: false},
    ],
  },
  {
    num: '03',
    title: 'Building Things',
    lessons: [
      {name: 'File I/O', done: false},
      {name: 'Final Project', done: false},
    ],
  },
]

const codeSegments: CodeSegment[] = [
  {text: 'fruits', cls: 'text-text-on-dark'},
  {text: ' = ', cls: 'text-text-on-dark-sec'},
  {text: '["apple", "banana", "cherry"]', cls: 'text-warning'},
  {text: '\n\n'},
  {text: 'for', cls: 'text-primary font-semibold'},
  {text: ' fruit '},
  {text: 'in', cls: 'text-primary font-semibold'},
  {text: ' fruits:\n'},
  {text: '    '},
  {text: 'print', cls: 'text-primary'},
  {text: '('},
  {text: 'f"I like {fruit}"', cls: 'text-warning'},
  {text: ')\n\n'},
  {text: '# Output:', cls: 'text-esp-500'},
  {text: '\n'},
  {text: '# I like apple', cls: 'text-esp-500'},
  {text: '\n'},
  {text: '# I like banana', cls: 'text-esp-500'},
  {text: '\n'},
  {text: '# I like cherry', cls: 'text-esp-500'},
]

const quizOptions = [
  {label: '"a", "b", "c"', correct: false},
  {label: '3', correct: true},
  {label: '["a", "b", "c"]', correct: false},
  {label: 'Error', correct: false},
]
</script>

<template>
  <section id="reader" class="pb-20">
    <!-- Divider -->
    <div class="h-px bg-border-light" />

    <!-- Section header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 py-14 reveal">
      <div>
        <span class="mono-space text-text-muted block mb-4">003 / THE READER</span>
        <h2 class="display-text text-3xl md:text-[2.4rem] leading-tight text-text-main">
          READ. RUN.<br>
          <span class="text-primary">ASK.</span>
        </h2>
      </div>
      <p class="text-text-sec text-sm md:text-base max-w-xs leading-relaxed md:text-right">
        Syntax-highlighted code, callouts, inline quizzes, and an AI panel that
        knows the lesson you're on. Ask anything.
      </p>
    </div>

    <!-- Mock browser panel -->
    <div class="bg-esp-900 rounded-2xl overflow-hidden reveal reveal-delay-1">
      <!-- Browser chrome -->
      <div class="flex items-center gap-1.5 px-5 py-3 border-b border-esp-700 bg-esp-700">
        <div class="size-[9px] rounded-full bg-[#ff5f57]" />
        <div class="size-[9px] rounded-full bg-[#febc2e]" />
        <div class="size-[9px] rounded-full bg-[#28c840]" />
        <span class="ml-3 font-mono text-[10px] text-text-on-dark-mut tracking-wider uppercase">
          learnflow.app / python_for_beginners / mod_02 / l02
        </span>
        <span class="ml-auto font-mono text-[10px] text-text-on-dark-mut">
          LESSON 04 / 07 · 35% COMPLETE
        </span>
      </div>

      <!-- Three-column layout -->
      <div class="flex min-h-[400px] lg:min-h-[520px]">
        <!-- Left sidebar: Course outline -->
        <div class="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-esp-700 bg-esp-800 p-4">
          <!-- Course info -->
          <div class="mb-5">
            <span class="font-mono text-[9px] tracking-widest text-primary uppercase">
              OUTLINE
            </span>
          </div>

          <!-- Modules -->
          <div class="flex-1 space-y-4">
            <div v-for="mod in modules" :key="mod.num">
              <div class="flex items-center gap-1.5 mb-2">
                <span
                  :class="
                    mod.lessons.some((l) => l.current)
                      ? 'text-text-on-dark font-semibold'
                      : 'text-text-on-dark-mut'
                  "
                  class="font-mono text-[9px] tracking-widest uppercase"
                >
                  {{ mod.num }} · {{ mod.title }}
                </span>
              </div>
              <div class="space-y-0.5">
                <div
                  v-for="lesson in mod.lessons"
                  :key="lesson.name"
                  class="flex items-center gap-2 py-1 pl-2"
                >
                  <div
                    v-if="lesson.done"
                    class="size-3.5 rounded-full bg-success/20 flex items-center justify-center shrink-0"
                  >
                    <span class="text-success text-[8px]">&#10003;</span>
                  </div>
                  <div
                    v-else-if="lesson.current"
                    class="size-3.5 rounded-sm bg-primary flex items-center justify-center shrink-0"
                  >
                    <span class="text-white text-[8px]">&#9656;</span>
                  </div>
                  <div v-else class="size-3.5 rounded-full bg-esp-700 shrink-0" />

                  <span
                    :class="
                      lesson.current
                        ? 'text-text-on-dark font-semibold'
                        : lesson.done
                          ? 'text-text-on-dark-sec'
                          : 'text-text-on-dark-mut'
                    "
                    class="font-display text-[11px]"
                  >
                    {{ lesson.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress -->
          <div class="mt-4 pt-4 border-t border-esp-700">
            <span class="font-mono text-[9px] tracking-widest text-text-on-dark-mut uppercase block mb-2">
              PROGRESS
            </span>
            <div class="h-1 rounded-full bg-esp-700 overflow-hidden">
              <div class="h-full w-[35%] bg-primary rounded-full" />
            </div>
            <span class="font-mono text-[10px] text-primary mt-1.5 block">35%</span>
          </div>
        </div>

        <!-- Center content: Lesson body -->
        <div class="flex-1 min-w-0 p-6 lg:p-8 overflow-y-auto">
          <!-- Lesson header -->
          <span class="font-mono text-[0.58rem] font-medium tracking-[0.08em] uppercase text-text-on-dark-mut block mb-3">
            Module 02 · Lesson 02
          </span>
          <h3 class="font-display font-bold text-xl lg:text-2xl tracking-tight text-text-on-dark mb-4">
            Lists and Loops
          </h3>
          <p class="text-sm text-text-on-dark-sec leading-relaxed mb-6">
            Lists let you store multiple values in a single variable. Combined
            with loops, they become one of the most powerful patterns in Python
            — you can process thousands of items in just a few lines.
          </p>

          <!-- Key idea callout -->
          <div class="bg-primary/[0.08] border border-primary/20 rounded-lg px-4 py-3 mb-6">
            <span class="font-mono text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">
              KEY IDEA
            </span>
            <p class="text-sm text-text-on-dark-sec leading-relaxed">
              A
              <code class="font-mono text-[0.84em] text-primary bg-primary/[0.1] px-1.5 py-0.5 rounded">for</code>
              loop visits each item in a list exactly once. The variable name
              after
              <code class="font-mono text-[0.84em] text-primary bg-primary/[0.1] px-1.5 py-0.5 rounded">for</code>
              is your temporary handle for the current item.
            </p>
          </div>

          <!-- Code block -->
          <div class="bg-esp-800 rounded-lg overflow-hidden mb-6">
            <div class="flex items-center justify-between px-4 py-2 border-b border-esp-700">
              <span class="font-mono text-[10px] text-text-on-dark-mut tracking-wider uppercase">
                Python
              </span>
              <span class="font-mono text-[10px] text-text-on-dark-mut">Copy</span>
            </div>
            <div class="p-4">
              <code
                class="font-mono text-xs text-text-on-dark-sec whitespace-pre-wrap leading-relaxed block"
                v-html="highlightCode(codeSegments)"
              />
            </div>
          </div>

          <!-- Quiz -->
          <div class="bg-esp-800 rounded-lg p-4">
            <span class="font-mono text-[10px] font-bold tracking-widest text-text-on-dark-mut uppercase block mb-3">
              CHECK YOUR UNDERSTANDING
            </span>
            <p class="text-sm text-text-on-dark font-display font-medium mb-3">
              What does
              <code class="font-mono text-[0.84em] text-primary bg-primary/[0.1] px-1.5 py-0.5 rounded">print(len(["a", "b", "c"]))</code>
              output?
            </p>
            <div class="space-y-2">
              <div
                v-for="option in quizOptions"
                :key="option.label"
                :class="
                  option.correct
                    ? 'border-success/40 bg-success/[0.08]'
                    : 'border-esp-700 bg-esp-700/50'
                "
                class="flex items-center gap-2.5 px-3 py-2 rounded-md border transition-colors"
              >
                <div
                  :class="
                    option.correct
                      ? 'border-success bg-success'
                      : 'border-esp-700'
                  "
                  class="size-4 rounded-full border flex items-center justify-center shrink-0"
                >
                  <span v-if="option.correct" class="text-white text-[8px]">&#10003;</span>
                </div>
                <span
                  :class="
                    option.correct
                      ? 'text-text-on-dark'
                      : 'text-text-on-dark-sec'
                  "
                  class="font-mono text-xs"
                >
                  {{ option.label }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right sidebar: AI Q&A panel -->
        <div class="hidden md:flex flex-col w-[260px] shrink-0 border-l border-esp-700 bg-esp-800">
          <!-- Panel header -->
          <div class="px-4 py-3 border-b border-esp-700">
            <div class="flex items-center gap-2">
              <div class="size-5 rounded-full bg-primary flex items-center justify-center">
                <span class="text-white text-[9px] font-bold">AI</span>
              </div>
              <span class="font-display text-xs font-semibold text-text-on-dark">
                LearnFlow AI
              </span>
            </div>
            <span class="font-mono text-[9px] text-text-on-dark-mut mt-1 block">
              Context: Lists and Loops · MOD_02
            </span>
          </div>

          <!-- Chat messages -->
          <div class="flex-1 p-4 space-y-4 overflow-y-auto">
            <!-- User message 1 -->
            <div>
              <span class="font-mono text-[9px] text-text-on-dark-mut block mb-1">
                YOU · 14:22
              </span>
              <div class="bg-primary/20 rounded-lg rounded-br-none px-3 py-2">
                <p class="text-xs text-text-on-dark leading-relaxed">
                  Why do we use
                  <code class="font-mono text-[0.84em] text-primary">for</code>
                  instead of
                  <code class="font-mono text-[0.84em] text-primary">while</code>
                  here?
                </p>
              </div>
            </div>

            <!-- AI reply 1 -->
            <div>
              <span class="font-mono text-[9px] text-primary block mb-1">
                LEARNFLOW · 14:22
              </span>
              <div class="bg-esp-700 rounded-lg rounded-bl-none px-3 py-2">
                <p class="text-xs text-text-on-dark-sec leading-relaxed">
                  A
                  <code class="font-mono text-[0.84em] text-primary">for</code>
                  loop is ideal when you know the collection — like a list. A
                  <code class="font-mono text-[0.84em] text-primary">while</code>
                  loop is better when you need to repeat until a condition
                  changes, but you don't know how many times.
                </p>
              </div>
            </div>

            <!-- User message 2 -->
            <div>
              <span class="font-mono text-[9px] text-text-on-dark-mut block mb-1">
                YOU · 14:23
              </span>
              <div class="bg-primary/20 rounded-lg rounded-br-none px-3 py-2">
                <p class="text-xs text-text-on-dark leading-relaxed">
                  Can I loop over a string too?
                </p>
              </div>
            </div>

            <!-- AI reply 2 -->
            <div>
              <span class="font-mono text-[9px] text-primary block mb-1">
                LEARNFLOW · 14:23
              </span>
              <div class="bg-esp-700 rounded-lg rounded-bl-none px-3 py-2">
                <p class="text-xs text-text-on-dark-sec leading-relaxed">
                  Yes! Strings are iterable in Python.
                  <code class="font-mono text-[0.84em] text-primary">for char in "hello"</code>
                  will loop through each character:
                  <code class="font-mono text-[0.84em] text-primary">'h', 'e', 'l', 'l', 'o'</code>.
                </p>
              </div>
            </div>
          </div>

          <!-- Input (decorative) -->
          <div class="p-3 border-t border-esp-700">
            <div class="bg-esp-700 rounded-lg px-3 py-2 flex items-center gap-2">
              <span class="text-primary text-xs">&#8250;</span>
              <span class="font-mono text-[10px] text-text-on-dark-mut flex-1">
                Ask about this lesson...
              </span>
              <div class="size-5 rounded bg-primary/30 flex items-center justify-center">
                <span class="text-primary text-[10px]">&#8593;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
