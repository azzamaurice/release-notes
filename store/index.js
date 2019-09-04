import Storage from 'local-storage'
import { merge } from 'lodash-es'

export const state = () => ({
    darkMode: Storage.get(`global`).darkMode || false,
    footerButtons: []
})

export const getters = {
    getFooterButtons(state) {
        return state.footerButtons
    },
    getDarkMode(state) {
        return state.darkMode
    }
}

export const actions = {
    setFooterButtons({ commit }, buttons) {
        commit(`SET_FOOTER_BUTTONS`, buttons)
    },
    footerAction({ dispatch }, action) {
        dispatch(action, { root: true })
    },
    toggleDarkMode({ commit, state }) {
        const mode = !state.darkMode

        Storage.set(`global`, merge(Storage.get(`global`), { darkMode: mode }))

        if (mode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        commit(`TOGGLE_DARK_MODE`, mode)
    }
}

export const mutations = {
    SET_FOOTER_BUTTONS(state, buttons) {
        state.footerButtons = buttons
    },
    TOGGLE_DARK_MODE(state, mode) {
        console.log({ darkMode: mode })
        state.darkMode = mode
    }
}
