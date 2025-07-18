import { mount } from '@vue/test-utils';
import Foxuibreadcrumbdivider from './FoxuiBreadcrumbDivider.vue';

describe('Spec Foxuibreadcrumbdivider', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibreadcrumbdivider);
		expect(wrapper)
			.toBeTruthy();
	});
});
