

export default {
  id: 'menu',
  init(reveal){

    function createContainer() {
      const breadcrumb = document.createElement("ul")
      breadcrumb.classList.add("breadcrumb")
      document.querySelector("header").appendChild(breadcrumb)
      return breadcrumb
    }

    function getTitle(section) {
      const titleNode = section.querySelector("h1, h2, h3, h4, h5, h6")
      return {
        type : titleNode && Number(titleNode.tagName.charAt(1)),
        text : titleNode ? titleNode.textContent : ""
      }
    }

    function createBreadcrumb({
      currentSlide = document.querySelector("section"),
      indexh = 0
    } = {}) {
      const currentTitle = getTitle(currentSlide)
      const breadcrumb = [{ text : currentTitle.text }]

      let section = currentSlide
      let currentType = currentTitle.type
      let currentIndex = indexh

      while (section = section.previousElementSibling) {
        currentIndex--
        const { text, type } = getTitle(section)
        
        if (type < currentType) {
          breadcrumb.unshift({ text, href : "#/" + currentIndex })
          currentType = type
        }        
      }

      let child
      while (child = container.firstElementChild) child.remove()

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
        
        container.appendChild(li)
      })
    }

    const container = createContainer()

    createBreadcrumb()

    reveal.addEventListener('slidechanged', createBreadcrumb)
  }
}
