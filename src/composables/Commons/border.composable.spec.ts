// Composables
import { useBorder } from '@origam/composables'

// Utilities
import type { IBorderProps } from '@origam/interfaces'

describe('border.ts', () => {
    it.each([
        // Invalid or empty
        [{}, {class: [], styles: []}],
        [{border: null}, {class: [], styles: []}],
        // Border number triggering parsing style
        [{border: 1}, {class: [], styles: ['border-width: 1px']}],
        // Border string triggering parsing style
        [{border: '4px'}, {
            class: [],
            styles: ['border-width: 4px', 'border-style: solid', 'border-color: currentColor']
        }],
        [{border: '8px dashed'}, {
            class: [],
            styles: ['border-width: 8px', 'border-style: dashed', 'border-color: currentColor']
        }],
        [{border: '16px #6fb8f2'}, {
            class: [],
            styles: ['border-width: 16px', 'border-style: solid', 'border-color: #6fb8f2']
        }],
        [{border: '0 10px 0 0'}, {
            class: [],
            styles: ['border-block-start-width: 0', 'border-block-end-width: 0', 'border-inline-start-width: 10px', 'border-inline-end-width: 0', 'border-style: solid', 'border-color: currentColor']
        }],
        // Border Boolean triggering class
        [{border: true}, {class: ['test--border'], styles: []}],
        [{border: ''}, {class: ['test--border'], styles: []}]
    ] as IBorderProps[])('should have the correct classes & styles using %s', (props: IBorderProps, expected: any) => {
        const {borderClasses, borderStyles} = useBorder(props as IBorderProps, 'test')

        expect(borderStyles.value).toEqual(expected.styles)
        expect(borderClasses.value).toEqual(expected.class)
    })
})
