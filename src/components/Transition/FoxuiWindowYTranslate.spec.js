import { mount } from '@vue/test-utils';
import Foxuiwindowytranslate from './FoxuiWindowYTranslate.vue';

describe('Spec Foxuiwindowytranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiwindowytranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
