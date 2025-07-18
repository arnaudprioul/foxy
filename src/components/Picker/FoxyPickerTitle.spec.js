import { mount } from '@vue/test-utils';
import Foxypickertitle from './FoxyPickerTitle';

describe('Spec Foxypickertitle', function () {
	it('mounts', () => {
		const wrapper = mount(Foxypickertitle);
		expect(wrapper)
			.toBeTruthy();
	});
});
