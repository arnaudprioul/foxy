import { mount } from '@vue/test-utils';
import Foxuiselectioncontrol from './FoxuiSelectionControl';

describe('Spec Foxuiselectioncontrol', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiselectioncontrol);
		expect(wrapper)
			.toBeTruthy();
	});
});
