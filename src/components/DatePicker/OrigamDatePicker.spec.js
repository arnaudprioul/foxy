import { mount } from '@vue/test-utils';
import Origamdatepicker from './OrigamDatePicker';

describe('Spec Origamdatepicker', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatepicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
