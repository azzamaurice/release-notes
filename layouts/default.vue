<template>
    <div class="body" :class="{ standalone }">
        <header>
            <h1>Release Notes</h1>
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

export default {
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
            buttons: `getFooterButtons`
        })
    },
    methods: {
        ...mapActions({
            action: `footerAction`
        })
    }
}
</script>

<style lang="scss" scoped>
.body {
    --section-shadow: 0 0 4px hsla(0, 0%, 50%, 0.5);
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
    background-color: white;
}

header {
    padding: var(--header-footer-padding);
    color: white;
    background: var(--orange);
    box-shadow: var(--section-shadow);

    h1 {
        margin: 0;
    }
}

footer {
    display: flex;
    justify-content: flex-end;
    padding: var(--header-footer-padding);
    background-color: var(--beige);
    box-shadow: var(--section-shadow);

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
