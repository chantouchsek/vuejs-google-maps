export function autoCall (value) {
  return typeof value === 'function' ? value() : value
}

export function capitalize (text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function assignDefined (target, ...sources) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const val = source[key]
      if (val !== undefined) {
        target[key] = val
      }
    }
  }
  return target
}
