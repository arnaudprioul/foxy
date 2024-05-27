import { mount } from '@vue/test-utils';
import Foxybottomnav from './FoxyBottomNav';

describe('Spec Foxybottomnav', function() {
    it('mounts', () => {
        const wrapper = mount(Foxybottomnav);
        expect(wrapper)
            .toBeTruthy();
    });
});
