import { mount } from '@vue/test-utils';
import Origamselect from './OrigamSelect';

describe('Spec Origamselect', function () {
	it('mounts', () => {
		const wrapper = mount(Origamselect);
		expect(wrapper)
			.toBeTruthy();
	});
});
