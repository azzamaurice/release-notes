export const state = () => ({
    footerButtons: []
})

export const getters = {
    getFooterButtons(state) {
        return state.footerButtons
    }
}

export const actions = {
    setFooterButtons({ commit }, buttons) {
        commit('SET_FOOTER_BUTTONS', buttons)
    }
}

export const mutations = {
    SET_FOOTER_BUTTONS(state, buttons) {
        state.footerButtons = buttons
    }
}
