<script>
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
        const general = h(`p`, this.general)
        const journal = h(`p`, this.journal)

        return h(`div`, [general, journal])
    }
}
</script>
