import { mount } from '@vue/test-utils';
import Foxuidivider from './FoxuiDivider';

describe('Spec Foxuidivider', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidivider);
		expect(wrapper)
			.toBeTruthy();
	});
});
