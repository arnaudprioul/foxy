import { mount } from '@vue/test-utils';
import Foxydialogconfirmation from './FoxyDialogConfirmation.vue';

describe('Spec Foxydialogconfirmation', function() {
    it('mounts', () => {
        const wrapper = mount(Foxydialogconfirmation);
        expect(wrapper)
            .toBeTruthy();
    });
});
