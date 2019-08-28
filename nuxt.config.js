export default {
    mode: 'spa',
    head: {
        title: 'Release Notes Generator',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Release notes generator' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Alegreya:500|Open+Sans:400,600|Inconsolata&display=swap' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
            { rel: 'manifest', href: '/img/site.webmanifest' }
        ]
    },
    loading: { color: '#fff' },
    css: [
        'normalize.css',
        '@/assets/styles/styles.scss'
    ],
    plugins: [],
    buildModules: [],
    modules: []
}
