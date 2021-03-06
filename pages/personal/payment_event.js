module.exports = {


  bindTouchMoveCell(e) {

    let index = e.currentTarget.dataset.index
    if (this.data.handleAnimated) {
      return false
    }
    let idx = this.data.list[index].index
    let top = e.currentTarget.dataset.top
    let startPageY = 90
    let pageY = e.touches[0].pageY
    let targetId = parseInt((pageY - 90 + 40) / 133)
    if (targetId >= this.data.list.length) {
      return
    }
    

    if (targetId != idx) {
      this.data.handleAnimated = true
      // 查找目标索引的下标
      let targetOffset = (idx - targetId) * 133
      if (index == targetId){
        targetOffset = 0
      }
      let targetIndex = 0
      for(let i = 0 ;i < this.data.list.length; i++){
        let idx = this.data.list[i].index
        if (targetId == idx){
          targetIndex = i
          break
        }
      }
      this.setData({
        [`list[${targetIndex}].offsetY`]: targetOffset,
      })
      this.data.list[index].index = targetId
      this.data.list[targetIndex].index = idx
      setTimeout(() => {
        this.data.handleAnimated = false
        
      }, 100)
    }else{

    }
  },

  bindTouchEnd(e) {
    clearTimeout(this.data.timer)
    this.data.timer = null
    this.setData({
      handleAnimated:false
    })
    this.data.list.map(item => {
      item.offsetY = 0
    })
    this.data.list = this.data.list.sort(($1, $2) => {
      return $1.index > $2.index
    })
    this.setData({
      list: this.data.list
    })
    // 发起请求
  }

}