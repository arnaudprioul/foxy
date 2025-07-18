import { mount } from '@vue/test-utils';
import Foxuiprogress from './FoxuiProgress';

describe('Spec Foxuiprogress', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiprogress);
		expect(wrapper)
			.toBeTruthy();
	});
});
