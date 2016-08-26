/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
export let nativeShadow = Boolean(!window.ShadyDom || !window.ShadyDom.inUse);

// force shim support
let forceShimCssProperties = window.location.search.match('forceShimCssProperties=true');

// chrome 49 has semi-working css vars, check if box-shadow works
// safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
export let nativeCssVariables = !forceShimCssProperties &&
(!navigator.userAgent.match('AppleWebKit/601') &&
window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));

// experimental support for native @apply
function detectNativeApply() {
  let style = document.createElement('style');
  style.textContent = '.foo { @apply --foo }';
  document.head.appendChild(style);
  let nativeCssApply = (style.sheet.cssRules[0].cssText.indexOf('apply') >= 0);
  document.head.removeChild(style);
  return nativeCssApply;
}

export let nativeCssApply = false && detectNativeApply()