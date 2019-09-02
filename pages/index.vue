<template>
    <div class="release-notes">
        <header>
            <h1>Release Notes</h1>
        </header>

        <main>
            <section>
                <h2>Input details</h2>

                <FormTextArea
                    v-model="general"
                    label="General Message"
                    placeholder="Welcoming Message"/>

                <FormTextArea
                    v-model="journal"
                    label="Journal Only Message"
                    placeholder="Information for super-behind-the scenes"/>

                <FormList
                    v-model="behind"
                    label="Behind the scenes"
                    description="What's something that's been worked on?"/>

                <FormList
                    v-model="beta"
                    label="Beta Improvements"
                    description="Any improvements to our BETA features this week?"/>

                <FormList
                    v-model="features"
                    label="New Features"
                    description="New Features this week"/>

                <FormList
                    v-model="improvements"
                    label="UI + Other Improvements"
                    description="General Improvements to the system"/>

                <FormList
                    v-model="fixes"
                    label="Bug Fixes"
                    description="Bugs fixed this week"/>
            </section>

            <section>
                <h2>Output</h2>

                <FormRadio v-model="outputType" :options="outputTypeOptions"/>

                <Slack
                    v-if="outputType === `slack`"
                    v-bind="outputProps"
                    @output="updateOutput"/>

                <Changelog
                    v-if="outputType === `changelog`"
                    v-bind="outputProps"
                    @output="updateOutput"/>

                <Journal
                    v-if="outputType === `journal`"
                    v-bind="outputProps"
                    ref="journal"/>
            </section>
        </main>

        <footer>
            <button
                class="btn"
                @click="resetValues">
                Reset
            </button>

            <button
                class="btn blaze"
                @click="copy">
                Copy
            </button>
        </footer>
    </div>
</template>

<script>
import {
    filter,
    merge
} from 'lodash-es'
import Copy from 'copy-to-clipboard'
import Storage from 'local-storage'
import Changelog from '@/components/Changelog'
import FormList from '@/components/FormList'
import FormRadio from '@/components/FormRadio'
import FormTextArea from '@/components/FormTextArea'
import Journal from '@/components/Journal'
import Slack from '@/components/Slack'

const defaultValues = {
    general: null,
    journal: null,
    behind: [],
    beta: [],
    features: [],
    improvements: [],
    fixes: [],
    output: null,
    outputType: `slack`
}

export default {
    name: `ReleaseNotes`,
    components: {
        Changelog,
        FormList,
        FormRadio,
        FormTextArea,
        Journal,
        Slack
    },
    data() {
        return {
            general: null,
            journal: null,
            behind: [],
            beta: [],
            features: [],
            improvements: [],
            fixes: [],
            output: null,
            outputType: null,
            outputTypeOptions: [
                {
                    value: `slack`,
                    label: `Slack`
                },
                {
                    value: `changelog`,
                    label: `Changelog`
                },
                {
                    value: `journal`,
                    label: `Journal`
                }
            ]
        }
    },
    created() {
        this.updateValues()
    },
    computed: {
        outputProps() {
            return {
                general: this.general,
                journal: this.journal,
                behind: this.behind,
                beta: this.beta,
                features: this.features,
                improvements: this.improvements,
                fixes: this.fixes
            }
        }
    },
    methods: {
        updateOutput(value) {
            this.output = value
        },
        copy() {
            if (this.outputType === `journal`) {
                Copy(this.$refs.journal.$el.innerHTML, { format: `text/html` })
            } else {
                Copy(this.output)
            }
        },
        resetValues() {
            this.general = defaultValues.general
            this.journal = defaultValues.journal
            this.behind = defaultValues.behind
            this.beta = defaultValues.beta
            this.features = defaultValues.features
            this.improvements = defaultValues.improvements
            this.fixes = defaultValues.fixes
            this.output = defaultValues.output
            this.outputType = defaultValues.outputType
        },
        updateValues() {
            const {
                general,
                journal,
                behind,
                beta,
                features,
                improvements,
                fixes,
                output,
                outputType
            } = merge(Storage.get(`notes`), defaultValues)

            this.general = general
            this.journal = journal
            this.behind = behind
            this.beta = beta
            this.features = features
            this.improvements = improvements
            this.fixes = fixes
            this.output = output
            this.outputType = outputType
        },
        updateStorage(field, value) {
            const notes = Storage.get(`notes`) || {}

            notes[field] = value || null

            Storage.set(`notes`, notes)
        }
    },
    watch: {
        general(value) {
            this.updateStorage(`general`, value)
        },
        journal(value) {
            this.updateStorage(`journal`, value)
        },
        behind(value) {
            this.updateStorage(`behind`, value)
        },
        beta(value) {
            this.updateStorage(`beta`, value)
        },
        features(value) {
            this.updateStorage(`features`, value)
        },
        improvements(value) {
            this.updateStorage(`improvements`, value)
        },
        fixes(value) {
            this.updateStorage(`fixes`, value)
        },
        output(value) {
            this.updateStorage(`output`, value)
        },
        outputType(value) {
            this.updateStorage(`outputType`, value)
        }
    }
}
</script>

<style lang="scss" scoped>
.release-notes {
    --section-shadow: 0 0 4px hsla(0, 0%, 50%, 0.5);
    --header-footer-padding: 0.5rem;

    @media (min-width: 768px) {
        --header-footer-padding: 1rem;
        --main-display: flex;
        --main-overflow: hidden;
    }
}

.release-notes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

header {
    padding: var(--header-footer-padding);
    color: white;
    background: var(--orange);
    box-shadow: var(--section-shadow);

    h1 {
        margin: 0;
    }
}

main {
    display: var(--main-display);
    flex: 1;
    overflow: var(--main-overflow, scroll);
}

footer {
    display: flex;
    justify-content: flex-end;
    padding: var(--header-footer-padding);
    background-color: var(--beige);
    box-shadow: var(--section-shadow);

    button {
        & + button {
            margin-left: 0.5rem;

            @media (min-width: 768px) {
                margin-left: 1rem;
            }
        }
    }
}

section {
    padding: 1rem;

    @media (min-width: 768px) {
        flex: 1 0 50%;
        overflow-x: scroll;
    }
}

.options {
    margin-bottom: 1rem;
}
</style>
