import * as options from 'js/options.js';

function initUI() {
    $('select').material_select();

    $('.box:not(#general-settings)').hide();
    $("nav .breadcrumbs:not([nav-for='#general-settings'])").hide();

    $("li.tab a").click(function () {
        let containerSelector = $(this).attr('href');
        $('.box').hide();
        $(containerSelector).show();

        $('nav .breadcrumbs').hide();

        $("nav .breadcrumbs").filter(function () {
            return $(this).attr("nav-for") == containerSelector;
        }).show();
    });
}

function initOptions() {
    $('#editor_theme').on('change', (e)=>{
        options.setEditorTheme($(e.target).val());
    }).val(options.getEditorTheme()).material_select();

    $('#highlighter_theme').on('change', (e)=>{
        options.setHighlighterTheme($(e.target).val());
    }).val(options.getHighlighterTheme()).material_select();

    $('#user-email').on('change', (e)=>{
        options.setUserEmail($(e.target).val());
    }).val(options.getUserEmail());

    var tinySourceCodeHighlighted = $('#tinymce_source_code_highlighted').on('change', (e)=>{
        options.setTinySourceCodeHighlighted($(e.target).prop('checked'));
    });

    if (options.isTinySourceCodeHighlighted()) {
        tinySourceCodeHighlighted.prop('checked', true);
    }

    var tinyAddFormatButton = $('#tinymce_add_format_button').on('change', (e)=>{
        options.setTinyAddFormatCodeButton($(e.target).prop('checked'));
    });

    if (options.isTinyAddFormatCodeButton()) {
        tinyAddFormatButton.prop('checked', true);
    }

    var tinyFormatOnLoading = $('#tinymce_format_on_loading').on('change', (e)=>{
        options.setTinyFormatOnLoading($(e.target).prop('checked'));
    });

    if (options.isTinyFormatOnLoading()) {
        tinyFormatOnLoading.prop('checked', true);
    }

    ///////////////////////////////

    var summernoteFormatOnLoading = $('#summernote_format_on_loading').on('change', (e)=>{
        options.setSummernoteFormatOnLoading($(e.target).prop('checked'));
    });

    if (options.isSummernoteFormatOnLoading()) {
        summernoteFormatOnLoading.prop('checked', true);
    }
}

$(document).ready(function () {
    initUI();
    initOptions();
    Materialize.updateTextFields();
});
