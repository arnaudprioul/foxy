import { mount } from '@vue/test-utils';
import Foxydialog from './FoxyDialog';

describe('Spec Foxydialog', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydialog);
		expect(wrapper)
			.toBeTruthy();
	});
});
