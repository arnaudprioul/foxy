import { mount } from '@vue/test-utils';
import Foxuidialogconfirmation from './FoxuiDialogConfirmation.vue';

describe('Spec Foxuidialogconfirmation', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidialogconfirmation);
		expect(wrapper)
			.toBeTruthy();
	});
});
