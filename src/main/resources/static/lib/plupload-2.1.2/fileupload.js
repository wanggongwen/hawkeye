/**
 * @author win7
 *
 */
/**
 * @author win7
 *
 *
 */
service = "http://fileservice.csfzss.com:81";
UploadFile = function() {
};
UploadFile.prototype = {
		/**
		 * @param bindId 绑定触发对话框的ID
		 * @param url //上传的URL
		 * @param hiddenId //上传成功后，将地址填充到该ID
		 * @param showPictrueId //上传成功后在该ID中显示图片
		 * @param isAllocateDir//是否指定上传至服务器的哪个目录
		 * @param dirName //需要上传到哪个目录
		 * @param isShrink//是否压缩 true false
		 * @param selfScale //远程压缩尺寸< 1.0
		 * @returns
		 */
		invokeMutiUpload :
		function(bindId,url,hiddenId,showPictrueId,isAllocateDir,dirName,isShrink,selfScale) {
			$(bindId).pluploadQueue({
				runtimes : 'html5,flash,silverlight,html4',
				url :  url,
				multiple_queues:'true',
				chunk_size: '0',
				rename : true,
				dragdrop: true,
				filters : {
					max_file_size : '1mb',
					mime_types: [
						{title : "可选择的图片类型", extensions : "jpg,gif,png"},
					]
				},
				multipart_params: {
					isAllocateDir: isAllocateDir,
					dirName:dirName,
					isShrink:isShrink,
					selfScale:"0.2"
					}
				,
				flash_swf_url :'/js/plupload-2.1.2/js/Moxie.swf',
				silverlight_xap_url :'/js/plupload-2.1.2/js/Moxie.xap',
				});
				var mutiUploader = $(bindId).pluploadQueue();
				/* 单个文件可以完成上传 */
				mutiUploader.bind('FileUploaded', function(uploader,file,responseObject) {
					var resData = jQuery.parseJSON(responseObject.response);
					var keys = resData.responseDATA.keys;
					var DATA = keys[0];
				if("000000" !=  resData.responseDATA.rtnCode) {
					alert(DATA.rtnMsg);
				}
				var ids = "";
				if("true" == isShrink) {
					ids = DATA.originUrl + "=" + DATA.compressedUrl;
					$(showPictrueId).append("<span><img src=\'" + service + DATA.compressedUrl + "\' ></span>");
				} else {
					ids = DATA.originUrl;
					$(showPictrueId).append("<span><img src=\'" + service + DATA.originUrl + "\' ></span>");
				}
				var model_pictures = ids + ";" + $.trim($(hiddenId).val());
				$(hiddenId).val(model_pictures);
				});
				return mutiUploader;
				/* 所有文件可以完成上传 
				uploader.bind('UploadComplete', function(uploader,files) {
				});*/
	},
	/**
	 * @param bindId  绑定触发对话框的ID
	 * @param startUploadId 点击该ID开始上传
	 * @param url 上传地址
	 * @param hiddenId //上传成功后，将地址填充到该ID
	 * @param showPictrueId //上传成功后在该ID中显示图片
	 * @param isAllocateDir//是否指定上传至服务器的哪个目录
	 * @param dirName //需要上传到哪个目录
	 * @param isShrink//是否压缩 true false
	 * @param selfScale //压缩尺寸 < 1.0
	 @param qualitySize 压缩质量 不输入时输入为90 ，输入99代表不压缩
	 * @returns {plupload.Uploader}
	 */
	invokeSingleUpload : function(bindId,startUploadId,url,hiddenId,showPictrueId,isAllocateDir,dirName,isShrink,selfScale) {
		var loading;
		var singleUploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : bindId, // you can pass in id...
			multi_selection:false,
			url : url,
			flash_swf_url :'/js/plupload-2.1.2/js/Moxie.swf',
			silverlight_xap_url :'/js/plupload-2.1.2/js/Moxie.xap',
			filters : {
				max_file_size : '1mb',
				mime_types: [
					{title : "Image files", extensions : "jpg,gif,png"}
				]
			},
			multipart_params: {
				isAllocateDir: isAllocateDir,
				dirName:dirName,
				isShrink:isShrink,
				selfScale:selfScale
				},
			init: {
				PostInit: function() {
					if("" != startUploadId && undefined != startUploadId) {
						document.getElementById(startUploadId).onclick = function() {
							loading = layer.load(1, {
								shade: [0.1,'#fff'] //0.1透明度的白色背景
							});
							singleUploader.start();
							return false;
						};
					}

				},
				FilesAdded: function(up, files) {
					$(showPictrueId).show().html("<p style=\"color:red;font-size:13px;\">已选择:"+ files[0].name+"</p>");
					if("" === startUploadId || undefined == startUploadId) {
						loading = layer.load(1, {
							shade: [0.1,'#fff'] //0.1透明度的白色背景
						});
						singleUploader.start();
					}
				},
				FileUploaded:function(uploader,file,responseObject) {
					layer.close(loading);
					var resData = jQuery.parseJSON(responseObject.response);
					var keys = resData.responseDATA.keys;
					var DATA = keys[0];
					var ids = "";
					if("true" == isShrink) {
						ids = DATA.originUrl + "=" + DATA.compressedUrl;
						$(showPictrueId).show().html("<img src=\'" + service + DATA.compressedUrl + "\'>");
					} else {
						ids = DATA.originUrl;
						$(showPictrueId).show().html("<img src=\'" + service + DATA.originUrl + "\' >");
					}
					$(hiddenId).val(ids);
					},
					Error: function(up, err) {
						alert("错误信息:" + err.message + "  错误码:" + err.code);
					},
					UploadProgress:function(uploader,file){
						$(showPictrueId).show().html("<span style=\"color:red;font-size:13px;\">"+file.name + "&nbsp;"+ uploader.total.percent+"%</span>");
					}
			}
		});
		singleUploader.init();
		return singleUploader;
	},
	/**
	 * @param bindId  绑定触发对话框的ID
	 * @param startUploadId 点击该ID开始上传
	 * @param url 上传地址
	 * @param hiddenId //上传成功后，将地址填充到该ID
	 * @param showPictrueId //上传成功后在该ID中显示图片
	 * @param isAllocateDir//是否指定上传至服务器的哪个目录
	 * @param dirName //需要上传到哪个目录
	 * @param isShrink//是否压缩 true false
	 * @param selfScale //压缩尺寸 < 1.0
	 @param qualitySize 压缩质量 不输入时输入为90 ，输入99代表不压缩
	 * @returns {plupload.Uploader}
	 */
	invokeSingleUploadAndImpressedLocal : function(bindId,startUploadId,url,hiddenId,showPictrueId,isAllocateDir,dirName,isShrink,selfScale) {
		var singleUploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : bindId, // you can pass in id...
			multi_selection:false,
			url : url,
			flash_swf_url :'/js/plupload-2.1.2/js/Moxie.swf',
			silverlight_xap_url :'/js/plupload-2.1.2/js/Moxie.xap',
			filters : {
				max_file_size : '1mb',
				mime_types: [
					{title : "Image files", extensions : "jpg,gif,png"}
				]
			},
			multipart_params: {
				isAllocateDir: isAllocateDir,
				dirName:dirName,
				isShrink:isShrink,
				selfScale:"0.2"
				},
				resize: {
					  width: 517.5,
					  height: 920,
					  crop: true,
					},
			init: {
				PostInit: function() {
					document.getElementById(startUploadId).onclick = function() {
						singleUploader.start();
						return false;
					};
				},
				FilesAdded: function(up, files) {
					$(showPictrueId).html("<p style=\"color:red;font-size:13px;\">已选择:"+ files[0].name+"</p>");
				},
				FileUploaded:function(uploader,file,responseObject) {
					var DATA = jQuery.parseJSON(responseObject.response);
					var ids = "";
					if("true" == isShrink) {
						ids = DATA.originUrl + "=" + DATA.compressedUrl;
						$(showPictrueId).html("<img src=\'" + service + DATA.compressedUrl + "\' style=\"width:100px;height:100px;margin-left:5px;\">");
					} else {
						ids = DATA.originUrl;
						$(showPictrueId).html("<img src=\'" + service + DATA.originUrl + "\' style=\"width:100px;height:100px;margin-left:5px;\">");
					}
					$(hiddenId).val(ids);
					},
					Error: function(up, err) {
						alert("错误信息:" + err.message + "  错误码:" + err.code);
					},
					UploadProgress:function(uploader,file){
						$(showPictrueId).html("<span style=\"color:red;font-size:13px;\">"+file.name + "&nbsp;"+ uploader.total.percent+"%</span>");
					}
			}
		});
		singleUploader.init();
		return singleUploader;
	},
	/**
	 * @param bindId  绑定触发对话框的ID
	 * @param startUploadId 点击该ID开始上传
	 * @param url 上传地址
	 * @param hiddenId //上传成功后，将地址填充到该ID
	 * @param showPictrueId //上传成功后在该ID中显示图片
	 * @param isAllocateDir//是否指定上传至服务器的哪个目录
	 * @param dirName //需要上传到哪个目录
	 * @param isShrink//是否压缩 true false
	 * @param selfScale //压缩尺寸 < 1.0
	 * @returns {plupload.Uploader}
	 */
	invokeSingleFileUpload : function(bindId,startUploadId,url,hiddenId,showPictrueId,isAllocateDir,dirName) {
		var singleUploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : bindId, // you can pass in id...
			multi_selection:false,
			url : url,
			flash_swf_url :'/js/plupload-2.1.2/js/Moxie.swf',
			silverlight_xap_url :'/js/plupload-2.1.2/js/Moxie.xap',
			filters : {
				max_file_size : '30mb', 
				mime_types: [
					{title : "选择文件", extensions : "mp4"}
				]
			},
			multipart_params: {
				isAllocateDir: isAllocateDir,
				dirName:dirName
				},
			init: {
				PostInit: function() {
					document.getElementById(startUploadId).onclick = function() {
						singleUploader.start();
						return false;
					};
				},
				FilesAdded: function(up, files) {
					$(showPictrueId).html("<span style=\"color:red;font-size:13px;\">已选择:"+ files[0].name+"</span>");
				},
				FileUploaded:function(uploader,file,responseObject) {
					var DATA = jQuery.parseJSON(responseObject.response);
					var ids = DATA.originUrl;
					$(hiddenId).val(ids);
					$(showPictrueId).html("<a href=\'" + service + DATA.originUrl + "\'" + "><img style=\"width:250px;height:250px;\" src =\'" +"/images/downvideo.jpg\'>");
					},
					Error: function(up, err) {
						alert("错误信息:" + err.message + "  错误码:" + err.code);
					},
					UploadProgress:function(uploader,file){
						$(showPictrueId).html("<span style=\"color:red;font-size:13px;\">"+file.name + "&nbsp;"+ uploader.total.percent+"%</span>");
					}
			}
		});
		singleUploader.init();
		return singleUploader;
	}
};
var uploadFile = new UploadFile();