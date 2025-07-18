import { mount } from '@vue/test-utils';
import Foxuitranslatebottom from './FoxuiTranslateBottom.vue';

describe('Spec Foxuitranslatebottom', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuitranslatebottom);
		expect(wrapper)
			.toBeTruthy();
	});
});
