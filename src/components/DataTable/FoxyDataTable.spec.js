import { mount } from '@vue/test-utils';
import Foxydatatable from './FoxyDataTable';

describe('Spec Foxydatatable', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatatable);
		expect(wrapper)
			.toBeTruthy();
	});
});
