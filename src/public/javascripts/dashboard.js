 $(document).ready(function () {

	 $('.menu-btn').click(function () {
		 $('nav.ts-sidebar').toggleClass('menu-open');
	 });
	 $(".ts-sidebar-menu li").click(function (e) {
		 $('nav.ts-sidebar').toggleClass('menu-open');
	 });

	/**
	CHANGE USING ANGULAR JS NG-CLASS DIRECTIVE
	*
	*
	 var removeAllOpen = function removeAllActiveTab(){
		 $(".ts-sidebar-menu li").each(function () {
			 if ($(this).next().length > 0 || $(this).prev().length > 0) {
				 $(this).removeClass("open");
			 };
		 });
	 };

	 $(".ts-sidebar-menu li").click(function (e) {
		 removeAllOpen();
		 $(this).toggleClass('open');
		 var a = $(this).children(a);
		 if(a.length > 0){
			 var target = $(a).attr('data-target');
			 $('#' + target).show();
			 $('#' + target).siblings().hide();
		 }
	 });
	 */

 });
