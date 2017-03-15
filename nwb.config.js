module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'multi',
      externals: {
        react: 'React'
      }
    }
  }
}
