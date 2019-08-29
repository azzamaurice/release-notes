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

                <FormTextArea
                    v-model="behindTheScenes"
                    label="Behind the scenes"
                    placeholder="What's something that's been worked on?"/>

                <FormTextArea
                    v-model="betaFeatures"
                    label="Beta Improvements"
                    placeholder="Any improvements to our BETA features this week?"/>

                <FormTextArea
                    v-model="newFeatures"
                    label="New Features"
                    placeholder="New Features this week"/>

                <FormTextArea
                    v-model="uiImprovements"
                    label="UI + Other Improvements"
                    placeholder="General Improvements to the system"/>

                <FormTextArea
                    v-model="bugFixes"
                    label="Bug Fixes"
                    placeholder="Bugs fixed this week"/>
            </section>

            <section>
                <h2>Output</h2>

                <FormRadio v-model="outputType" :options="outputTypeOptions"/>

                <Slack
                    v-if="outputType === `slack`"
                    v-bind="slackProps"
                    @output="updateOutput"/>

                <Changelog
                    v-if="outputType === `changelog`"
                    v-bind="changelogProps"
                    @output="updateOutput"/>

                <Journal
                    v-if="outputType === `journal`"
                    v-bind="journalProps"
                    ref="journal"/>
            </section>
        </main>

        <footer>
            <button
                class="btn"
                @click="clearText">
                Clear
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
import { mapValues } from 'lodash-es'
import Copy from 'copy-to-clipboard'
import Storage from 'local-storage'
import Changelog from '@/components/Changelog'
import FormRadio from '@/components/FormRadio'
import FormTextArea from '@/components/FormTextArea'
import Journal from '@/components/Journal'
import Slack from '@/components/Slack'

const defaultValues = {
    general: ``,
    journal: ``,
    behindTheScenes: ``,
    betaFeatures: ``,
    newFeatures: ``,
    uiImprovements: ``,
    bugFixes: ``,
    output: ``,
    outputType: `slack`
}

export default {
    name: `ReleaseNotes`,
    components: {
        FormRadio,
        FormTextArea,
        Changelog,
        Journal,
        Slack
    },
    data() {
        return {
            general: ``,
            journal: ``,
            behindTheScenes: ``,
            betaFeatures: ``,
            newFeatures: ``,
            uiImprovements: ``,
            bugFixes: ``,
            output: ``,
            outputType: `slack`,
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
        this.general = Storage.get(`general`) || ``
        this.journal = Storage.get(`journal`) || ``
        this.behindTheScenes = Storage.get(`behindTheScenes`) || ``
        this.betaFeatures = Storage.get(`betaFeatures`) || ``
        this.newFeatures = Storage.get(`newFeatures`) || ``
        this.uiImprovements = Storage.get(`uiImprovements`) || ``
        this.bugFixes = Storage.get(`bugFixes`) || ``
        this.output = Storage.get(`output`) || ``
        this.outputType = Storage.get(`outputType`) || ``
    },
    computed: {
        slackProps() {
            return {
                general: this.general,
                behind: this.behind,
                beta: this.beta,
                features: this.features,
                improvements: this.improvements,
                fixes: this.fixes
            }
        },
        changelogProps() {
            return {
                general: this.general,
                behind: this.behind,
                beta: this.beta,
                features: this.features,
                improvements: this.improvements,
                fixes: this.fixes
            }
        },
        journalProps() {
            return {
                general: this.general,
                journal: this.journal,
                behind: this.behind,
                beta: this.beta,
                features: this.features,
                improvements: this.improvements,
                fixes: this.fixes
            }
        },
        behind() {
            if (this.behindTheScenes.length) {
                let split = this.behindTheScenes.split('\n')
                let returned = []

                for (let part in split) {
                    if (split[part] !== ``) {
                        returned.push(split[part])
                    }
                }

                return returned
            }

            return false
        },
        beta() {
            if (this.betaFeatures.length) {
                let split = this.betaFeatures.split('\n')
                let returned = []

                for (let part in split) {
                    if (split[part] !== ``) {
                        returned.push(split[part])
                    }
                }

                return returned
            }

            return false
        },
        features() {
            if (this.newFeatures.length) {
                let split = this.newFeatures.split('\n')
                let returned = []

                for (let part in split) {
                    if (split[part] !== ``) {
                        returned.push(split[part])
                    }
                }

                return returned
            }

            return false
        },
        improvements() {
            if (this.uiImprovements.length) {
                let split = this.uiImprovements.split('\n')
                let returned = []

                for (let part in split) {
                    if (split[part] !== ``) {
                        returned.push(split[part])
                    }
                }

                return returned
            }

            return false
        },
        fixes() {
            if (this.bugFixes.length) {
                let split = this.bugFixes.split('\n')
                let returned = []
                for (let part in split) {
                    if (split[part] !== ``) {
                        returned.push(split[part])
                    }
                }

                return returned
            }

            return false
        }
    },
    methods: {
        clearText() {
            this.general = ``
            this.journal = ``
            this.behindTheScenes = ``
            this.betaFeatures = ``
            this.newFeatures = ``
            this.uiImprovements = ``
            this.bugFixes = ``
        },
        updateOutput(value) {
            this.output = value
        },
        copy() {
            if (this.outputType === `journal`) {
                Copy(this.$refs.journal.$el.innerHTML, { format: `text/html` })
            } else {
                Copy(this.output)
            }

        }
    },
    watch: {
        general(value) {
            Storage.set(`general`, value)
        },
        journal(value) {
            Storage.set(`journal`, value)
        },
        behindTheScenes(value) {
            Storage.set(`behindTheScenes`, value)
        },
        betaFeatures(value) {
            Storage.set(`betaFeatures`, value)
        },
        newFeatures(value) {
            Storage.set(`newFeatures`, value)
        },
        uiImprovements(value) {
            Storage.set(`uiImprovements`, value)
        },
        bugFixes(value) {
            Storage.set(`bugFixes`, value)
        },
        output(value) {
            Storage.set(`output`, value)
        },
        outputType(value) {
            Storage.set(`outputType`, value)
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
    background: var(--blaze);
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
