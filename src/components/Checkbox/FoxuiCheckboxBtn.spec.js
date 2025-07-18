import { mount } from '@vue/test-utils';
import Foxuicheckboxbtn from './FoxuiCheckboxBtn.vue';

describe('Spec Foxuicheckboxbtn', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicheckboxbtn);
		expect(wrapper)
			.toBeTruthy();
	});
});
