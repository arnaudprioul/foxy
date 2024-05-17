import { mount } from '@vue/test-utils';
import Foxyautocomplete from './FoxyAutocomplete';

describe('Spec Foxyautocomplete', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyautocomplete);
        expect(wrapper)
            .toBeTruthy();
    });
});
