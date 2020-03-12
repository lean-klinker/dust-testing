const path = require('path');
const { getByTestId } = require('@testing-library/dom');

const TEMPLATE_NAME = 'SIMPLE';
describe('Simple', () => {
    let container;

    beforeEach(() => {
        setupTemplate(path.resolve(__dirname, 'simple.dust'), TEMPLATE_NAME);
        setupTemplate(path.resolve(__dirname, 'anchor.dust'), 'anchor');
    });

    it('shows the correct text', async () => {
        container = await renderTemplate(TEMPLATE_NAME);
        
        expect(container).toHaveTextContent('Bob');
    });

    it('should show link', async () => {
        container = await renderTemplate(TEMPLATE_NAME);

        expect(getByTestId(container, 'my-link')).toHaveTextContent('go here');
        expect(getByTestId(container, 'my-link')).toHaveAttribute('href', 'https://google.com');
    });

    afterEach(() => container.remove());
});