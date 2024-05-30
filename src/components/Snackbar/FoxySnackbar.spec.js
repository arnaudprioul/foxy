import { mount } from '@vue/test-utils';
import Foxysnackbar from './FoxySnackbar';

describe('Spec Foxysnackbar', function() {
    it('mounts', () => {
        const wrapper = mount(Foxysnackbar);
        expect(wrapper)
            .toBeTruthy();
    });
});
