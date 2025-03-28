module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-react-jsx'
    ]
  };
};
