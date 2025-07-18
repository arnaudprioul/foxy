import { mount } from '@vue/test-utils';
import FoxuidatepickerControls from './FoxuiDatePickerControls';

describe('Spec FoxuidatepickerControls', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuidatepickerControls);
		expect(wrapper)
			.toBeTruthy();
	});
});
