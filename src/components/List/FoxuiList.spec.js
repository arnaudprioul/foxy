import { mount } from '@vue/test-utils';
import Foxuilist from './FoxuiList';

describe('Spec Foxuilist', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilist);
		expect(wrapper)
			.toBeTruthy();
	});
});
