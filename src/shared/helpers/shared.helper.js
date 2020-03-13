function sharedHelper(chunk, context, bodies, params) {
    const modifiedContext = {
        $content: bodies.block
    }
    return chunk.partial(params.name, context.push(modifiedContext), params);
}

export function addSharedHelper(dust) {
    dust.helpers.shared = sharedHelper;
}