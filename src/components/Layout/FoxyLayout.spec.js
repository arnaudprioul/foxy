import { mount } from '@vue/test-utils';
import Foxylayout from './FoxyLayout';

describe('Spec Foxylayout', function () {
	it('mounts', () => {
		const wrapper = mount(Foxylayout);
		expect(wrapper)
			.toBeTruthy();
	});
});
