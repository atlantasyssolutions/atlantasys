document.addEventListener("DOMContentLoaded", () => {

    const currentLi = document.querySelector('.knowledge__main__tree__ul li.current'),
        currentA = document.querySelector('.knowledge__main__tree__ul li.current-post');

    if (currentLi) {
        let partentUl = currentLi.closest('ul');

        partentUl.classList.add('active');
        // partentUl.previousSibling.classList.add("category-down")

    }


    if (currentA) {
        let firstUl = currentA.closest('ul.third-level'),
            secondUl = currentA.closest('ul.second-level');

        firstUl.classList.add('active');
        firstUl.previousSibling.classList.add("category-down")
        secondUl.classList.add('active');
        secondUl.previousSibling.classList.add("category-down")
    }


    var toggleAdd = document.querySelectorAll('span.kb-category');
    var i;

    toggleAdd.forEach((item, index) => {
        item.addEventListener("click", (ev) => {
            ev.preventDefault();
            console.log(ev.target.parentElement.parentElement)
            ev.target.classList.toggle('category-down');
            ev.target.nextSibling.classList.toggle('active');
        })
    })
})