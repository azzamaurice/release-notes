<template>
    <div class="release-notes">
        <header>
            <h1>Release notes</h1>

            <button
                class="clear"
                @click="clearText">
                Clear
            </button>
        </header>

        <main>
            <section>
                <h2>General Message</h2>
                <textarea
                    v-model="general"
                    placeholder="Welcoming Message">

                </textarea>

                <h2>Journal Only Message</h2>
                <textarea
                    v-model="journal"
                    placeholder="Information for super-behind-the scenes">
                </textarea>

                <h2>Behind the scenes</h2>
                <textarea
                    v-model="behindTheScenes"
                    placeholder="What's something that's been worked on?">
                </textarea>

                <h2>Beta Improvements</h2>
                <textarea
                    v-model="betaFeatures"
                    placeholder="Any improvements to our BETA features this week?">
                </textarea>

                <h2>New Features</h2>
                <textarea
                    v-model="newFeatures"
                    placeholder="New Features this week">
                </textarea>

                <h2>UI + Other Improvements</h2>
                <textarea
                    v-model="uiImprovements"
                    placeholder="General Improvements to the system">
                </textarea>

                <h2>Bug Fixes</h2>
                <textarea
                    v-model="bugFixes"
                    placeholder="Bugs fixed this week">
                </textarea>
            </section>

            <section>
                <h2>Output Options</h2>
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

                <h2>Output</h2>

                <Slack
                    v-if="outputType === `slack`"
                    v-bind="slackProps"/>

                <Changelog
                    v-if="outputType === `changelog`"
                    v-bind="changelogProps"/>

                <Journal
                    v-if="outputType === `journal`"
                    v-bind="journalProps"/>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: `ReleaseNotes`,
    components: {
        Changelog: () => import('@/components/Changelog'),
        Journal: () => import('@/components/Journal'),
        Slack: () => import('@/components/Slack')
    },
    data() {
        return {
            generalMessage: ``,
            journalOnly: ``,
            behindTheScenes: ``,
            betaFeatures: ``,
            newFeatures: ``,
            uiImprovements: ``,
            bugFixes: ``,
            outputType: `slack`
        }
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
        }
    }
}
</script>

<style lang="scss" scoped>
.release-notes {
    --main-flex-direction: column;
    --section-flex: 0 0 100%;

    @media (min-width: 768px) {
        --main-flex-direction: row;
        --section-flex: 1 1 50%;
    }
}

.release-notes {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

header {
    display: flex;
    flex: 0 0 auto;
    padding: 1rem;
}

main {
    display: flex;
    flex-direction: var(--main-flex-direction);
    flex: 1 1 auto;
    overflow: hidden;
}

section {
    flex: var(--section-flex);
    padding: 1rem;
    overflow-x: auto;
}

.clear {
    margin-left: auto;
}
</style>
