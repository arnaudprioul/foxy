import { mount } from '@vue/test-utils';
import Foxuisheet from './FoxuiSheet';

describe('Spec Foxuisheet', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuisheet);
		expect(wrapper)
			.toBeTruthy();
	});
});
