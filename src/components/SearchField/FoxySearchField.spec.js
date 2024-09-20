import { mount } from '@vue/test-utils';
import Foxysearchfield from './FoxySearchField';

describe('Spec Foxysearchfield', function() {
    it('mounts', () => {
        const wrapper = mount(Foxysearchfield);
        expect(wrapper)
            .toBeTruthy();
    });
});
