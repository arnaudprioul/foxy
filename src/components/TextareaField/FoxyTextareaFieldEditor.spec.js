import { mount } from '@vue/test-utils';
import Foxytextareafieldeditor from './FoxyTextareaFieldEditor';

describe('Spec Foxytextareafieldeditor', function() {
    it('mounts', () => {
        const wrapper = mount(Foxytextareafieldeditor);
        expect(wrapper)
            .toBeTruthy();
    });
});
