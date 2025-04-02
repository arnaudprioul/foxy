import { h } from 'vue'

import FoxyAlert from './FoxyAlert.vue'

describe('<FoxyAlert />', () => {
    it('props: text - title', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test'
        }))
    })

    it('props: text - title - prominent', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test'
        }))
    })

    it('props: text - title - closable', () => {
        const onCloseSpy = cy.spy().as('onCloseSpy')
        const onModelValueChangeSpy = cy.spy().as('onModelValueChangeSpy')

        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            closable: true,
            "onClick:close": onCloseSpy,
            "onUpdate:model-value": onModelValueChangeSpy
        }))

        cy.get('[data-cy=close]').click()
        cy.get('@onCloseSpy').should('to.have.been.called', 1)
        cy.get('@onModelValueChangeSpy').should('to.have.been.called', 1)
    })

    it('props: text - title - border', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            border: '1px solid #000'
        }))
    })

    it('props: text - title - padding', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            padding: '8px'
        }))
    })

    it('props: text - title - margin', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            margin: '16px'
        }))
    })

    it('props: text - title - elevation', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            elevation: 2
        }))
    })

    it('props: text - title - rounded - bgColor', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            rounded: true,
            bgColor: '#245678',
            color: '#FFF'
        }))
    })

    it('props: text - title - status(warning)', () => {
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Warning',
            status: 'warning'
        }))
    })

    it('props: text - title - status(success)', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Success',
            status: 'success'
        }))
    })

    it('props: text - title - status(info)', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Info',
            status: 'info'
        }))
    })

    it('props: text - title - status(error)', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Error',
            status: 'error'
        }))
    })

    it('event: onClose', () => {
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            closable: true,
            "onClick:close": onCloseSpy
        }))

        cy.get('[data-cy=close]').click()
        cy.get('@onCloseSpy').should('to.have.been.called', 1)
    })

    it('event: onUpdate:modelValue', () => {
        const onModelValueChangeSpy = cy.spy().as('onModelValueChangeSpy')

        cy.mount(h(FoxyAlert, {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
            title: 'Test',
            closable: true,
            "onUpdate:model-value": onModelValueChangeSpy
        }))

        cy.get('[data-cy=close]').click()
        cy.get('@onModelValueChangeSpy').should('to.have.been.called', 1)
    })
})
