import { mount } from '@vue/test-utils';
import Foxydrawer from './FoxyDrawer';

describe('Spec Foxydrawer', function() {
    it('mounts', () => {
        const wrapper = mount(Foxydrawer);
        expect(wrapper)
            .toBeTruthy();
    });
});
