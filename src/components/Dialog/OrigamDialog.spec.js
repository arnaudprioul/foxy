import { mount } from '@vue/test-utils';
import Origamdialog from './OrigamDialog';

describe('Spec Origamdialog', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdialog);
		expect(wrapper)
			.toBeTruthy();
	});
});
