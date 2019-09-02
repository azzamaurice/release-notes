<template>
    <pre>{{ output }}</pre>
</template>

<script>
import { each } from 'lodash-es'

export default {
    name: 'Changelog',
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
            let output = []

            if (this.general && this.general.length) {
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

                each(this.behind, item => {
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

                each(this.beta, item => {
                    output.push(`- ${item}`)
                })

                output.push(``)
            }

            if (this.features.length) {
                output.push(
                    `*New Features*`,
                    `We're pleased to announce the following new features have been released this week!`
                )

                each(this.features, item => {
                    output.push(`- ${item}`)
                })

                output.push(``)
            }

            if (this.improvements.length) {
                output.push(
                    `*General Improvements*`,
                    `We've made some general improvements to the system this week, including:`
                )

                each(this.improvements, item => {
                    output.push(`- ${item}`)
                })

                output.push(``)
            }

            if (this.fixes.length) {
                output.push(
                    `*Bug Fixes*`,
                    `In addition to the above news, we also fixed the following bugs:`
                )

                each(this.fixes, item => {
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
