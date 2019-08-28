<template>
    <div>
        <h1>Release notes</h1>

        <h2>General Message</h2>
        <textarea
            v-model="generalMessage"
            placeholder="Welcoming Message"
            cols="65"
            rows="3"></textarea>

        <h2>Journal Only Message</h2>
        <textarea
            v-model="journalOnly"
            placeholder="Information for super-behind-the scenes"
            cols="65"
            rows="3"></textarea>

        <h2>Behind the scenes</h2>
        <textarea
            v-model="behindTheScenes"
            placeholder="What's something that's been worked on?"
            cols="65"
            rows="5"></textarea>

        <h2>Beta Improvements</h2>
        <textarea
            v-model="betaFeatures"
            placeholder="Any improvements to our BETA features this week?"
            cols="65"
            rows="5"></textarea>
        <h2>New Features</h2>
        <textarea
            v-model="newFeatures"
            placeholder="New Features this week"
            cols="65"
            rows="3"></textarea>

        <h2>UI + Other Improvements</h2>
        <textarea
            v-model="uiImprovements"
            placeholder="General Improvements to the system"
            cols="65"
            rows="3"></textarea>

        <h2>Bug Fixes</h2>
        <textarea
            v-model="bugFixes"
            placeholder="Bugs fixed this week"
            cols="65"
            rows="5"></textarea>
        <button @click="clearText">Clear Text</button>

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
    </div>
</template>

<script>
import Changelog from '@/components/Changelog'
import Journal from '@/components/Journal'
import Slack from '@/components/Slack'

export default {
    name: `ReleaseNotes`,
    components: {
        Changelog,
        Journal,
        Slack
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
                general: this.generalMessage,
                behind: this.behind,
                beta: this.beta,
                features: this.features,
                improvements: this.improvements,
                fixes: this.fixes
            }
        },
        changelogProps() {
            return {
                general: this.generalMessage,
                behind: this.behind,
                beta: this.beta,
                features: this.features,
                improvements: this.improvements,
                fixes: this.fixes
            }
        },
        journalProps() {
            return {
                general: this.generalMessage,
                journal: this.journalOnly,
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
            this.generalMessage = ``
            this.journalOnly = ``
            this.behindTheScenes = ``
            this.betaFeatures = ``
            this.newFeatures = ``
            this.uiImprovements = ``
            this.bugFixes = ``
        }
    }
}
</script>
