import { mount } from '@vue/test-utils';
import Foxyselectioncontrol from './FoxySelectionControl';

describe('Spec Foxyselectioncontrol', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyselectioncontrol);
        expect(wrapper)
            .toBeTruthy();
    });
});
