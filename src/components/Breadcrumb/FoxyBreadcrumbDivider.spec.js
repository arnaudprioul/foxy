import { mount } from '@vue/test-utils';
import Foxybreadcrumbdivider from './FoxyBreadcrumbDivider.vue';

describe('Spec Foxybreadcrumbdivider', function() {
    it('mounts', () => {
        const wrapper = mount(Foxybreadcrumbdivider);
        expect(wrapper)
            .toBeTruthy();
    });
});
