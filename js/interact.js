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
var interactiveArea = document.getElementById("interactive-area");

var resumeOpen = false;
var demoreelOpen = false;

/*
** Interaction events function
*/

function interact()
{
    demoreelButtonEn.addEventListener("click", onDemoreelButtonClick);
    resumeButtonEn.addEventListener("click", onResumeButtonClick);
 
    demoreelButtonFr.addEventListener("click", onDemoreelButtonClick);
    resumeButtonFr.addEventListener("click", onResumeButtonClick);

    closeButton.addEventListener("click", onCloseButtonClick);
    interactiveArea.addEventListener("click", onCloseAreaClick);

    return ;
}

/*
** On resume button click event function
*/

function onResumeButtonClick()
{
    resumeOpen = true;
    resume.style.transform = "translateX(0%)";
    resume.style.boxShadow = "0rem 0rem 2.4rem 0rem var(--shadow-color)";

    closeButton.style.pointerEvents = "initial";
    closeButton.style.opacity = "1";
    closeButton.style.lineHeight = "2.125rem";

    interactiveArea.style.pointerEvents = "initial";
    interactiveArea.style.opacity = "1";

    return ;
}

/*
** On demoreel button click event function
*/

function onDemoreelButtonClick()
{
    demoreelOpen = true;
    demoreel.style.transform = "translateY(0%)";

    closeButton.style.pointerEvents = "initial";
    closeButton.style.opacity = "1";
    closeButton.style.lineHeight = "2.125rem";

    interactiveArea.style.pointerEvents = "initial";
    interactiveArea.style.opacity = "1";

    return ;
}

/*
** On close button click event function
*/

function onCloseButtonClick()
{
    if (resumeOpen == true)
    {
        resumeOpen = false;
        resume.style.transform = "translateX(100%)";
        resume.style.boxShadow = "0rem 0rem 0rem 0rem var(--shadow-color)";
    }
    else if (demoreelOpen == true)
    {
        demoreelOpen = false;
        demoreel.style.transform = "translateY(100%)";
        setTimeout(function(){
            demoreel.innerHTML = "<iframe src=\"https://player.vimeo.com/video/236240897?color=FFFFFF&title=0&byline=0&portrait=0\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>";
        }, 50);
    }

    closeButton.style.pointerEvents = "none";
    closeButton.style.opacity = "0";
    closeButton.style.lineHeight = "5.25rem";
 
    interactiveArea.style.pointerEvents = "none";
    interactiveArea.style.opacity = "0";

    return ;
}

/*
** On close area click event function
*/

function onCloseAreaClick(e)
{
    var resumeBoundingBox = resume.getBoundingClientRect();

    if (resumeOpen == true && e.clientX < window.innerWidth - resumeBoundingBox.width)
    {
        resumeOpen = false;
        resume.style.transform = "translateX(100%)";
        resume.style.boxShadow = "0rem 0rem 0rem 0rem var(--shadow-color)";

        closeButton.style.pointerEvents = "none";
        closeButton.style.opacity = "0";
        closeButton.style.lineHeight = "5.25rem";

        interactiveArea.style.pointerEvents = "none";
        interactiveArea.style.opacity = "0";
    }
    else if (demoreelOpen == true)
    {
        demoreelOpen = false;
        demoreel.style.transform = "translateY(100%)";

        closeButton.style.pointerEvents = "none";
        closeButton.style.opacity = "0";
        closeButton.style.lineHeight = "5.25rem";

        interactiveArea.style.pointerEvents = "none";
        interactiveArea.style.opacity = "0";

        setTimeout(function(){
            demoreel.innerHTML = "<iframe src=\"https://player.vimeo.com/video/236240897?color=FFFFFF&title=0&byline=0&portrait=0\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>";
        }, 50);
    }

    return ;
}
