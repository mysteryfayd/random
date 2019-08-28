const rings = document.querySelectorAll('.ring'),
      spin = document.querySelector('.spin'),
      degs = [0, 45, 90, 135, 180, 225, 270, 315, 360]

    window.onload = () => {
      rings.forEach((el, i) => {
        let obj = {},
          arr = obj.arr = []

        el.querySelectorAll('.slot').forEach((el) => {
          let id = el.getAttribute('id')
          obj.arr.push(id)
        })

        obj.next = arr[arr.length - 2]
        obj.curr = arr[arr.length - 1]
        obj.prev = arr[0]
        obj.deg = 0

        window[`ring${i}`] = obj
      })
    }

    spin.addEventListener('click', rotate)

    function rotate() {
      rings.forEach((el, i) => {
        let obj = window[`ring${i}`],
          deg = obj.deg,
          curr = obj.curr,
          arr = obj.arr,
          res = deg - degs[rnd(0, degs.length)] * rnd(1, 30)

        el.style.transform = `rotateX(${res}deg)`
        obj.deg = res

        let cnt = Math.abs(res - deg) / (360 / arr.length),
          tmp = arr.slice(arr.indexOf(curr)),
          next,
          prev

        for (let i = 0; i <= cnt; i++) {
          tmp.push.apply(tmp, arr)
          curr = tmp[i]
          next = tmp[i - 1]
          prev = tmp[i + 1]
        }

        obj.curr = curr

        if (cnt > 0) {
          obj.next = next
          obj.prev = prev
        }

        window[`ring${i}`] = obj
      })
    }

    function rnd(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }