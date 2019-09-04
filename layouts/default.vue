<template>
    <div class="body" :class="{ standalone }">
        <header>
            <h1>Release Notes</h1>

            <button @click="toggleDarkMode">
                <Icon :icon="darkMode ? `sun` : `moon`"/>
            </button>
        </header>

        <nuxt class="main"/>

        <footer v-if="buttons.length">
            <button
                v-for="button in buttons"
                :class="button.classes"
                @click="action(button.action)">
                {{ button.label }}
            </button>
        </footer>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome'

library.add(faMoon, faSun)

export default {
    components: {
        Icon
    },
    data() {
        return {
            standalone: false
        }
    },
    created() {
        this.standalone = window.navigator.standalone || false
    },
    computed: {
        ...mapGetters({
            buttons: `getFooterButtons`,
            darkMode: `getDarkMode`
        })
    },
    methods: {
        ...mapActions({
            action: `footerAction`,
            toggleDarkMode: `toggleDarkMode`
        })
    }
}
</script>

<style lang="scss" scoped>
.body {
    --header-footer-padding: 0.5rem;

    @media (max-width: 767px) {
        &.standalone {
            --header-footer-padding: 0.5rem 0.5rem 2rem;
        }
    }

    @media (min-width: 768px) {
        --header-footer-padding: 1rem;
        --main-display: flex;
        --main-overflow: hidden;
    }
}

.body {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: var(--body-color);
    background-color: var(--body-background);
}

header {
    display: flex;
    padding: var(--header-footer-padding);
    color: var(--header-color);
    background: var(--header-background);

    h1 {
        margin: 0;
    }

    button {
        margin-left: auto;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        padding: 0;
        font-size: 1rem;
        color: white;
        background: none;
        border: none;
        outline: none;
    }
}

footer {
    display: flex;
    justify-content: flex-end;
    padding: var(--header-footer-padding);
    background-color: var(--footer-background);

    button {
        & + button {
            margin-left: 0.5rem;

            @media (min-width: 768px) {
                margin-left: 1rem;
            }
        }
    }
}

.main {
    display: var(--main-display);
    flex: 1;
    overflow: var(--main-overflow, scroll);
}
</style>
