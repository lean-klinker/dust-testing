import path from 'path';
import { setupTemplate, cleanup, renderTemplate } from "../../testing";
import { getByText } from '@testing-library/dom';

const TEMPLATE_NAME = 'header';
describe('header', () => {
    let container;

    beforeEach(() => {
        setupTemplate(path.resolve(__dirname, 'header.dust'), TEMPLATE_NAME);
    })

    it('should show header', async () => {
        container = await renderTemplate(TEMPLATE_NAME, { text: 'Hello' });
        
        expect(container).toHaveTextContent('Hello');
    });

    it('should use header class', async () => {
        container = await renderTemplate(TEMPLATE_NAME, { text: 'one' });

        expect(getByText(container, 'one').getAttribute('class')).toContain('header');
    })

    afterEach(() => cleanup(container));
});