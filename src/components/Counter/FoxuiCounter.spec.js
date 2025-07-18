import { mount } from '@vue/test-utils';
import Foxuicounter from './FoxuiCounter';

describe('Spec Foxuicounter', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicounter);
		expect(wrapper)
			.toBeTruthy();
	});
});
