import { mount } from '@vue/test-utils';
import Foxuiloader from './FoxuiLoader';

describe('Spec Foxuiloader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiloader);
		expect(wrapper)
			.toBeTruthy();
	});
});
