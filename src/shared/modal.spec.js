import path from 'path';
import { cleanup, setupTemplate, renderTemplate } from '../../testing';
import { getByTestId } from '@testing-library/dom';

const TEMPLATE_NAME = 'modal';
describe('modal', () => {
    let container;

    beforeEach(() => {
        setupTemplate(path.resolve(__dirname, 'modal.dust'), TEMPLATE_NAME);
    });

    it('should show modal title', async () => {
        container = await renderTemplate(TEMPLATE_NAME, { title: 'bob' });

        expect(getByTestId(container, 'modal-title')).toHaveTextContent('bob');
        expect(getByTestId(container, 'modal-title')).toHaveClass('modal-title');
    });

    it('should show modal content', async () => {
        container = await renderTemplate(TEMPLATE_NAME, {
            $content: 'some content'
        });

        expect(getByTestId(container, 'modal-content')).toHaveTextContent('some content');
        expect(getByTestId(container, 'modal-content')).toHaveClass('modal-content');
    });

    it('should show ok button', async () => {
        container = await renderTemplate(TEMPLATE_NAME);

        expect(getByTestId(container, 'ok-btn')).toHaveTextContent('Ok');
    });

    it('should show cancel button', async () => {
        container = await renderTemplate(TEMPLATE_NAME);

        expect(getByTestId(container, 'cancel-btn')).toHaveTextContent('Cancel');
    });

    it('should put buttons in footer', async () => {
        container = await renderTemplate(TEMPLATE_NAME);

        const footer = getByTestId(container, 'modal-footer');
        expect(getByTestId(footer, 'ok-btn')).toBeTruthy();
        expect(getByTestId(footer, 'cancel-btn')).toBeTruthy();
    });

    afterEach(() => cleanup(container))
})