import { mount } from '@vue/test-utils';
import Foxuiselect from './FoxuiSelect';

describe('Spec Foxuiselect', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiselect);
		expect(wrapper)
			.toBeTruthy();
	});
});
