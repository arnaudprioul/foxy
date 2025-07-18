import { mount } from '@vue/test-utils';
import Origamdatatable from './OrigamDataTable';

describe('Spec Origamdatatable', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatable);
		expect(wrapper)
			.toBeTruthy();
	});
});
