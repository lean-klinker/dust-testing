const path = require('path');
const { getByTestId } = require("@testing-library/dom");

let TEMPLATE_NAME = 'anchor';
describe('anchor', () => {
    let container;

    beforeEach(() => {
        setupTemplate(path.resolve(__dirname, 'anchor.dust'), TEMPLATE_NAME);        
    });

    it('should add noreferrer to anchor', async () => {
        container = await renderTemplate(TEMPLATE_NAME, {
            href: 'https://google.com',
            testId: 'three',
            text: 'bob'
        });

        expect(getByTestId(container, 'three').getAttribute('rel')).toContain('noreferrer');
    });

    afterEach(() => container.remove());
});