import { mount } from '@vue/test-utils';
import Foxuidatepicker from './FoxuiDatePicker';

describe('Spec Foxuidatepicker', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatepicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
