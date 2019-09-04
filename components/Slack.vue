<template>
    <pre>{{ output }}</pre>
</template>

<script>
import { compact, each, isEmpty } from 'lodash-es'

export default {
    name: 'Slack',
    props: {
        general: [String],
        behind: [Array],
        beta: [Array],
        features: [Array],
        improvements: [Array],
        fixes: [Array]
    },
    mounted() {
        this.$emit(`output`, this.output)
    },
    computed: {
        output() {
            let output = [
                `Hey @channel!`,
                `Time for another weekly ChMS update!`,
                ``
            ]

            if (!isEmpty(this.general)) {
                output.push(
                    `${this.general}`,
                    ``
                )
            }

            if (this.behind.length) {
                output.push(
                    `*Behind the Scenes*`,
                    `Behind the scenes, we've been working on the following areas:`
                )

                each(compact(this.behind), item => {
                    output.push(`- ${item}`)
                })

                output.push(
                    `Stay tuned to hear more about these as part of a future update!`,
                    ``
                )
            }

            if (this.beta.length) {
                output.push(`*Beta Improvements*`)

                if (this.beta.length && this.behind.length) {
                    output.push(`We've also made a number of improvements to our existing BETA features, including:`)
                } else {
                    output.push(`To start off with, we've made the following improvements to our existing BETA features:`)
                }

                each(compact(this.beta), item => {
                    output.push(`- ${item}`)
                })

                output.push(``)
            }

            if (this.features.length) {
                output.push(
                    `*New Features*`,
                    `We're pleased to announce the following new features have been released this week!`
                )

                each(compact(this.features), item => {
                    output.push(`- ${item}`)
                })

                output.push(``)
            }

            if (this.improvements.length) {
                output.push(
                    `*General Improvements*`,
                    `We've made some general improvements to the system this week, including:`
                )

                each(compact(this.improvements), item => {
                    output.push(`- ${item}`)
                })

                output.push(``)
            }

            if (this.fixes.length) {
                output.push(
                    `*Bug Fixes*`,
                    `In addition to the above news, we also fixed the following bugs:`
                )

                each(compact(this.fixes), item => {
                    output.push(`- ${item}`)
                })
            }

            return output.join(`\n`)
        }
    },
    watch: {
        output(value) {
            this.$emit(`output`, value)
        }
    }
}
</script>
