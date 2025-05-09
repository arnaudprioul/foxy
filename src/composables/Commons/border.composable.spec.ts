// Composables
import { mount } from "@vue/test-utils"

// Utilities
import { keys } from "ts-transformer-keys"
import type { IBorderProps } from '../../interfaces'
import { useBorder } from './border.composable'

describe('border.ts', () => {
    it('should create border props', () => {
        const wrapper = mount({
            props: keys<IBorderProps>,
            template: '<div/>'
        }, {
            propsData: {border: true}
        })

        expect(wrapper.props().border).toBeDefined()
    })

    it.each([
        // Invalid or empty
        [{}, []],
        [{border: null}, []],
        [{border: 1}, []],
        // Border only
        [{border: true}, ['test--border']],
        [{border: ''}, ['test--border']]
    ] as IBorderProps[])('should have the correct class using %s', (props: IBorderProps, expected: any) => {
        const {borderClasses} = useBorder(props as IBorderProps, 'test')

        expect(borderClasses.value).toEqual(expected)
    })
})
