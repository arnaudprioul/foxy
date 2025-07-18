import { mount } from '@vue/test-utils';
import Foxywindowytranslate from './FoxyWindowYTranslate.vue';

describe('Spec Foxywindowytranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxywindowytranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
