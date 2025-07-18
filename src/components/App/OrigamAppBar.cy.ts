import { h } from "vue"

import OrigamAppBar from './OrigamAppBar.vue'

describe('<OrigamAppBar />', () => {
    it('props: title', () => {
        cy.mount(h(OrigamAppBar, {
            title: 'Cypress',
            order: 1,
            name: 'appBar'
        }))
    })
})
