import { mount } from '@vue/test-utils';
import Foxuiradio from './FoxuiRadio';

describe('Spec Foxuiradio', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiradio);
		expect(wrapper)
			.toBeTruthy();
	});
});
