import { mount } from '@vue/test-utils';
import Origambreadcrumbdivider from './OrigamBreadcrumbDivider.vue';

describe('Spec Origambreadcrumbdivider', function () {
	it('mounts', () => {
		const wrapper = mount(Origambreadcrumbdivider);
		expect(wrapper)
			.toBeTruthy();
	});
});
