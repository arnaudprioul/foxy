import { mount } from '@vue/test-utils';
import Foxuioverlay from './FoxuiOverlay';

describe('Spec Foxuioverlay', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuioverlay);
		expect(wrapper)
			.toBeTruthy();
	});
});
