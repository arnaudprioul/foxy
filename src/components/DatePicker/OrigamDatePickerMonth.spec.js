import { mount } from '@vue/test-utils';
import Origamdatepickermonth from './OrigamDatePickerMonth';

describe('Spec Origamdatepickermonth', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatepickermonth);
		expect(wrapper)
			.toBeTruthy();
	});
});
