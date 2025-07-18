import { mount } from '@vue/test-utils';
import Foxyradio from './FoxyRadio';

describe('Spec Foxyradio', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyradio);
		expect(wrapper)
			.toBeTruthy();
	});
});
