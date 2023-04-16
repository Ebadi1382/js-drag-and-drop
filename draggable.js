class draggable {
  constructor(options) {
    this.setupList(options);
    this.list = options.list;
    if (options.update) {
      this.update = options.update;
    }
    for (let listItem of options.el.children) {
      this.addDnDHandler(listItem);
    }
  }
  setupList(options) {
    let { list, el: element, template } = options;

    if (!element) throw console.log("the list is not exist");
    if (!list) throw console.log("the data is not exist");
    if (!Array.isArray(list)) throw console.log("the list is not an Array,please insert  an Array");
    if (!template) throw console.log("please add a template function");
    if (typeof template !== "function") throw console.log("please add a function as template");
    list.forEach((item, index) => {
      element.innerHTML += template(item);
    });
  }
  addDnDHandler(element) {
    element.setAttribute("draggable", true);

    element.addEventListener("dragstart", this.handleDragStart.bind(this));
    element.addEventListener("dragenter", this.handleDragEnter.bind(this));
    element.addEventListener("dragover", this.handleDragOver.bind(this));
    element.addEventListener("dragleave", this.handleDragLeave.bind(this));
    element.addEventListener("drop", this.handleDrop.bind(this));
    element.addEventListener("dragend", this.handleDragEnd.bind(this));
  }
  handleDragStart(e) {
    this.dragSrcEl = e.target;

    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.target.classList.add("dragElem");
  }
  handleDragEnter(e) {}
  handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.target.classList.add("over");
  }
  handleDragLeave(e) {
    e.target.classList.remove("over");
  }
  handleDrop(e) {
    let target = e.target.closest(".list-item");
    if (this.dragSrcEl !== target) {
      let dropHtml = e.dataTransfer.getData("text/html");
      target.insertAdjacentHTML("beforebegin", dropHtml);
      target.parentNode.removeChild(this.dragSrcEl);
      this.addDnDHandler(target.previousSibling);
    }
    e.target.classList.remove("over");
  }
  handleDragEnd(e) {
    e.target.classList.remove("dragElem");

    let newList = [];
    list.querySelectorAll(".list-item").forEach((elm) => {
      newList.push(this.list.find((item) => elm.id == item.id));
    });
    this.update(newList);
  }
}
