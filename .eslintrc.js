module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "comma-dangle": ["error", "never"],
      "no-console": ["error", {"allow": ["log"]}],
      "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
      "max-len": 0
    },
    "env": {
      "browser": true
    },
    "globals": {
      "Vue": true,
      "d3": true
    }
};
