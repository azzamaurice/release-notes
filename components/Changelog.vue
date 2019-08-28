<template>
    <pre>{{ output }}</pre>
</template>

<script>
import { each } from 'lodash-es'

export default {
    name: 'Slack',
    props: {
        general: String,
        behind: [Array, String],
        beta: [Array, String],
        features: [Array, String],
        improvements: [Array, String],
        fixes: [Array, String]
    },
    computed: {
        output() {
            let output = ``

            if (this.general) {
                output += `${this.general}\n`
            }

            output += `\n`

            if (this.behind) {
                output += `*Behind the Scenes*
Behind the scenes, we've been working on the following areas:\n`

                each(this.behind, item => {
                    output += `- ${item}\n`
                })

                output += `Stay tuned to hear more about these as part of a future update!\n\n`
            }

            if (this.beta) {
                output += `*Beta Improvements*\n`

                if (this.beta && this.behind) {
                    output += `We've also made a number of improvements to our existing BETA features, including:\n`
                } else {
                    output += `To start off with, we've made the following improvements to our existing BETA features:\n`
                }

                each(this.beta, item => {
                    output += `- ${item}\n`
                })

                output += `\n`
            }

            if (this.features) {
                output += `*New Features*
We're pleased to announce the following new features have been released this week!\n`

                each(this.features, item => {
                    output += `- ${item}\n`
                })

                output += `\n`
            }

            if (this.improvements) {
                output += `*General Improvements*
We've made some general improvements to the system this week, including:\n`

                each(this.improvements, item => {
                    output += `- ${item}\n`
                })

                output += `\n`
            }

            if (this.fixes) {
                output += `*Bug Fixes*
In addition to the above news, we also fixed the following bugs:\n`

                each(this.fixes, item => {
                    output += `- ${item}\n`
                })
            }

            return output
        }
    }
}
</script>
