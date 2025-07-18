import { mount } from '@vue/test-utils';
import Origamdatepickerheader from './OrigamDatePickerHeader';

describe('Spec Origamdatepickerheader', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatepickerheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
