{
    let switchModes = function(){
        let htmlElement = $('html');
        let switchModeButton = $('.switch-mode');
        let switchModeIcon = $('.switch-mode>i');
        let sideMenu = $('#side-menu');
        let navBar = $('#navbar');
        let mainContainer = $('#main-container');
        let main = $('#main');
        let mainInnerContainer = $('.main-inner');
        let employeeContainers = $('.list-item');
        let reviewCards = $('.review-card');
        // Add event listener on the Theme switch button
        $(switchModeButton).on('click', function(e){
            e.preventDefault();
            if($(htmlElement).attr('data-bs-theme') == 'light'){
                $(htmlElement).attr('data-bs-theme', 'dark');
                $(switchModeButton).removeClass('link-dark').addClass('link-light');
                $(switchModeIcon).removeClass('bx-moon').addClass('bx-sun');
                $(sideMenu).removeClass('bg-dark').addClass('bg-body-tertiary');
                $(navBar).removeClass('bg-body').addClass('bg-body-tertiary');
                $(mainContainer).removeClass('bg-body-tertiary').addClass('bg-body');
                $(main).removeClass('bg-body-tertiary').addClass('bg-body');
                $(mainInnerContainer).removeClass('bg-body').addClass('bg-body-tertiary');
                for(eC of employeeContainers){
                    $(eC).removeClass('bg-body-tertiary').addClass('bg-body');
                }

                for(rC of reviewCards){
                    $(rC).removeClass('bg-body-tertiary').addClass('bg-body');
                }

            }else{
                $(htmlElement).attr('data-bs-theme', 'light');
                $(switchModeButton).removeClass('link-light').addClass('link-dark');
                $(switchModeIcon).removeClass('bx-sun').addClass('bx-moon');
                $(sideMenu).removeClass('bg-body-tertiary').addClass('bg-dark');
                $(navBar).removeClass('bg-body-tertiary').addClass('bg-body');
                $(mainContainer).removeClass('bg-body').addClass('bg-body-tertiary');
                $(main).removeClass('bg-body').addClass('bg-body-tertiary');
                $(mainInnerContainer).removeClass('bg-body-tertiary').addClass('bg-body');
                for(eC of employeeContainers){
                    $(eC).removeClass('bg-body').addClass('bg-body-tertiary');
                }

                for(rC of reviewCards){
                    $(rC).removeClass('bg-body').addClass('bg-body-tertiary');
                }
            }
        });
        
    }

    switchModes();
}