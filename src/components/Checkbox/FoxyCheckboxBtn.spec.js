import { mount } from '@vue/test-utils';
import Foxycheckboxbtn from './FoxyCheckboxBtn.vue';

describe('Spec Foxycheckboxbtn', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycheckboxbtn);
		expect(wrapper)
			.toBeTruthy();
	});
});
