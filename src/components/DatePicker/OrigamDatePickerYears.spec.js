import { mount } from '@vue/test-utils';
import Origamdatepickeryears from './OrigamDatePickerYears';

describe('Spec Origamdatepickeryears', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatepickeryears);
		expect(wrapper)
			.toBeTruthy();
	});
});
