export interface CodeSegment {
    text: string
    cls?: string
}

export interface Persona {
    id: string
    label: string
    level: {
        value: string
        barWidth: string
        desc: string
    }
    code: {
        segments: CodeSegment[]
        caption: string
    }
    style: {
        name: string
        traits: string[]
        desc: string
    }
}

export const personas: Persona[] = [
    {
        id: 'analyst',
        label: 'Data Analyst',
        level: {
            value: 'Beginner+',
            barWidth: 'w-1/2',
            desc: 'Assumes spreadsheet fluency. Starts from SELECT, builds to window functions — no systems or query-planner talk.',
        },
        code: {
            segments: [
                {text: '-- find top customers by revenue\n', cls: 'text-esp-500'},
                {text: 'SELECT', cls: 'font-semibold'},
                {text: ' customer_id, '},
                {text: 'SUM', cls: 'text-primary'},
                {text: '(amount) AS revenue '},
                {text: 'FROM', cls: 'font-semibold'},
                {text: ' orders\n'},
                {text: 'GROUP BY', cls: 'font-semibold'},
                {text: ' customer_id '},
                {text: 'ORDER BY', cls: 'font-semibold'},
                {text: ' revenue '},
                {text: 'DESC', cls: 'font-semibold'},
                {text: ' LIMIT 10;'},
            ],
            caption: 'Business-metric framing: revenue, retention, funnels.',
        },
        style: {
            name: 'Plain-English',
            traits: ['Concrete', 'Example-led', 'No-jargon'],
            desc: 'Skips academic framing. Every concept is introduced with a worked example you can run.',
        },
    },
    {
        id: 'backend',
        label: 'Backend Dev',
        level: {
            value: 'Intermediate',
            barWidth: 'w-3/4',
            desc: 'Skips SELECT 101. Jumps to joins, indexes, execution plans, transactions, and isolation levels.',
        },
        code: {
            segments: [
                {text: '-- EXPLAIN ANALYZE to read the plan\n', cls: 'text-esp-500'},
                {text: 'EXPLAIN ANALYZE', cls: 'text-primary font-semibold'},
                {text: ' SELECT u.id, COUNT(o.id)\n'},
                {text: 'FROM', cls: 'font-semibold'},
                {text: ' users u '},
                {text: 'LEFT JOIN', cls: 'font-semibold'},
                {text: ' orders o ON o.user_id = u.id\n'},
                {text: 'WHERE', cls: 'font-semibold'},
                {text: ' u.created_at > '},
                {text: 'NOW()', cls: 'text-primary'},
                {text: ' - '},
                {text: "INTERVAL '30 days'\n", cls: 'text-primary'},
                {text: 'GROUP BY', cls: 'font-semibold'},
                {text: ' u.id;'},
            ],
            caption: 'Planner, indexes, N+1 patterns, and when to denormalize.',
        },
        style: {
            name: 'Technical',
            traits: ['Performance', 'Correctness', 'Edge-cases'],
            desc: 'Assumes you know your way around a terminal. Favors precision over hand-holding.',
        },
    },
    {
        id: 'pm',
        label: 'Product Manager',
        level: {
            value: 'Conceptual',
            barWidth: 'w-1/3',
            desc: "Focuses on what queries mean, not how to write them. You'll read SQL confidently; writing is optional.",
        },
        code: {
            segments: [
                {text: '-- what analysts send you\n', cls: 'text-esp-500'},
                {text: 'SELECT', cls: 'font-semibold'},
                {text: ' feature, COUNT(*) AS uses,\n  '},
                {text: 'AVG', cls: 'text-primary'},
                {text: '(session_len) AS avg_time\n'},
                {text: 'FROM', cls: 'font-semibold'},
                {text: ' events '},
                {text: 'WHERE', cls: 'font-semibold'},
                {text: ' dt ≥ '},
                {text: "'2026-03-01'\n", cls: 'text-primary'},
                {text: 'GROUP BY', cls: 'font-semibold'},
                {text: ' feature;'},
            ],
            caption: 'Reading, not writing. Know what a JOIN means and when to push back on a chart.',
        },
        style: {
            name: 'Conversational',
            traits: ['Why-first', 'Decisions', 'No-code-math'],
            desc: 'Every concept maps to a product decision. Minimal syntax, maximum intuition.',
        },
    },
    {
        id: 'student',
        label: 'High-School Student',
        level: {
            value: 'Absolute Beginner',
            barWidth: 'w-1/4',
            desc: 'Zero assumptions. Starts with "what is a row." Lots of analogies, tiny steps, frequent quizzes.',
        },
        code: {
            segments: [
                {text: '-- your very first query\n', cls: 'text-esp-500'},
                {text: 'SELECT', cls: 'text-primary font-semibold'},
                {text: ' name, grade '},
                {text: 'FROM', cls: 'text-primary font-semibold'},
                {text: ' students\n'},
                {text: 'WHERE', cls: 'text-primary font-semibold'},
                {text: ' grade > 90;\n'},
                {text: '-- "give me the name and grade\n--  of every student above 90"', cls: 'text-esp-500'},
            ],
            caption: 'Small, classroom-flavored examples. Builds up slowly.',
        },
        style: {
            name: 'Friendly',
            traits: ['Analogies', 'Visual', 'Patient'],
            desc: 'Like a very patient tutor. Diagrams before definitions. Lots of checkpoints.',
        },
    },
]
