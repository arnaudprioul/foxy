import { mount } from '@vue/test-utils';
import Foxypagebuilder from './FoxyPageBuilder';

describe('Spec Foxypagebuilder', function () {
	it('mounts', () => {
		const wrapper = mount(Foxypagebuilder);
		expect(wrapper)
			.toBeTruthy();
	});
});
