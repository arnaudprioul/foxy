import { mount } from '@vue/test-utils';
import Origamcheckboxbtn from './OrigamCheckboxBtn.vue';

describe('Spec Origamcheckboxbtn', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcheckboxbtn);
		expect(wrapper)
			.toBeTruthy();
	});
});
