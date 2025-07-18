import { mount } from '@vue/test-utils';
import Origamselectioncontrol from './OrigamSelectionControl';

describe('Spec Origamselectioncontrol', function () {
	it('mounts', () => {
		const wrapper = mount(Origamselectioncontrol);
		expect(wrapper)
			.toBeTruthy();
	});
});
