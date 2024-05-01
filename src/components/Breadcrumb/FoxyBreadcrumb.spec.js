import { mount } from '@vue/test-utils';
import Foxybreadcrumb from './FoxyBreadcrumb';

describe('Spec Foxybreadcrumb', function() {
    it('mounts', () => {
        const wrapper = mount(Foxybreadcrumb);
        expect(wrapper)
            .toBeTruthy();
    });
});
