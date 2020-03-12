import path from 'path';
import { getByTestId } from "@testing-library/dom";
import { setupTemplate, renderTemplate, cleanup } from '../../testing';

let TEMPLATE_NAME = 'anchor';
describe('anchor', () => {
    let container;

    beforeEach(() => {
        setupTemplate(path.resolve(__dirname, 'anchor.dust'), TEMPLATE_NAME);        
    });

    it('should add noreferrer to anchor', async () => {
        container = await renderTemplate(TEMPLATE_NAME, { testId: 'three' });

        expect(getByTestId(container, 'three').getAttribute('rel')).toContain('noreferrer');
    });

    it('should add noopener to anchor', async () => {
        container = await renderTemplate(TEMPLATE_NAME, { testId: 'three' });

        expect(getByTestId(container, 'three').getAttribute('rel')).toContain('noopener');
    });

    afterEach(() => cleanup(container));
});