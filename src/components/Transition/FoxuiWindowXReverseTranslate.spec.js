import { mount } from '@vue/test-utils';
import Foxuiwindowxreversetranslate from './FoxuiWindowXReverseTranslate.vue';

describe('Spec Foxuiwindowxreversetranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiwindowxreversetranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
