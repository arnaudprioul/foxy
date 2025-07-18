import { mount } from '@vue/test-utils';
import Foxuilazy from './FoxuiLazy';

describe('Spec Foxuilazy', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilazy);
		expect(wrapper)
			.toBeTruthy();
	});
});
