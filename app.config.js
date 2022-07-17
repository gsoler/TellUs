const environmentData = require('./eas.json');

export default ({ config }) => {
  if (process.env.BASE_URL) {
    config.extra = { ...config.extra, ...process.env };
  } else {
    const selectedEnvironment = environmentData.build[config.extra.ENVIRONMENT];
    if (selectedEnvironment.extends != null) {
      selectedEnvironment.env = { ...selectedEnvironment.env, ...environmentData.build[selectedEnvironment.extends].env };
    }
    config.extra = { ...selectedEnvironment.env };
  }
  config.extra.analytics = config.extra.analytics === 'true';

  return { ...config };
};
