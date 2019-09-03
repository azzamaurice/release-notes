import Copy from 'copy-to-clipboard'
import Storage from 'local-storage'
import { merge } from 'lodash-es'

const defaultState = {
    general: null,
    journal: null,
    behind: [],
    beta: [],
    features: [],
    improvements: [],
    fixes: [],
    output: null,
    outputType: `slack`
}

export const state = () => ({
    ...merge(Storage.get(`notes`), defaultState),
    journalRef: null
})

export const getters = {
    getGeneral(state) {
        return state.general
    },
    getJournal(state) {
        return state.journal
    },
    getBehind(state) {
        return state.behind
    },
    getBeta(state) {
        return state.beta
    },
    getFeatures(state) {
        return state.features
    },
    getImprovements(state) {
        return state.improvements
    },
    getFixes(state) {
        return state.fixes
    },
    getOutput(state) {
        return state.output
    },
    getOutputType(state) {
        return state.outputType
    }
}

export const actions = {
    setJournalRef({ commit }, ref) {
        commit(`SET_JOURNAL_REF`, ref)
    },
    updateValue({ commit }, data) {
        Storage.set(`notes`, merge(Storage.get(`notes`), data))

        commit(`UPDATE_VALUE`, data)
    },
    resetValues({ commit }) {
        commit(`RESET_VALUES`)
    },
    copy({ state }) {
        if (state.outputType === `journal`) {
            Copy(state.journalRef.$el.innerHTML, { format: `text/html` })
        } else {
            Copy(state.output)
        }
    }
}

export const mutations = {
    SET_JOURNAL_REF(state, ref) {
        state.journalRef = ref
    },
    UPDATE_VALUE(state, data) {
        state = merge(state, data)
    },
    RESET_VALUES(state) {
        Object.assign(state, defaultState)
    }
}
