const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// Restrict Metro to this project only (avoids watching parent repo)
config.watchFolders = [projectRoot];
config.resolver.watchFolders = [projectRoot];

module.exports = config;
