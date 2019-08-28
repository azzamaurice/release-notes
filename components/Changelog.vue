<template>
    <pre>{{ output }}</pre>
</template>

<script>
    import { each } from 'lodash-es'

    export default {
        name: 'Slack',
        props: {
            general: [String, Boolean],
            behind: [Array, String, Boolean],
            beta: [Array, String, Boolean],
            features: [Array, String, Boolean],
            improvements: [Array, String, Boolean],
            fixes: [Array, String, Boolean]
        },
        computed: {
            output() {
                let output = []

                if (this.general) {
                    output.push(`${this.general}`)
                }

                output.push(``)

                if (this.behind) {
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

                if (this.beta) {
                    output.push(`*Beta Improvements*`)

                    if (this.beta && this.behind) {
                        output.push(`We've also made a number of improvements to our existing BETA features, including:`)
                    } else {
                        output.push(`To start off with, we've made the following improvements to our existing BETA features:`)
                    }

                    each(this.beta, item => {
                        output.push(`- ${item}`)
                    })

                    output.push(``)
                }

                if (this.features) {
                    output.push(
                        `*New Features*`,
                        `We're pleased to announce the following new features have been released this week!`
                    )

                    each(this.features, item => {
                        output.push(`- ${item}`)
                    })

                    output.push(``)
                }

                if (this.improvements) {
                    output.push(
                        `*General Improvements*`,
                        `We've made some general improvements to the system this week, including:`
                    )

                    each(this.improvements, item => {
                        output.push(`- ${item}`)
                    })

                    output.push(``)
                }

                if (this.fixes) {
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
