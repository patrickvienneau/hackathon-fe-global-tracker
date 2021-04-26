import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

const getMany = (obj = {}, keyPaths = []) => {
  if (!isObject(obj) || !isArray(keyPaths)) {
    return []
  }

  const gotten = keyPaths.map((keyPath) => {
    const gottenValue = get(obj, keyPath)

    return gottenValue
  })

  return gotten
}

export default getMany
