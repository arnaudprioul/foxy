import { mount } from '@vue/test-utils';
import Foxymessages from './FoxyMessages';

describe('Spec Foxymessages', function() {
    it('mounts', () => {
        const wrapper = mount(Foxymessages);
        expect(wrapper)
            .toBeTruthy();
    });
});
