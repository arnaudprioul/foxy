import { mount } from '@vue/test-utils';
import Origamdialogconfirmation from './OrigamDialogConfirmation.vue';

describe('Spec Origamdialogconfirmation', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdialogconfirmation);
		expect(wrapper)
			.toBeTruthy();
	});
});
