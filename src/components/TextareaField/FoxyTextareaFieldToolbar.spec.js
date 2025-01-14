import { mount } from '@vue/test-utils';
import Foxytextareafieldtoolbar from './FoxyTextareaFieldToolbar';

describe('Spec Foxytextareafieldtoolbar', function() {
    it('mounts', () => {
        const wrapper = mount(Foxytextareafieldtoolbar);
        expect(wrapper)
            .toBeTruthy();
    });
});
