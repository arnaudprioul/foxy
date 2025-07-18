import { mount } from '@vue/test-utils';
import Foxuiicon from './FoxuiIcon';

describe('Spec Foxuiicon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
