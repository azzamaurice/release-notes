<template>
    <div class="form-list">
        <div v-if="label" class="label">{{ label }}</div>
        <p v-if="description">{{ description }}</p>

        <Draggable
            v-model="list"
            v-bind="draggableOptions">
            <li v-for="(note, index) in list">
                <div class="drag">
                    <Icon icon="arrows-alt"/>
                </div>

                <input
                    ref="input"
                    type="text"
                    :value="list[index]"
                    :key="index"
                    @input="update(index, $event)"
                    @keyup.enter="add(index)">

                <button
                    class="remove"
                    @click="remove(index)">
                    <Icon icon="trash-alt"/>
                </button>
            </li>
        </Draggable>

        <button
            class="add"
            @click="add">
            Add
            <Icon icon="plus"/>
        </button>
    </div>
</template>

<script>
import { cloneDeep, last, reject } from 'lodash-es'
import Draggable from 'vuedraggable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowsAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome'

library.add(faArrowsAlt, faPlus, faTrashAlt)

export default {
    name: 'FormList',
    components: {
        Draggable,
        Icon
    },
    props: {
        value: {
            type: Array,
            default() {
                return []
            }
        },
        label: String,
        description: String
    },
    data() {
        return {
            list: this.value
        }
    },
    computed: {
        /**
         * Sets draggable options
         *
         * @returns {object}
         */
        draggableOptions() {
            return {
                chosenClass: `chosen`,
                ghostClass: `ghost`,
                handle: `.drag`,
                tag: `ul`
            }
        }
    },
    methods: {
        /**
         * Add item
         *
         * @param {number} [index]
         */
        add(index = -1) {
            const list = cloneDeep(this.value)

            if (isNaN(index) || index < 0) {
                list.push(``)

                setTimeout(() => {
                    last(this.$refs.input).focus()
                }, 10)
            } else {
                list.splice(index + 1, 0, ``)

                setTimeout(() => {
                    this.$refs.input[index + 1].focus()
                }, 10)
            }

            this.$emit(`input`, list)
        },
        /**
         * Edit item
         *
         * @param {number} index
         * @param {object} event
         * @param {object} event.target
         */
        update(index, { target }) {
            const list = cloneDeep(this.value)

            list[index] = target.value

            this.$emit(`input`, list)
        },
        /**
         * Removes item based on index
         *
         * @param {number} index
         */
        remove(index) {
            let list = reject(this.value, (item, i) => {
                return i === index
            })

            this.$emit(`input`, list)
        }
    },
    watch: {
        value(list) {
            this.list = list
        },
        list(list) {
            this.$emit(`input`, list)
        }
    }
}
</script>

<style lang="scss" scoped>
.form-list {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.label {
    font-weight: var(--heading-font-weight);
    margin-bottom: 0.5rem;
}

p {
    margin: 0 0 0.5rem;
    color: var(--grey);
    font-style: italic;
}

ul {
    margin: 0 0 0.5rem;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: var(--radius);
}

.drag {
    flex: 0;
    color: gray;
    cursor: move;
}

.remove {
    flex: 0 0 2rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    padding: 0;
    color: var(--red);
    background: none;
    border: none;
    cursor: pointer;
}

input {
    flex: 1;
    margin: 0 0.5rem;
}

.add {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    color: white;
    background: var(--green);
    border: none;
    border-radius: 2px;
    font-size: 0.75rem;

    [data-icon] {
        margin-left: 0.5rem;
    }
}

.chosen {
    background-color: var(--grey-pale);
}

.ghost {
    background-color: var(--green-pale);

    > * {
        opacity: 0;
    }
}
</style>
