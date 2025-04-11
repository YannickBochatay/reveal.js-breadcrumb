function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const head = document.querySelector("head")
    const res = document.createElement("link")
    res.rel = "stylesheet"
    res.onload = resolve
    res.onerror = reject
    res.href = href
    head.appendChild(res)
  })
}

class Breadcrumb {

  #node = null

  get node() { return this.#node }

  loadCSS() {
    const currentPath = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1)
    return loadCSS(currentPath + "styles.css")
  }

  createContainer() {
    const breadcrumb = document.createElement("ul")
    breadcrumb.classList.add("breadcrumb")
    document.body.insertBefore(breadcrumb, document.body.firstElementChild)
    this.#node = breadcrumb
  }

  #getTitle(section) {
    const titleNode = section.querySelector("h1, h2, h3, h4, h5, h6")
    return {
      type : titleNode && Number(titleNode.tagName.charAt(1)),
      text : titleNode ? titleNode.textContent : ""
    }
  }

  update({
    slide = document.querySelector("section"),
    indexh = 0
  } = {}) {
    const currentTitle = this.#getTitle(slide)
    const breadcrumb = [{ text : currentTitle.text }]

    let section = slide
    let currentType = currentTitle.type
    let currentIndex = indexh

    while (section = section.previousElementSibling) {
      currentIndex--
      const { text, type } = this.#getTitle(section)
      
      if (type < currentType) {
        breadcrumb.unshift({ text, href : "#/" + currentIndex })
        currentType = type
      }        
    }

    let child
    while (child = this.#node.firstElementChild) child.remove()

    breadcrumb.forEach(({ text, href }) => {
      const li = document.createElement("li")
      if (href) {
        const a = document.createElement("a")
        a.href = href
        a.textContent = text
        li.appendChild(a)
      } else {
        li.textContent = text
      }
      
      this.#node.appendChild(li)
    })
  }
}

const breadcrumb = new Breadcrumb()

export default {
  id: 'breadcrumb',
  async init(reveal){
    await breadcrumb.loadCSS()
    breadcrumb.createContainer()
    breadcrumb.update()
    reveal.layout()
    reveal.addEventListener('slidechanged', breadcrumb.update.bind(breadcrumb))
  },
  breadcrumb
}
