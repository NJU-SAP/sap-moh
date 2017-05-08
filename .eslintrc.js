module.exports = {
  "extends": "airbnb",
  "plugins": [
    "import"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "class-methods-use-this": [
      "off"
    ],
    "comma-dangle": [
      "off"
    ],
    "jsx-a11y/img-has-alt": [
      "off"
    ],
    "import/no-extraneous-dependencies": [
      "off"
    ],
    "max-len": [
      "off"
    ],
    "no-restricted-syntax": [
      "off"
    ],
    "no-underscore-dangle": [
      "off"
    ],
    "no-use-before-define": [
      "off"
    ]
  },
  "globals": {
    "$": true,
    "L": true,
    "moh": true,
    "sap": true
  }
};
