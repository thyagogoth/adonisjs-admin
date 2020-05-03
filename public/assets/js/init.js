$(function () {

    if ($('.select2').length > 0)
        $('.select2').select2()

    if ($('.agendar-data').length > 0)
        $('.agendar-data').daterangepicker()

    if ($('.datatable-list').length > 0) {
        $('.datatable-list').DataTable({
            "lengthChange": false,
            "searching": true,
            "ordering": true,
            "order": [[ 0, "desc" ]],
            "columnDefs": [
                {
                    "targets": [ 0 ],
                    "visible": false,
                    "searchable": false
                },
            ],
            "pagingType": "full_numbers",
            "paging": true,
            "info": false,
            "autoWidth": true,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json",
            },
        });
    }

    if ( $('.textarea-editor').length > 0 )
        CKEDITOR.replace('description', {
            uiColor: '#DDDDDD',
            height: '400'
        });
    //     $('.textarea-editor').summernote({})

    if ($('input[type="file"]').length > 0)
        bsCustomFileInput.init();

    if ($('.dater_range_picker').length > 0) {
        $('.dater_range_picker').daterangepicker({
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "Aplicar",
                "cancelLabel": "Cancelar",
                "daysOfWeek": [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sab"
                ],
                "monthNames": [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                ],
                "firstDay": 1
            }
        });
    }

    if ( $(".mask-link").length > 0 ) {
        $(".mask-link").blur(function () {
            var e = $(this).val();
            if ("" != e) {
                var r = new RegExp("^(http)://|^(https)://");
                0 == r.test(e) && $(this).val("https://" + e)
            }
        });
    }

    if ( $('#title').length > 0 ) {
        $('#slug').slugify('#title');
    }
});
