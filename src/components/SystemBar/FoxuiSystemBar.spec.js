import { mount } from '@vue/test-utils';
import Foxuisystembar from './FoxuiSystemBar';

describe('Spec Foxuisystembar', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuisystembar);
		expect(wrapper)
			.toBeTruthy();
	});
});
