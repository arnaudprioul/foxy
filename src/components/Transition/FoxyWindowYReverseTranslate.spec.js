import { mount } from '@vue/test-utils';
import Foxywindowyreversetranslate from './FoxyWindowYReverseTranslate.vue';

describe('Spec Foxywindowyreversetranslate', function() {
    it('mounts', () => {
        const wrapper = mount(Foxywindowyreversetranslate);
        expect(wrapper)
            .toBeTruthy();
    });
});
