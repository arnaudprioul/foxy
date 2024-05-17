import { mount } from '@vue/test-utils';
import Foxyselect from './FoxySelect';

describe('Spec Foxyselect', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyselect);
        expect(wrapper)
            .toBeTruthy();
    });
});
