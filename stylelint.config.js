module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-standard-scss"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  ignoreFiles: [
  ],
  customSyntax: require("postcss-scss"),
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["return", "function", "if", "each", "include", "mixin", "use"] 
      }
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        ignoreAtRules: ["mixin", "import", "media", "include", "supports", "return", "use"] 
      }
    ],
    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "max-line-length": 999999,
    "string-quotes": "single",
  },
}
