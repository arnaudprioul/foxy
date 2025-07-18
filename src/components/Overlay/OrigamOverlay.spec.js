import { mount } from '@vue/test-utils';
import Origamoverlay from './OrigamOverlay';

describe('Spec Origamoverlay', function () {
	it('mounts', () => {
		const wrapper = mount(Origamoverlay);
		expect(wrapper)
			.toBeTruthy();
	});
});
