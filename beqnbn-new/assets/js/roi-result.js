$(document).ready(function() {

    // class PrintButton {
    //   constructor(button, section) {
    //     this.button = button;
    //     this.section = section;
    //     this.activeClass = 'print-preview-active';
    //     this.body = document.querySelector('body');
    //   }

    //   // Print Button Trigger
    //   buttonTrigger() {
    //     this.button.addEventListener('click', () => {
    //       this.body.classList.add(this.activeClass);
    //       window.print();
    //     });
    //   }

    //   // Set After Print
    //   setAfterPrint() {
    //     // Not webkit
    //     if (! window.matchMedia) {
    //       window.onafterprint = () => {
    //         if (this.body.classList.contains(this.activeClass)) {
    //           this.doAfterPrint();
    //         }
    //       };
    //     } else {
    //       // webkit
    //       const mediaQueryList = window.matchMedia('print');
    //       mediaQueryList.addListener((mql) => {
    //         if (! mql.matches) {
    //           // on afterprint
    //           if (this.body.classList.contains(this.activeClass)) {
    //             this.doAfterPrint();
    //           }
    //         }
    //       });
    //     }
    //   }

    //   // Stuff to do after print
    //   doAfterPrint() {
    //     this.body.classList.remove(this.activeClass);
    //     // return to agenda block. corrects jump after print prompt display
    //     this.section.scrollIntoView();
    //   }

    //   // Init
    //   init() {
    //     if (this.button) {
    //       this.buttonTrigger();
    //       this.setAfterPrint();
    //     }
    //   }
    // }

    

    class RoiResult {
        constructor(section) {
            this.section = section;
            this.printButtonEl = document.getElementById('btn-print-result');
            this.print = new PrintButton(this.printButtonEl, section);
            this.print.init();
            this.initCopyClipboard();
        }

        initCopyClipboard () {
            this.shareButton = document.getElementById('share-copy-button');
            this.shareEl = document.getElementById('share-copy-url');
            this.sharePopup = document.getElementById('share-copy-popup');

            this.shareButton.addEventListener('click', (e) => {
                e.preventDefault();
                let input = document.createElement('textarea');
                this.sharePopup.classList.add('show');

                setTimeout(() => {
                    this.sharePopup.classList.remove('show');
                }, 1000);

                input.innerHTML = this.shareEl.innerText;
                document.body.appendChild(input);
                input.select();
                let result = document.execCommand('copy');
                document.body.removeChild(input);
            })
        }
    }


    const calculatorEl = document.getElementById('roi-result');
    if(calculatorEl) {
        const calculator = new RoiResult(calculatorEl);
    }
        
});