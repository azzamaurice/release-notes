<script>
import { map } from 'lodash-es'

export default {
    name: 'Journal',
    props: {
        general: String,
        journal: String,
        behind: [Array, String],
        beta: [Array, String],
        features: [Array, String],
        improvements: [Array, String],
        fixes: [Array, String]
    },
    render(h) {
        const output = []

        if (this.general) {
            output.push(h(`p`, this.general))
        }

        if (this.journal) {
            output.push(h(`p`, this.journal))
        }

        if (this.behind) {
            output.push(h(`h2`, `Behind the Scenes`))
            output.push(h(`p`, `Behind the scenes, we've been working on the following areas:`))
            output.push(h(`ul`, map(this.behind, i => h(`li`, i))))
        }

        if (this.beta) {
            output.push(h(`h2`, `Beta Improvements`))

            if (this.beta && this.behind) {
                output.push(h(`p`, `We've also made a number of improvements to our existing BETA features, including:`))
            } else {
                output.push(h(`p`, `To start off with, we've made the following improvements to our existing BETA features:`))
            }

            output.push(h(`ul`, map(this.beta, i => h(`li`, i))))
        }

        if (this.features) {
            output.push(h(`h2`, `New Features`))
            output.push(h(`p`, `We're pleased to announce the following new features have been released this week!`))
            output.push(h(`ul`, map(this.features, i => h(`li`, i))))
        }

        if (this.improvements) {
            output.push(h(`h2`, `General Improvements`))
            output.push(h(`p`, `We've made some general improvements to the system this week, including:`))
            output.push(h(`ul`, map(this.improvements, i => h(`li`, i))))
        }

        if (this.fixes) {
            output.push(h(`h2`, `Bug Fixes`))
            output.push(h(`p`, `In addition to the above news, we also fixed the following bugs:`))
            output.push(h(`ul`, map(this.fixes, i => h(`li`, i))))
        }

        return h(`div`, output)
    }
}
</script>
