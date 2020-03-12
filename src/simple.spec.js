import path from 'path';
import { getByTestId } from '@testing-library/dom';
import { setupTemplate, renderTemplate, cleanup, loadPartials } from '../testing';

const TEMPLATE_NAME = 'SIMPLE';
describe('Simple', () => {
    let container;

    beforeEach(async () => {
        await loadPartials();
        setupTemplate(path.resolve(__dirname, 'simple.dust'), TEMPLATE_NAME);
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

    afterEach(() => cleanup(container));
});