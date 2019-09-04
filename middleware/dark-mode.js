export default ({ store }) => {
    if (store.getters.getDarkMode) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}
