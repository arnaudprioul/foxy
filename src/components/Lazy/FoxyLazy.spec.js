import { mount } from '@vue/test-utils';
import Foxylazy from './FoxyLazy';

describe('Spec Foxylazy', function() {
    it('mounts', () => {
        const wrapper = mount(Foxylazy);
        expect(wrapper)
            .toBeTruthy();
    });
});
