import { mount } from '@vue/test-utils';
import Foxuiwindowxtranslate from './FoxuiWindowXTranslate.vue';

describe('Spec Foxuiwindowxtranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiwindowxtranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
