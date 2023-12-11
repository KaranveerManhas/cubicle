{
    let removeEmployee = function(){
        let removeLinks = $('.remove-employee');
        
        $(removeLinks).click(function(e){
            e.preventDefault();
            let self = this;
            let url = $(self).attr('href');
            let empId = url.split('/')[3];
            let employeeListItem = $(`#emp-${empId}`);

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data){
                    employeeListItem.remove();
                    $('.modal-backdrop.fade.show').remove();
                },
                error: function(err){
                    console.log(err);
                }
            });

        });
    }

    removeEmployee();
}