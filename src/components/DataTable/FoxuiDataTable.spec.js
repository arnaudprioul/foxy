import { mount } from '@vue/test-utils';
import Foxuidatatable from './FoxuiDataTable';

describe('Spec Foxuidatatable', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatable);
		expect(wrapper)
			.toBeTruthy();
	});
});
