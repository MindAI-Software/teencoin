module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', { 
        targets: { 
          node: '18' // Usar Node.js 18 como target
        }
      }]
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      'react-native-reanimated/plugin'
    ]
  };
};
