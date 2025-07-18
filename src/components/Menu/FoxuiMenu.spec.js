import { mount } from '@vue/test-utils';
import Foxuimenu from './FoxuiMenu';

describe('Spec Foxuimenu', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuimenu);
		expect(wrapper)
			.toBeTruthy();
	});
});
