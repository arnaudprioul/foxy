import { mount } from '@vue/test-utils';
import Foxyprogress from './FoxyProgress';

describe('Spec Foxyprogress', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyprogress);
        expect(wrapper)
            .toBeTruthy();
    });
});
