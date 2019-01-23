module.exports = {
  "extends": ["airbnb", "react-app"],
  "rules": {
    "import/extensions": { "js": "never" },
    "linebreak-style": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/jsx-filename-extension": "off",
    "jsx-a11y/href-no-hash": "off",
  },
  "settings": {
    "import/resolver": { "node": {"paths": ["src"] } },
  }
};
