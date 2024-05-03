import { mount } from '@vue/test-utils';
import Foxywindowxtranslate from './FoxyWindowXTranslate.vue';

describe('Spec Foxywindowxtranslate', function() {
    it('mounts', () => {
        const wrapper = mount(Foxywindowxtranslate);
        expect(wrapper)
            .toBeTruthy();
    });
});
