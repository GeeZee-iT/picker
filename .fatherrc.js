export default {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  preCommit: {
    prettier: true,
  },
  runtimeHelpers: true,
};
