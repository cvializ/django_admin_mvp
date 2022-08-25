// Wrap String.raw to turn a template string and its values into a plain string
// We use a wrapper to allow us to handle the template in a more rich way in
// the future. It also lends semantic value vs using String.raw directly.
export const css = (template, ...values) => String.raw(template, ...values);
