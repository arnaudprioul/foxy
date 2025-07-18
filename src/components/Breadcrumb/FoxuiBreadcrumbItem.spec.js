import { mount } from '@vue/test-utils';
import Foxuibreadcrumbitem from './FoxuiBreadcrumbItem.vue';

describe('Spec Foxuibreadcrumbitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibreadcrumbitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
