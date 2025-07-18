import { mount } from '@vue/test-utils';
import Foxuitable from './FoxuiTable';

describe('Spec Foxuitable', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuitable);
		expect(wrapper)
			.toBeTruthy();
	});
});
