const SetFixed = (element, parent) => {

  try {
    const headerEl = document.querySelector('.nav-main-wrapper');
    const headerHeight =  headerEl.offsetHeight;
    const footerOffset = document.querySelector('footer').offsetTop;

    // set initial state of fixed element
    const el = document.querySelector(element);
    setTimeout(()=>{
      setFixedState(el);
    }, 1);
      

    window.addEventListener('scroll', (e) => {
      console.log("Trigger Scroll Event", el);
      setFixedState(el);
    });
    
    if(parent){
      window.addEventListener('resize', (e) => {
        matchWidth(el, parent);
      });
    }

    function setFixedState(elem){

      const scrollPosition = window.scrollY || document.body.headerHeight || document.documentElement.headerHeight;
      const elementOffset = scrollPosition + elem.offsetHeight;
      const isMaxHeight = elem.offsetHeight >= window.innerHeight;

      const elTop = elem.getBoundingClientRect().top;
      const navSecondary = document.querySelector('.nav-secondary');
      const navSecondaryBottom = navSecondary.getBoundingClientRect().bottom;

      console.log(`Scroll Position: ${scrollPosition} Elem Top: ${elTop} Header Height: ${headerHeight}`);
      if(elTop < headerHeight && elementOffset < footerOffset){
        elem.classList.remove('static-top', 'fixed-bottom');

        if(isMaxHeight){
          elem.classList.add('max-height');
        }
        
        if(!elem.classList.contains('fixed-element')){
          elem.classList.add('fixed-element');
          elem.style.top = `${headerHeight}px`;

          if(parent) matchWidth(elem, parent);
        }
        
      } else if(navSecondaryBottom > headerHeight) {
        elem.classList.remove('fixed-element', 'fixed-bottom');
        elem.classList.add('static-top');
        elem.style.top = `inherit`;
        elem.style.bottom = 'inherit';
      }

    }
  } catch(error){
    console.log(`Element: ${element} does not exist, cannot set to fixed`);
  }
}

const matchWidth = (el, par) => {
  if(el.classList.contains('fixed-element')){
    const width = par.getBoundingClientRect().width
    el.style.width = `${width}px`;
  } else if(el.style.width != 'auto'){
    el.style.width = 'auto';
  }
}

export { SetFixed }
