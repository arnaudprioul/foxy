import { mount } from '@vue/test-utils';
import OrigamdatepickerControls from './OrigamDatePickerControls';

describe('Spec OrigamdatepickerControls', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamdatepickerControls);
		expect(wrapper)
			.toBeTruthy();
	});
});
