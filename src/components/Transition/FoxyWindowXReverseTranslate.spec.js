import { mount } from '@vue/test-utils';
import Foxywindowxreversetranslate from './FoxyWindowXReverseTranslate.vue';

describe('Spec Foxywindowxreversetranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxywindowxreversetranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
