import { mount } from '@vue/test-utils';
import Foxuidialog from './FoxuiDialog';

describe('Spec Foxuidialog', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidialog);
		expect(wrapper)
			.toBeTruthy();
	});
});
