import { mount } from '@vue/test-utils';
import Foxyligatureicon from './FoxyLigatureIcon.vue';

describe('Spec Foxyligatureicon', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyligatureicon);
        expect(wrapper)
            .toBeTruthy();
    });
});
