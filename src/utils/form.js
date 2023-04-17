export const submitForm = (schema) => {
  let error = false
  Object.values(schema).forEach(item => {
    if (item.required) {
      if (item.value === '') {
        item.textError = item.listError[0]
        item.error = true
        error = item.error ? true : error
        return
      }

      if (item.min && item.value.length < item.min) {
        item.textError = item.listError[1]
        item.error = true
        error = item.error ? true : error
        return;
      }

      if (item.mask && validation[item.mask](item.value)) {
        item.textError = item.listError[1]
        item.error = true
        error = item.error ? true : error
        return
      }

      item.error = false
    }
  })
  return error
}

export const dataForm = (schema) => {
  const data = {}
  Object.values(schema).forEach(item => {
    if (item.value === '') return
    data[item.name] = item.value
  })
  return data
}

const validation = {
  Email(value) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!reg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
}
