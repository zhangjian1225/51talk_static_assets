"use strict";define("common/moreContent",["tplCommon"],function(t,n,o){!function(){var n=t("tplCommon");({getTrialConfig:function(){$.ajax({url:window.use_url+"/api/trialConfig",type:"get",dataType:"json",data:{},success:function(t){1e4==t.status?$("#moreContent").html(n.moreContent(t)):alert(t.info)}})}}).getTrialConfig()}()});