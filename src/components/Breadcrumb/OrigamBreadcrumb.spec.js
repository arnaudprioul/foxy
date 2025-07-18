import { mount } from '@vue/test-utils';
import Origambreadcrumb from './OrigamBreadcrumb';

describe('Spec Origambreadcrumb', function () {
	it('mounts', () => {
		const wrapper = mount(Origambreadcrumb);
		expect(wrapper)
			.toBeTruthy();
	});
});
