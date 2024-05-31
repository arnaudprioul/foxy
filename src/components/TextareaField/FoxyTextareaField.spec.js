import { mount } from '@vue/test-utils';
import Foxytextareafield from './FoxyTextareaField';

describe('Spec Foxytextareafield', function() {
    it('mounts', () => {
        const wrapper = mount(Foxytextareafield);
        expect(wrapper)
            .toBeTruthy();
    });
});
