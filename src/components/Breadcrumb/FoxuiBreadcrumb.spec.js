import { mount } from '@vue/test-utils';
import Foxuibreadcrumb from './FoxuiBreadcrumb';

describe('Spec Foxuibreadcrumb', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibreadcrumb);
		expect(wrapper)
			.toBeTruthy();
	});
});
