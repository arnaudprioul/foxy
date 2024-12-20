import {mount} from '@vue/test-utils';
import Foxydatatitle from './FoxyDataTitle.vue';

describe('Spec Foxydatatitle', function () {
    it('mounts', () => {
        const wrapper = mount(Foxydatatitle);
        expect(wrapper)
            .toBeTruthy();
    });
});
