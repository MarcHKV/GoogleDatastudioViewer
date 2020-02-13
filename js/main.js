$(document).ready(function () {
    DetermineMenuIcon();
    GetData('/static/report.json');
});

//Toggle Sidebar
$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
    DetermineMenuIcon();
});

//Determine if collapse button has to point left or right
function DetermineMenuIcon() {
    if ($('#sidebar').hasClass('active')) {
        $('#sidebarCollapse_icon').removeClass('fas fa-chevron-left');
        $('#sidebarCollapse_icon').addClass('fas fa-chevron-right');
    }
    else {
        $('#sidebarCollapse_icon').removeClass('fas fa-chevron-right');
        $('#sidebarCollapse_icon').addClass('fas fa-chevron-left');
    }
}

//Get name and url from json file, create li and add to array items
function GetData(JSONfile) {
    var items = [];
    $.getJSON(JSONfile, function (data) {
        $.each(data, function (key, val) {
            var i = 0;
            $.each(val, function (key, val) {
                var item = '<li class="menu-report"><a class="reporturl" href="' + val.url + '">' + val.name + '</a></li>'
                items.push(item);

                if (i == 0) {
                    //Default load the first entry into the iframe
                    $("#report-content").attr('src', val.url);
                }

                i++;
            })
        });

        //add each li to the menu
        $.each(items, function (index, value) {
            $("#sidebar-content").append(value);
        });

    });
}

$(document).on('click', "a.reporturl", function (event) {
    event.preventDefault();
    var url = event.target.href;
    if (url) {
        $("#report-content").attr('src', url);
    }
});
