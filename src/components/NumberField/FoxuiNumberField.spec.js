import { mount } from '@vue/test-utils';
import Foxuinumberfield from './FoxuiNumberField';

describe('Spec Foxuinumberfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuinumberfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
