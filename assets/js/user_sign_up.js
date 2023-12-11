{
    let toggleAdminPasswordBox = function(){
        let adminPasswordBox = $('#admin-password-box');
        let adminSelector = $('#admin-selector');

        $(adminSelector).change(function(){
            if($(adminSelector).val() == "true"){
                $(adminPasswordBox).removeClass('d-none');
            }else{
                $(adminPasswordBox).addClass('d-none');
            }
        });
    }

    toggleAdminPasswordBox();
}