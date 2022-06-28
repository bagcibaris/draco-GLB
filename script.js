import { NodeIO } from '@gltf-transform/core';
import { DracoMeshCompression } from '@gltf-transform/extensions';

import draco3d from 'draco3dgltf';

// ...

const io = new NodeIO()
    .registerExtensions([DracoMeshCompression])
    .registerDependencies({
        
        'draco3d.encoder': await draco3d.createEncoderModule(), // Optional.
    });

// Read and decode.
const document = await io.read('bunny.glb');

// Write and encode.
document.createExtension(DracoMeshCompression)
    .setRequired(true)
    .setEncoderOptions({
        method: DracoMeshCompression.EncoderMethod.EDGEBREAKER,
        encodeSpeed: 5,
        decodeSpeed: 5,
    });

await io.write('file.glb', document);