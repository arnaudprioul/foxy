import { mount } from '@vue/test-utils';
import Foxuilayout from './FoxuiLayout';

describe('Spec Foxuilayout', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilayout);
		expect(wrapper)
			.toBeTruthy();
	});
});
