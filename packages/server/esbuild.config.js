const path = require('path');
const esbuild = require('esbuild');
const config = {
  entryPoints: [path.resolve(__dirname, 'src', 'server.ts')],
  outfile: path.resolve(__dirname, 'dist', 'bundle.js'),
  minify: true,
  bundle: true,

  platform: 'node'
};
esbuild.build(config);