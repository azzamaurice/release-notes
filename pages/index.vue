<template>
    <div>
        <section>
            <h2>Input details</h2>

            <FormTextArea
                :value="general"
                label="General Message"
                placeholder="Welcoming Message"
                @input="updateValue({ general: $event })"/>

            <FormTextArea
                :value="journal"
                label="Journal Only Message"
                placeholder="Information for super-behind-the scenes"
                @input="updateValue({ journal: $event })"/>

            <FormList
                :value="behind"
                label="Behind the scenes"
                description="What's something that's been worked on?"
                @input="updateValue({ behind: $event })"/>

            <FormList
                :value="beta"
                label="Beta Improvements"
                description="Any improvements to our BETA features this week?"
                @input="updateValue({ beta: $event })"/>

            <FormList
                :value="features"
                label="New Features"
                description="New Features this week"
                @input="updateValue({ features: $event })"/>

            <FormList
                :value="improvements"
                label="UI + Other Improvements"
                description="General Improvements to the system"
                @input="updateValue({ improvements: $event })"/>

            <FormList
                :value="fixes"
                label="Bug Fixes"
                description="Bugs fixed this week"
                @input="updateValue({ fixes: $event })"/>
        </section>

        <section>
            <h2>Output</h2>

            <FormRadio
                :value="outputType"
                :options="outputTypeOptions"
                @input="updateValue({ outputType: $event })"/>

            <Slack
                v-if="outputType === `slack`"
                v-bind="outputProps"
                @output="updateValue({ output: $event })"/>

            <Changelog
                v-if="outputType === `changelog`"
                v-bind="outputProps"
                @output="updateValue({ output: $event })"/>

            <Journal
                v-if="outputType === `journal`"
                v-bind="outputProps"
                ref="journal"/>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Changelog from '@/components/Changelog'
import FormList from '@/components/FormList'
import FormRadio from '@/components/FormRadio'
import FormTextArea from '@/components/FormTextArea'
import Journal from '@/components/Journal'
import Slack from '@/components/Slack'

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
        this.setFooterButtons([
            {
                label: `Reset`,
                classes: [`btn`],
                action: `notes/resetValues`
            },
            {
                label: `Copy`,
                classes: [`btn`, `orange`],
                action: `notes/copy`
            }
        ])
        this.setJournalRef(this.$refs.journal)
    },
    computed: {
        ...mapGetters({
            general: `notes/getGeneral`,
            journal: `notes/getJournal`,
            behind: `notes/getBehind`,
            beta: `notes/getBeta`,
            features: `notes/getFeatures`,
            improvements: `notes/getImprovements`,
            fixes: `notes/getFixes`,
            output: `notes/getOutput`,
            outputType: `notes/getOutputType`,
        }),
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
        ...mapActions({
            setFooterButtons: `setFooterButtons`,
            setJournalRef: `notes/setJournalRef`,
            updateValue: `notes/updateValue`
        })
    }
}
</script>

<style lang="scss" scoped>
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
