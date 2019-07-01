/*
** Declare global variables
*/

var demoreelButtonEn = document.getElementById("demoreel-button-en");
var resumeButtonEn = document.getElementById("resume-button-en");
var demoreelButtonFr = document.getElementById("demoreel-button-fr");
var resumeButtonFr = document.getElementById("resume-button-fr");

var demoreel = document.getElementById("demoreel");
var resume = document.getElementById("resume");
var closeButton = document.getElementById("close-button");
var opacityFilter = document.getElementById("opacity-filter");

/*
** TODO
*/

function interact()
{
    demoreelButtonEn.addEventListener("click", onDemoreelButtonClick);
    resumeButtonEn.addEventListener("click", onResumeButtonClick);
    demoreelButtonFr.addEventListener("click", onDemoreelButtonClick);
    resumeButtonFr.addEventListener("click", onResumeButtonClick);
    closeButton.addEventListener("click", onCloseButtonClick);
    opacityFilter.addEventListener("click", onCloseButtonClick);

    return ;
}

/*
** TODO
*/

function onResumeButtonClick()
{
    resume.style.transform = "translateX(0%)";
    resume.style.boxShadow = "0rem 0rem 2.4rem 0rem var(--shadow-color)";
    closeButton.style.pointerEvents = "initial";
    closeButton.style.opacity = "1";
    closeButton.style.lineHeight = "2.125rem";
    opacityFilter.style.pointerEvents = "initial";
    opacityFilter.style.opacity = "1";

    return ;
}

/*
** TODO
*/

function onDemoreelButtonClick()
{
    demoreel.style.transform = "translateY(0%)";
    closeButton.style.pointerEvents = "initial";
    closeButton.style.opacity = "1";
    closeButton.style.lineHeight = "2.125rem";
    opacityFilter.style.pointerEvents = "initial";
    opacityFilter.style.opacity = "1";

    return ;
}

/*
** TODO
*/

function onCloseButtonClick()
{
    resume.style.transform = "translateX(100%)";
    resume.style.boxShadow = "0rem 0rem 0rem 0rem var(--shadow-color)";
    demoreel.style.transform = "translateY(100%)";
    closeButton.style.pointerEvents = "none";
    closeButton.style.opacity = "0";
    closeButton.style.lineHeight = "5.25rem";
    opacityFilter.style.pointerEvents = "none";
    opacityFilter.style.opacity = "0";

    setTimeout(function(){
        demoreel.innerHTML = "<iframe src=\"https://player.vimeo.com/video/236240897?color=FFFFFF&title=0&byline=0&portrait=0\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>";
    }, 50);

    return ;
}

