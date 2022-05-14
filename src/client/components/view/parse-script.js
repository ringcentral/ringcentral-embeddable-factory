import { features } from '../../common/features'

export default (conf) => {
  const keys = Object.keys(conf)
  let q = '?'
  let i = 0
  for (const k of keys) {
    let v = conf[k]
    const feat = features.find(f => f.name === k)
    if (!feat) {
      console.log('not feat for ', k)
      continue
    }
    if (typeof v === 'undefined' || v === feat.defaultValue) {
      continue
    }
    v = v === true ? '1' : v
    q = q +
      (i ? '&' : '') +
      k + '=' + encodeURIComponent(v)
    i = i + 1
  }
  return `<script>
  (function() {
    var rcs = document.createElement("script");
    rcs.src = "https://ringcentral.github.io/ringcentral-embeddable/adapter.js${q}";
    var rcs0 = document.getElementsByTagName("script")[0];
    rcs0.parentNode.insertBefore(rcs, rcs0);
  })();
</script>`
}
