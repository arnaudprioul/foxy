import { h } from 'vue'

import FoxyAlert from './FoxyAlert.vue'

describe('<FoxyAlert />', () => {
    it('Base render', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
        }))
    })

    it('render with title', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test'
        }))
    })

    it('render with status: warning', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Warning',
            status: 'warning'
        }))
    })

    it('render with status: success', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Success',
            status: 'success'
        }))
    })

    it('render with status: info', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Info',
            status: 'info'
        }))
    })

    it('render with status: error', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Error',
            status: 'error'
        }))
    })
})
