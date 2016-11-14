# Frictionless Signup

## First draft 10/2016

At the moment, this is a really rough first version of the prototype. The `index.html` file calls a js file on load.

To prefill with the correct data, just add the `data-clearbit` attibute with the right endpoint.

If you want to map to custom range, add `data-mapping` and set it to true. Default = false. Only role and employees are mapped by default.

To customize the role select:
- Add your options
- Set your custom `currentInput.value` in `customMappingRole()`

Please refer to the issues to improve this.