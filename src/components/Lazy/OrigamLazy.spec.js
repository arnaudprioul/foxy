import { mount } from '@vue/test-utils';
import Origamlazy from './OrigamLazy';

describe('Spec Origamlazy', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlazy);
		expect(wrapper)
			.toBeTruthy();
	});
});
