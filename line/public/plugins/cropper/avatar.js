
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})
(function ($) {

    'use strict';

    var console = window.console || { log: function () {} };
    let opt = {avatarView: true}
    function layCrop($element, options) {
        this.options = $.extend({}, opt, options || {})
        this.$container = $element;
        this.$avatarView = null;
        this.$avatar = null;
        this.$crop = $("body").find('#avatar_crop');
        this.$avatarWrapper = this.$crop.find('.avatar-wrapper');
        this.$avatarPreview = this.$crop.find('.avatar-preview');
        this.$loading = $("#page-wrapper").find('.loading');

        this.$avatarForm = this.$crop.find('.avatar-form');
        this.$avatarInput = this.$avatarForm.find('.avatar-input');
        // this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
        this.$avatarSrc = this.$avatarForm.find('.avatar-src');
        this.$avatarData = this.$avatarForm.find('.avatar-data');
        this.$avatarSave = this.$avatarForm.find('.avatar-save');
        this.$avatarBtns = this.$avatarForm.find('.avatar-btns');
        this.init();
    }

    layCrop.prototype = {
        constructor: layCrop,
        support: {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        },
        resetFile: function () {
            var file = this.$avatarForm.find('.avatar-input')
            file.after(file.clone().val(""));
            file.remove();
            this.$avatarInput = this.$avatarForm.find('.avatar-input');
            this.$avatarInput.on('change', $.proxy(this.change, this));
        },
        buildAvatarView: function (){
            if(this.$avatarView !== null) {
                this.$avatarView = this.$container.find('.avatar-view')
                this.$avatar = this.$avatarView.find('img');
                this.$avatarView.on('click', $.proxy(this.click, this));
                this.initTooltip()
            }
        },

        init: function () {
            this.support.datauri = this.support.fileList && this.support.blobURLs;

            if (!this.support.formData) {
                this.initIframe();
            }
            this.addListener();
        },


        addListener: function () {
            this.buildAvatarView();
            this.$avatarInput.on('change', $.proxy(this.change, this));
            this.$avatarForm.on('submit', $.proxy(this.submit, this));
            this.$avatarBtns.on('click', $.proxy(this.rotate, this));
        },

        initTooltip: function () {
            this.$avatarView.tooltip({
                placement: 'bottom'
            });
        },

        initPreview: function () {
            var url = this.$avatar.attr('src');
            this.$avatarPreview.empty().html('<img src="' + url + '">');
            this.$avatarWrapper.empty().html('<div class="wrapper-img"><img src="' + url + '"></div>');
        },

        initIframe: function () {
            var target = 'upload-iframe-' + (new Date()).getTime(),
                $iframe = $('<iframe>').attr({
                    name: target,
                    src: ''
                }),
                _this = this;

            // Ready ifrmae
            $iframe.one('load', function () {

                // respond response
                $iframe.on('load', function () {
                    var data;

                    try {
                        data = $(this).contents().find('body').text();
                    } catch (e) {
                        console.log(e.message);
                    }

                    if (data) {
                        try {
                            data = $.parseJSON(data);
                        } catch (e) {
                            console.log(e.message);
                        }

                        _this.submitDone(data);
                    } else {
                        _this.submitFail('Image upload failed!');
                    }

                    _this.submitEnd();

                });
            });

            this.$iframe = $iframe;
            this.$avatarForm.attr('target', target).after($iframe.hide());
        },

        click: function () {
            this.$avatarModal.modal('show');
            this.initPreview();
            this.resetFile()
        },

        change: function () {
            var files, file;
            if (this.support.datauri) {
                files = this.$avatarInput.prop('files');
                if (files.length > 0) {
                    file = files[0];
                    if (this.isImageFile(file)) {
                        if (this.url) {
                            URL.revokeObjectURL(this.url); // Revoke the old one
                        }
                        this.url = URL.createObjectURL(file);
                        this.startCropper();
                    }
                }
            } else {
                file = this.$avatarInput.val();
                if (this.isImageFile(file)) {
                    this.syncUpload();
                }
            }
        },

        submit: function () {
            if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
                return false;
            }

            if (this.support.formData) {
                this.ajaxUpload();
                return false;
            }
        },
        //旋转
        rotate: function (e) {
            var data;

            if (this.active) {
                data = $(e.target).data();

                if (data.method) {
                    this.$img.cropper(data.method, data.option);
                }
            }
        },

        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        },

        startCropper: function () {
            var _this = this;
            _this.$avatarSrc.val(this.url);
            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                this.$img.cropper({
                    aspectRatio: 1,
                    preview: this.$avatarPreview.selector,
                    strict: false,
                    crop: function (data) {
                        var json = [
                            '{"x":' + data.x,
                            '"y":' + data.y,
                            '"height":' + data.height,
                            '"width":' + data.width,
                            '"rotate":' + data.rotate + '}'
                        ].join();

                        _this.$avatarData.val(json);
                    }
                });

                this.active = true;
            }
        },

        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                this.active = false;
            }
        },

        ajaxUpload: function () {
            var url = this.$avatarForm.attr('action'),
                data = new FormData(this.$avatarForm[0]),
                _this = this;
            $.ajax(url, {
                headers: {'X-XSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                type: 'post',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,

                beforeSend: function () {
                    _this.submitStart();
                },

                success: function (data) {
                    _this.submitDone(data);
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _this.submitFail(textStatus || errorThrown);
                },

                complete: function () {
                    _this.submitEnd();
                }
            });
        },

        syncUpload: function () {
            this.$avatarSave.click();
        },

        submitStart: function () {
            // if(typeof  $.wloading != null) {
            //     $.wloading()
            // }else{
            //     this.$loading.fadeIn();
            // }
        },

        submitDone: function (data) {
            if ($.isPlainObject(data)) {
                if (data.file_name) {
                    this.url = data.file_name;
                    if (this.support.datauri || this.uploaded) {
                        this.uploaded = false;
                        this.cropDone();
                    } else {
                        this.uploaded = true;
                        this.startCropper();
                    }
                    this.$avatarInput.val('');
                } else if (data.message) {
                    this.alert(data.message);
                }
            } else {
                this.alert('Failed to response');
            }
        },

        submitFail: function (msg) {
            this.alert(msg);
        },

        submitEnd: function () {
            this.$loading.fadeOut();
            if(typeof $.wloading_close != null) {
                $.wloading_close()
            }
        },
        avatar_show: function (){
            if(this.$avatar != null) this.$avatar.attr('src', this.url);
        },

        cropDone: function () {
            this.$avatarForm.get(0).reset();
            this.avatar_show()
            this.stopCropper();
            console.log(this.options.lay_index, 'this.options.lay_index')
            layer.close(this.options.lay_index)
            if(this.options.cropDone){
                this.options.cropDone(this.url)
            }

        },

        alert: function (msg) {
            if(typeof $.alert != null){
                $.alert(msg)
            }
        }
    };

    window.layCrop = layCrop;
});