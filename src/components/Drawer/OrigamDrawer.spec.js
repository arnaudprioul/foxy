import { mount } from '@vue/test-utils';
import Origamdrawer from './OrigamDrawer';

describe('Spec Origamdrawer', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdrawer);
		expect(wrapper)
			.toBeTruthy();
	});
});
