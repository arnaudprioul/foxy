import { mount } from '@vue/test-utils';
import Foxyfield from './FoxyField.vue';

describe('Spec Foxyfield', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyfield);
        expect(wrapper)
            .toBeTruthy();
    });
});
