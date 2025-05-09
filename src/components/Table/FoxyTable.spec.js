import { mount } from '@vue/test-utils';
import Foxytable from './FoxyTable';

describe('Spec Foxytable', function () {
	it('mounts', () => {
		const wrapper = mount(Foxytable);
		expect(wrapper)
			.toBeTruthy();
	});
});
