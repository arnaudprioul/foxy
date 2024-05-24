import { mount } from '@vue/test-utils';
import Foxyexpansionpanel from './FoxyExpansionPanel';

describe('Spec Foxyexpansionpanel', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyexpansionpanel);
        expect(wrapper)
            .toBeTruthy();
    });
});
