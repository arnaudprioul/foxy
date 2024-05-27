import { mount } from '@vue/test-utils';
import Foxymenu from './FoxyMenu';

describe('Spec Foxymenu', function() {
    it('mounts', () => {
        const wrapper = mount(Foxymenu);
        expect(wrapper)
            .toBeTruthy();
    });
});
