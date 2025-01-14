import { mount } from '@vue/test-utils';
import Foxycode from './FoxyCode';

describe('Spec Foxycode', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycode);
        expect(wrapper)
            .toBeTruthy();
    });
});
