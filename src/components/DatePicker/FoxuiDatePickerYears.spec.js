import { mount } from '@vue/test-utils';
import Foxuidatepickeryears from './FoxuiDatePickerYears';

describe('Spec Foxuidatepickeryears', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatepickeryears);
		expect(wrapper)
			.toBeTruthy();
	});
});
