<template>
    <div class="release-notes">
        <header>
            <h1>Release Notes</h1>
        </header>

        <main>
            <div class="main-inner">
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

                    <div class="options">
                        <label for="radio-slack">
                            <input v-model="outputType" id="radio-slack" type="radio" value="slack">
                            Slack
                        </label>
                        <label for="radio-changelog">
                            <input v-model="outputType" id="radio-changelog" type="radio" value="changelog">
                            Changelog
                        </label>
                        <label for="radio-journal">
                            <input v-model="outputType" id="radio-journal" type="radio" value="journal">
                            Journal
                        </label>
                    </div>

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
                        ref="journal"
                        v-bind="journalProps"/>
                </section>
            </div>
        </main>

        <footer>
            <div class="footer-inner">
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
            </div>
        </footer>
    </div>
</template>

<script>
import Copy from 'copy-to-clipboard'
import Storage from 'local-storage'
import FormTextArea from '@/components/FormTextArea'

export default {
    name: `ReleaseNotes`,
    components: {
        FormTextArea,
        Changelog: () => import('@/components/Changelog'),
        Journal: () => import('@/components/Journal'),
        Slack: () => import('@/components/Slack')
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
            output: `slack`,
            outputType: ``
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
            if (this.outputType !== `journal`) {
                Copy(this.output)
            } else {
                Copy(
                    this.$refs.journal.$el.innerHTML,
                    {
                        format: `text/html`
                    }
                )
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
        outputType(value) {
            Storage.set(`outputType`, value)
        }
    }
}
</script>

<style lang="scss" scoped>
.release-notes {
    --main-inner-flex-direction: column;
    --main-overflow-y: auto;
    --section-flex: 0 0 100%;
    --section-overflow-y: visible;

    @media (min-width: 768px) {
        --main-inner-flex-direction: row;
        --main-overflow-y: hidden;
        --section-flex: 1 1 50%;
        --section-overflow-y: scroll;
    }
}

.release-notes {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

header {
    flex: 0;
    /*display: flex;*/
    padding: 1rem;
    color: white;
    background: var(--blaze);
    z-index: 2;
    box-shadow: 0 0 4px hsla(0, 0%, 50%, 0.5);

    h1 {
        margin: 0;
    }
}

main {
    display: flex;
    flex: 1;
    overflow-x: hidden;
    overflow-y: var(--main-overflow-y);
    z-index: 1;
}

.main-inner {
    flex: 1;
    display: flex;
    flex-direction: var(--main-inner-flex-direction);
}

footer {
    flex: 0;
    padding: 1rem;
    background-color: var(--beige);
    z-index: 2;
    box-shadow: 0 0 4px hsla(0, 0%, 50%, 0.5);

    button {
        & + button {
            margin-left: 1rem;
        }
    }
}

.footer-inner {
    display: flex;
    justify-content: flex-end;
}

section {
    flex: var(--section-flex);
    padding: 1rem;
    overflow-y: var(--section-overflow-y);
}

.options {
    margin-bottom: 1rem;
}
</style>
