import { mount } from '@vue/test-utils';
import Foxydivider from './FoxyDivider';

describe('Spec Foxydivider', function() {
    it('mounts', () => {
        const wrapper = mount(Foxydivider);
        expect(wrapper)
            .toBeTruthy();
    });
});
